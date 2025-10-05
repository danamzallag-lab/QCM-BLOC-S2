import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const questions = [
  {
    id: 1,
    type: 'vrai-faux',
    question: "L'entretien \"femme enceinte\" est éligible pour toute patiente enceinte, quel que soit le terme, et n'est réalisé qu'une seule fois par grossesse.",
    correctAnswer: 'Vrai',
    feedback: "L'éligibilité est universelle et l'entretien est non renouvelable durant la même grossesse.",
    niveau: 'Débutant'
  },
  {
    id: 2,
    type: 'qcu',
    question: 'Quel message prioritaire doit être délivré systématiquement ?',
    options: [
      'Privilégier les AINS avant le 3ᵉ trimestre',
      'Zéro automédication sans avis d\'un professionnel',
      'Reporter toutes les vaccinations après l\'accouchement',
      'Arrêter tout traitement chronique par précaution'
    ],
    correctAnswer: 1,
    feedback: 'L\'axe central est "aucune automédication pendant la grossesse" ; prudence avec produits OTC et phytothérapie.',
    niveau: 'Débutant'
  },
  {
    id: 3,
    type: 'qcm',
    question: 'Parmi les situations/produits listés ci-dessous, lesquels appellent une vigilance/contre-indication ?',
    options: [
      'Isotrétinoïne',
      'Valproate',
      'AVK',
      'Ibuprofène au 3ᵉ trimestre',
      'Paracétamol (utilisation adaptée)'
    ],
    correctAnswers: [0, 1, 2, 3],
    feedback: 'Tératogènes/risques majeurs (isotrétinoïne, valproate, AVK) et AINS surtout au 3ᵉ trimestre ; paracétamol reste l\'analgésique de référence si adapté.',
    niveau: 'Intermédiaire'
  },
  {
    id: 4,
    type: 'vrai-faux',
    question: 'La vaccination antigrippale est recommandée pendant la grossesse et peut être réalisée en toute sécurité.',
    correctAnswer: 'Vrai',
    feedback: 'Le message "vaccination antigrippale recommandée et sans danger en cours de grossesse" fait partie des conseils clés.',
    niveau: 'Intermédiaire'
  },
  {
    id: 5,
    type: 'qcu',
    question: 'Mme K., 5ᵉ mois, prend habituellement de l\'ibuprofène pour céphalées. Quelle conduite ?',
    options: [
      'Poursuivre l\'ibuprofène',
      'Stopper AINS, proposer paracétamol si adapté, revoir avec médecin si douleurs récurrentes',
      'Remplacer par codéine sans avis'
    ],
    correctAnswer: 1,
    feedback: 'Éviter les AINS (risque majeur surtout T3), privilégier paracétamol si adapté et coordonner avec le médecin en cas de céphalées récurrentes.',
    niveau: 'Intermédiaire'
  },
  {
    id: 6,
    type: 'qcu',
    question: 'Comment facturer l\'entretien au comptoir ?',
    options: [
      'Code EFE, 5 € TTC, cumulable avec la délivrance du jour',
      'Code EFE, 5 € TTC, acte isolé, tiers payant, 70 % (100 % maternité), DOM ×1,05',
      'Code EPA, 5 € TTC, une fois par 12 mois'
    ],
    correctAnswer: 1,
    feedback: 'EFE = Entretien Femme Enceinte ; acte non cumulable sur la même facture, tiers payant, 70 % ou 100 % selon régime, coefficient DOM.',
    niveau: 'Intermédiaire'
  },
  {
    id: 7,
    type: 'association',
    question: 'Associer l\'étape de l\'entretien au bon objectif :',
    pairs: [
      { left: 'Recueil des prises', right: 'Dépister risques/contre-indications' },
      { left: 'Messages clés', right: 'Zéro automédication, vaccins, pictos' },
      { left: 'Clôture', right: 'Remettre flyer ANSM, envoyer liens via Mon Espace Santé' }
    ],
    feedback: 'La trame type recueil → messages → clôture/ressources est requise, avec traçabilité DP/DMP.',
    niveau: 'Débutant'
  }
]

export default function QCMFemmeEnceinte() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer })
    setShowFeedback(true)

    // Check if correct
    let isCorrect = false
    if (question.type === 'vrai-faux') {
      isCorrect = answer === question.correctAnswer
    } else if (question.type === 'qcu') {
      isCorrect = answer === question.correctAnswer
    } else if (question.type === 'qcm') {
      isCorrect = JSON.stringify(answer.sort()) === JSON.stringify(question.correctAnswers.sort())
    }

    if (isCorrect && !answers[currentQuestion]) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowFeedback(false)
    } else {
      setCompleted(true)
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowFeedback(false)
    }
  }

  if (completed) {
    const finalScore = (score / questions.length) * 100
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center border border-white/20"
        >
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-4xl font-bold text-white mb-4">QCM Terminé !</h2>
          <div className="text-6xl font-extrabold text-white mb-6">
            {finalScore.toFixed(0)}%
          </div>
          <p className="text-xl text-white/80 mb-8">
            {score} / {questions.length} bonnes réponses
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setCurrentQuestion(0)
                setAnswers({})
                setScore(0)
                setCompleted(false)
                setShowFeedback(false)
              }}
              className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-all"
            >
              Recommencer
            </button>
            <Link
              to="/"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-2xl transition-all"
            >
              Retour à l'accueil
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">👶 Femme Enceinte</h1>
          <p className="text-white/80">Question {currentQuestion + 1} sur {questions.length}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-8"
          >
            <div className="flex items-start justify-between mb-6">
              <span className="px-4 py-2 bg-pink-500/20 text-pink-200 rounded-full text-sm font-semibold">
                {question.niveau}
              </span>
              <span className="px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold">
                {question.type.toUpperCase()}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-6">{question.question}</h3>

            {/* Vrai/Faux */}
            {question.type === 'vrai-faux' && (
              <div className="flex gap-4">
                {['Vrai', 'Faux'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={showFeedback}
                    className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
                      answers[currentQuestion] === option
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* QCU */}
            {question.type === 'qcu' && (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showFeedback}
                    className={`w-full p-4 text-left rounded-xl transition-all ${
                      answers[currentQuestion] === index
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* QCM */}
            {question.type === 'qcm' && (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const current = answers[currentQuestion] || []
                      const updated = current.includes(index)
                        ? current.filter(i => i !== index)
                        : [...current, index]
                      handleAnswer(updated)
                    }}
                    disabled={showFeedback}
                    className={`w-full p-4 text-left rounded-xl transition-all ${
                      (answers[currentQuestion] || []).includes(index)
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {option}
                  </button>
                ))}
                <p className="text-white/60 text-sm mt-2">Plusieurs réponses possibles</p>
              </div>
            )}

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-white/20 rounded-xl border border-white/30"
                >
                  <p className="text-white/90">{question.feedback}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Précédent
          </button>
          <button
            onClick={nextQuestion}
            disabled={!showFeedback}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1 ? 'Terminer' : 'Suivant'}
          </button>
        </div>

        {/* Score */}
        <div className="mt-8 text-center">
          <p className="text-white/60">
            Score actuel : <span className="font-bold text-white">{score} / {currentQuestion + 1}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
