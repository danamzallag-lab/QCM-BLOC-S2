import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const questions = [
  {
    id: 1,
    type: 'vrai-faux',
    question: "L'entretien conventionné doit être proposé dès la 2ᵉ délivrance d'un antalgique opioïde palier II chez l'adulte, à raison d'un seul entretien par période de 12 mois.",
    correctAnswer: 'Vrai',
    feedback: 'Déclenchement dès la 2ᵉ délivrance, adulte (≥ 18 ans), 1 entretien / 12 mois.',
    niveau: 'Débutant'
  },
  {
    id: 2,
    type: 'qcm',
    question: 'Quels médicaments relèvent du palier II et sont concernés par l\'entretien ?',
    options: ['Tramadol', 'Codéine (et associations)', 'Poudre d\'opium', 'Dihydrocodéine', 'Morphine'],
    correctAnswers: [0, 1, 2, 3],
    feedback: 'La morphine est palier III ; le QCM cible palier II.',
    niveau: 'Débutant'
  },
  {
    id: 3,
    type: 'qcu',
    question: 'Quel est l\'intérêt d\'un questionnaire rapide type POMI pendant l\'entretien ?',
    options: [
      'Mesurer l\'observance des antibiotiques',
      'Repérer un mésusage/dépendance potentielle sous opioïdes',
      'Déterminer la dose équivalente en morphine',
      'Décider d\'un sevrage immédiat'
    ],
    correctAnswer: 1,
    feedback: 'POMI aide au repérage précoce des usages problématiques ; il ne prescrit ni dose ni sevrage.',
    niveau: 'Intermédiaire'
  },
  {
    id: 4,
    type: 'qcm',
    question: 'Quelles associations sont à éviter chez un patient sous tramadol/codéine ?',
    options: ['Alcool', 'Benzodiazépines / sédatifs centraux', 'Paracétamol (dose thérapeutique)', 'Somnifères non benzodiazépiniques'],
    correctAnswers: [0, 1, 3],
    feedback: 'Les dépresseurs du SNC majorent la somnolence/dépression respiratoire. Paracétamol peut être associé à dose adaptée (sauf contre-indication).',
    niveau: 'Intermédiaire'
  },
  {
    id: 5,
    type: 'qcu',
    question: 'M. C. (38 ans) sous tramadol demande "d\'augmenter un peu" et admet boire de l\'alcool le soir. Votre conduite prioritaire ?',
    options: [
      'Conseiller une double dose "exceptionnelle"',
      'Expliquer le danger opioïdes + alcool, évaluer la douleur/cause et orienter vers le prescripteur',
      'Substituer par codéine en vente libre',
      'Arrêt brutal du tramadol le jour même'
    ],
    correctAnswer: 1,
    feedback: 'Pas d\'augmentation sans avis ; risque majeur avec alcool ; coordination médecin indispensable.',
    niveau: 'Avancé'
  },
  {
    id: 6,
    type: 'vrai-faux',
    question: 'Il faut toujours rappeler d\'éviter l\'arrêt brutal d\'un opioïde palier II pour prévenir un syndrome de sevrage.',
    correctAnswer: 'Vrai',
    feedback: 'En cas d\'arrêt nécessaire, diminution progressive sur avis médical.',
    niveau: 'Débutant'
  },
  {
    id: 7,
    type: 'qcu',
    question: 'Quels signes évoquent un surdosage nécessitant une prise en charge urgente ?',
    options: [
      'Somnolence extrême et respiration lente',
      'Douleurs articulaires modérées',
      'Rhinorrhée isolée',
      'Insomnie ponctuelle'
    ],
    correctAnswer: 0,
    feedback: 'Dépression respiratoire = urgence vitale (15/112).',
    niveau: 'Intermédiaire'
  },
  {
    id: 8,
    type: 'qcu',
    question: 'Cochez l\'énoncé correct concernant la facturation de l\'entretien "opioïdes" (EPA) :',
    options: [
      '10 € TTC, cumulable avec tout acte le même jour',
      '5 € TTC (DOM 5,25 €), acte isolé, tiers payant, 1 fois / 12 mois',
      'Non pris en charge par l\'AMO',
      'Sans exigence de traçabilité'
    ],
    correctAnswer: 1,
    feedback: 'EPA = 5 € TTC (DOM ×1,05), non cumulable le même jour, TP, fréquence 1/an, avec traçabilité.',
    niveau: 'Intermédiaire'
  }
]

export default function QCMOpioides() {
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
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-2xl transition-all"
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
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">💊 Opioïdes Palier II</h1>
          <p className="text-white/80">Question {currentQuestion + 1} sur {questions.length}</p>
        </div>

        <div className="mb-8">
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-8"
          >
            <div className="flex items-start justify-between mb-6">
              <span className="px-4 py-2 bg-purple-500/20 text-purple-200 rounded-full text-sm font-semibold">
                {question.niveau}
              </span>
              <span className="px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold">
                {question.type.toUpperCase()}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-6">{question.question}</h3>

            {question.type === 'vrai-faux' && (
              <div className="flex gap-4">
                {['Vrai', 'Faux'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={showFeedback}
                    className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
                      answers[currentQuestion] === option
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {question.type === 'qcu' && (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showFeedback}
                    className={`w-full p-4 text-left rounded-xl transition-all ${
                      answers[currentQuestion] === index
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

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
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {option}
                  </button>
                ))}
                <p className="text-white/60 text-sm mt-2">Plusieurs réponses possibles</p>
              </div>
            )}

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

        <div className="flex justify-between">
          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all disabled:opacity-50"
          >
            Précédent
          </button>
          <button
            onClick={nextQuestion}
            disabled={!showFeedback}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-2xl transition-all disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? 'Terminer' : 'Suivant'}
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/60">
            Score actuel : <span className="font-bold text-white">{score} / {currentQuestion + 1}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
