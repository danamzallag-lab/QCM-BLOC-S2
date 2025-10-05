import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const questions = [
  {
    id: 1,
    type: 'qcu',
    question: "Quel patient est éligible/prioritaire pour l'accompagnement AOD en officine ?",
    options: [
      'Patient sous warfarine au long cours',
      'Patient sous apixaban/rivaroxaban/dabigatran/édoxaban',
      'Patient sous héparine de bas poids moléculaire ponctuelle',
      'Patient sevré de tout anticoagulant depuis 1 an'
    ],
    correctAnswer: 1,
    feedback: "L'accompagnement AOD concerne les patients traités par apixaban, rivaroxaban, dabigatran ou édoxaban, à l'initiation ou au long cours.",
    niveau: 'Éligibilité'
  },
  {
    id: 2,
    type: 'qcm',
    question: 'Quelles affirmations sont correctes concernant la prise des AOD ? (plusieurs réponses)',
    options: [
      'Ne jamais doubler une dose pour rattraper un oubli',
      'Rivaroxaban 15/20 mg : à prendre avec un repas',
      'Tous les AOD se prennent strictement à jeun',
      'Adapter les horaires au quotidien pour favoriser l'observance'
    ],
    correctAnswers: [0, 1, 3],
    feedback: "Rivaroxaban 15/20 mg nécessite un repas pour une bonne biodisponibilité. On n'augmente jamais la dose pour rattraper. Les horaires peuvent s'ancrer à des routines.",
    niveau: 'Posologie'
  },
  {
    id: 3,
    type: 'qcm',
    question: 'Conduites en cas d'oubli (généralités) — cochez les réponses correctes',
    options: [
      'Prise 1/j : prendre la dose oubliée si l'on s'en rend compte le même jour',
      'Prise 1/j : doubler la dose le lendemain',
      'Prise 2/j : prendre dès que possible si l'intervalle est court',
      'Prise 2/j : si l'heure suivante est proche, attendre la prochaine prise'
    ],
    correctAnswers: [0, 2, 3],
    feedback: "Règle générale : ne pas doubler. 1/j : rattraper dans la même journée sinon sauter. 2/j : prendre dès que possible si intervalle raisonnable, sinon attendre la prochaine.",
    niveau: 'Oublis'
  },
  {
    id: 4,
    type: 'qcm',
    question: 'Sélectionnez les situations nécessitant une vigilance accrue (interactions)',
    options: [
      'Introduction d'un inhibiteur/inducteur puissant de P-gp/CYP3A4',
      'Millepertuis',
      'Automédication par AINS/aspirine sans avis',
      'Paracétamol aux doses usuelles'
    ],
    correctAnswers: [0, 1, 2],
    feedback: "Inhibiteurs/inducteurs P-gp/CYP3A4, millepertuis et AINS/aspirine augmentent le risque. Le paracétamol aux doses usuelles reste l'antalgique de référence.",
    niveau: 'Interactions'
  },
  {
    id: 5,
    type: 'qcu',
    question: 'Quel couple antidote–médicament est correctement associé ?',
    options: [
      'Idarucizumab — anti-Xa',
      'Andexanet alfa — dabigatran',
      'Idarucizumab — dabigatran',
      'Vitamine K — apixaban'
    ],
    correctAnswer: 2,
    feedback: "Idarucizumab est l'antidote spécifique du dabigatran. Andexanet alfa cible les anti-Xa (apixaban, rivaroxaban, ± édoxaban selon indications locales).",
    niveau: 'Saignement/Antidotes'
  },
  {
    id: 6,
    type: 'qcu',
    question: 'Conduite prioritaire face à un saignement majeur sous AOD :',
    options: [
      'Poursuivre l'AOD et surveiller',
      'Arrêt temporaire et orientation en urgence (antidote possible selon molécule)',
      'Doubler la dose suivante pour compenser',
      'Boire de l'eau sucrée'
    ],
    correctAnswer: 1,
    feedback: "Devant un saignement majeur : arrêt temporaire, orientation en urgence, bilan et éventuel usage d'un antidote spécifique selon la molécule.",
    niveau: 'Saignement (conduite)'
  },
  {
    id: 7,
    type: 'qcu',
    question: 'Avant une chirurgie à risque hémorragique, le principe général est :',
    options: [
      'Arrêt 24–48 h avant selon risque et fonction rénale (décision médicale)',
      'Arrêt la veille uniquement, quelle que soit la situation',
      'Poursuite systématique des AOD',
      'Relais HBPM automatique pour tous'
    ],
    correctAnswer: 0,
    feedback: "L'arrêt est anticipé selon le geste et la clairance rénale ; le relais HBPM n'est pas systématique et relève de la décision médicale.",
    niveau: 'Actes invasifs'
  },
  {
    id: 8,
    type: 'qcu',
    question: 'Quel conseil au quotidien est approprié ?',
    options: [
      'Sports de contact encouragés',
      'Carte anticoagulant sur soi et informer tout soignant',
      'Automédication sans avis',
      'Doubler la dose lors d'oubli'
    ],
    correctAnswer: 1,
    feedback: "Informer les soignants et porter la carte anticoagulant ; éviter sports de contact ; pas d'automédication risquée ; jamais de double dose.",
    niveau: 'Vie quotidienne'
  },
  {
    id: 9,
    type: 'qcu',
    question: 'Bonne pratique officinale après l'entretien AOD :',
    options: [
      'Aucune trace si tout va bien',
      'Traçabilité DP/DMP, fiches archivées ; MSS au MT si besoin',
      'Envoyer l'ordonnance originale à la CPAM',
      'Téléphoner chaque soir au patient'
    ],
    correctAnswer: 1,
    feedback: "Tracer dans DP/DMP, conserver les fiches, informer le médecin (MSS) en cas de besoin font partie du standard de qualité.",
    niveau: 'Coordination/Traçabilité'
  },
  {
    id: 10,
    type: 'qcu',
    question: 'Quelle affirmation est correcte concernant la facturation ?',
    options: [
      'Année 1 : ASI 15 € + 15 € + 20 € ; Années suivantes : ASS 10 € + 20 €',
      'TAC = 10 € au démarrage',
      'Actes cumulables avec toute autre prestation le même jour',
      'Nombre d'entretiens annuel libre'
    ],
    correctAnswer: 0,
    feedback: "TAC = traceur (0,01 €). Année 1 : 3 entretiens ASI (15/15/20). Années suivantes : ASS (10/20). Acte isolé non cumulable le même jour sur le même flux.",
    niveau: 'Facturation'
  }
]

export default function QCMAOD() {
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
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-2xl transition-all"
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
          <h1 className="text-4xl font-bold text-white mb-2">💉 AOD</h1>
          <p className="text-white/80">Question {currentQuestion + 1} sur {questions.length}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
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
              <span className="px-4 py-2 bg-emerald-500/20 text-emerald-200 rounded-full text-sm font-semibold">
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
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
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
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
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
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
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
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
