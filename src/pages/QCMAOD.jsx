import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const questions = [
  {
    id: 1,
    type: 'qcu',
    question: "Quel est le critère d'éligibilité prioritaire pour engager l'accompagnement asthme en officine ?",
    options: [
      "Prescription d'un SABA seul (au besoin)",
      "Patient majeur avec au moins une hospitalisation pour crise",
      "Prescription de corticoïdes inhalés prévue sur 6 mois ou plus",
      "Âge supérieur à 12 ans"
    ],
    correctAnswer: 2,
    feedback: "L'éligibilité cible un patient sous traitement de fond par corticoïdes inhalés (CSI) avec une durée prévue ≥ 6 mois. Le repérage peut se faire à la primo-délivrance de CSI, aux renouvellements, ou après une décompensation.",
    niveau: 'Éligibilité'
  },
  {
    id: 2,
    type: 'qcu',
    question: "Comment se structure le parcours d'accompagnement la 1re année ?",
    options: [
      "Deux entretiens: évaluation et bilan final",
      "Trois entretiens: évaluation, module thématique, 2e module + bilan",
      "Quatre entretiens: deux évaluations, un module, un bilan",
      "Un seul entretien annuel de synthèse"
    ],
    correctAnswer: 1,
    feedback: "Année 1: 3 entretiens — 1) Évaluation, 2) Module thématique adapté, 3) Second module + bilan et plan d'action.",
    niveau: 'Parcours'
  },
  {
    id: 3,
    type: 'qcu',
    question: "Pour un aérosol doseur (MDI), quel geste est correct ?",
    options: [
      "Déclencher la bouffée après une inspiration profonde",
      "Déclencher au début d'une inspiration lente et profonde",
      "Inspirer très vite comme pour un DPI",
      "Souffler dans l'embout juste avant de déclencher"
    ],
    correctAnswer: 1,
    feedback: "MDI: expirer doucement, placer l'embout, puis déclencher au début d'une inspiration lente et profonde; garder la respiration quelques secondes ensuite.",
    niveau: 'Technique d\'inhalation'
  },
  {
    id: 4,
    type: 'qcu',
    question: "Pour un dispositif à poudre (DPI), quelle instruction est la plus juste ?",
    options: [
      "Inspirer lentement et déclencher en fin d'inspiration",
      "Ne pas expirer avant l'inspiration pour garder l'humidité",
      "Charger la dose, expirer loin de l'embout, inspirer fort et rapidement",
      "Rincer la bouche avant l'inspiration pour limiter la toux"
    ],
    correctAnswer: 2,
    feedback: "DPI: charger la dose selon le dispositif, expirer à distance de l'embout, puis inspirer FORT et rapidement; retenir son souffle quelques secondes.",
    niveau: 'Technique d\'inhalation'
  },
  {
    id: 5,
    type: 'qcu',
    question: "Pourquoi recommander un rinçage de bouche après chaque prise de CSI ?",
    options: [
      "Pour améliorer l'absorption systémique du CSI",
      "Pour diminuer la dysphonie et la candidose oropharyngée",
      "Pour accélérer l'effet bronchodilatateur",
      "Pour réduire l'effet anticholinergique"
    ],
    correctAnswer: 1,
    feedback: "Le rinçage de bouche réduit les effets indésirables locaux des corticoïdes inhalés: dysphonie et candidose.",
    niveau: 'Effets indésirables'
  },
  {
    id: 6,
    type: 'qcu',
    question: "Quel conseil est le plus pertinent pour renforcer l'observance du traitement de fond ?",
    options: [
      "Diminuer progressivement le CSI dès amélioration",
      "Utiliser seulement le CSI en cas de symptômes",
      "Associer la prise à une routine quotidienne et programmer des rappels",
      "Passer d'un CSI quotidien à un SABA régulier"
    ],
    correctAnswer: 2,
    feedback: "Ancrer une routine (ex: après le brossage) et utiliser des rappels/alertes sont des leviers d'observance; le CSI se prend tous les jours, même sans symptômes.",
    niveau: 'Observance'
  },
  {
    id: 7,
    type: 'qcu',
    question: "Quel conseil environnemental est approprié chez un patient sensibilisé aux acariens ?",
    options: [
      "Aérer très peu pour conserver une atmosphère stable",
      "Utiliser des housses anti-acariens et aérer régulièrement",
      "Éviter tout contact extérieur pendant la saison pollinique",
      "Dormir avec l'animal domestique pour s'habituer"
    ],
    correctAnswer: 1,
    feedback: "Mesures utiles: housses anti-acariens, aération régulière, réduire les nids à poussière; éviter la fumée de tabac.",
    niveau: 'Déclencheurs'
  },
  {
    id: 8,
    type: 'qcu',
    question: "En cas de signes de décompensation sévère (dyspnée marquée, difficulté à parler), quelle conduite recommander ?",
    options: [
      "Prendre deux bouffées de CSI et attendre",
      "Boire de l'eau et se reposer",
      "Administrer 2 bouffées de salbutamol si disponible et appeler le 15 en cas de détresse",
      "Doubler le traitement de fond pendant 48 heures"
    ],
    correctAnswer: 2,
    feedback: "Devant des signes sévères: recourir au bronchodilatateur de secours si disponible et contacter les secours (15) en cas de détresse respiratoire.",
    niveau: 'Urgence'
  },
  {
    id: 9,
    type: 'qcu',
    question: "Quelle pratique de coordination/traçabilité est attendue après l'entretien ?",
    options: [
      "Aucune trace si le patient va mieux",
      "Tracer dans DP/DMP et envoyer un message MSS au médecin traitant si besoin",
      "Envoyer systématiquement l'ordonnance originale à la CPAM",
      "Appeler la pharmacie de garde pour information"
    ],
    correctAnswer: 1,
    feedback: "Tracer dans le DP/DMP, conserver les fiches d'entretien et informer le médecin via MSS si nécessaire font partie des bonnes pratiques.",
    niveau: 'Coordination'
  },
  {
    id: 10,
    type: 'qcu',
    question: "Quelle affirmation est correcte concernant la facturation ?",
    options: [
      "Année 1: trois entretiens ASI à 15 €, 15 € et 20 €",
      "TAC correspond à un forfait de 10 € au démarrage",
      "Années suivantes: 3 entretiens annuels ASS",
      "Les entretiens sont toujours cumulables avec toute autre prestation le même jour"
    ],
    correctAnswer: 0,
    feedback: "Année 1: 3 entretiens (ASI 15 € + 15 € + 20 €). Les années suivantes: ASS 10 € + 20 €. TAC est un traceur d'adhésion (0,01 €). L'acte n'est pas cumulable sur le même flux le jour même.",
    niveau: 'Facturation'
  }
]

export default function QCMAsthme() {
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
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl transition-all"
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
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
