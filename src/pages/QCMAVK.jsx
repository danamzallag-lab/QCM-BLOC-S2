import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const questions = [
  {
    id: 1,
    type: 'qcu',
    question: "Quel patient est prioritaire pour l'accompagnement AVK en officine ?",
    options: [
      'Patient sous AOD depuis 2 semaines',
      'Patient sous warfarine/acénocoumarol avec suivi au long cours',
      'Patient avec ecchymoses post-traumatiques isolées',
      'Patient sevré d\'AVK depuis 6 mois'
    ],
    correctAnswer: 1,
    feedback: "L'accompagnement cible les patients sous AVK (warfarine, acénocoumarol) suivis au long cours (FA, MTEV, valves, SAPL…), pour sécuriser INR, observance et interactions.",
    niveau: 'Éligibilité'
  },
  {
    id: 2,
    type: 'qcu',
    question: "Message clé concernant l'INR :",
    options: [
      "L'INR mesure la glycémie à jeun",
      "La cible est identique pour tous : 1,0",
      "L'INR guide l'ajustement : ne jamais modifier la dose sans avis",
      "L'INR ne concerne que les AOD"
    ],
    correctAnswer: 2,
    feedback: "L'INR est l'indicateur d'anticoagulation sous AVK et conditionne l'ajustement des doses. Le patient ne doit jamais modifier seul.",
    niveau: 'INR'
  },
  {
    id: 3,
    type: 'qcm',
    question: "Quelles recommandations sont correctes au sujet de la vitamine K ? (plusieurs réponses)",
    options: [
      'Régime stable, éviter les variations brutales d\'aliments très verts',
      'Éliminer totalement tout aliment contenant de la vitamine K',
      'Informer en cas de changement majeur de régime',
      'Faire une cure détox « jus verts » 3 jours par mois'
    ],
    correctAnswers: [0, 2],
    feedback: "On privilégie la STABILITÉ des apports en vit K. Pas d'interdiction totale, mais éviter les variations rapides (cures vertes). Prévenir en cas de changement important.",
    niveau: 'Alimentation & Vit K'
  },
  {
    id: 4,
    type: 'qcm',
    question: "Sélectionnez les situations nécessitant une vigilance accrue sous AVK (plusieurs réponses)",
    options: [
      'Introduction d\'amiodarone',
      'Automédication par ibuprofène',
      'Cure de millepertuis',
      'Association paracétamol aux doses usuelles'
    ],
    correctAnswers: [0, 1, 2],
    feedback: "Amiodarone, AINS (ex. ibuprofène) et millepertuis interagissent. Le paracétamol aux doses habituelles est généralement l'antalgique de 1er choix (prudence si fortes doses prolongées).",
    niveau: 'Interactions'
  },
  {
    id: 5,
    type: 'qcu',
    question: "Quel énoncé est correct concernant le carnet AVK ?",
    options: [
      'Il n\'est utile que pour les urgences',
      'Il sert à noter doses, INR, RDV et contacts — à apporter à chaque passage',
      'Il remplace la traçabilité DP/DMP',
      "Il doit rester au domicile pour ne pas l'abîmer"
    ],
    correctAnswer: 1,
    feedback: "Le carnet AVK centralise doses/INR/RDV/contacts et doit accompagner le patient. Il complète la traçabilité (DP/DMP), il ne la remplace pas.",
    niveau: 'Observance & carnet AVK'
  },
  {
    id: 6,
    type: 'qcu',
    question: "Conduite prioritaire devant un INR très élevé avec saignements :",
    options: [
      'Doubler la dose le lendemain',
      'Suspendre l\'AVK et avis médical en urgence (± vitamine K selon protocole)',
      'Prendre de la vitamine C',
      'Attendre le prochain contrôle prévu'
    ],
    correctAnswer: 1,
    feedback: "INR haut + saignements = risque hémorragique : on suspend l'AVK et on contacte sans délai pour conduite médicale (vit K possible selon protocole).",
    niveau: 'Situations à risque'
  },
  {
    id: 7,
    type: 'qcu',
    question: "Avant une chirurgie programmée sous AVK, quel principe ?",
    options: [
      'Arrêt la veille, sans informer le médecin',
      'Arrêt anticipé selon protocole et éventuel relais HBPM décidé médicalement',
      'Poursuite systématique des AVK',
      'Prise double la veille pour compenser l\'arrêt'
    ],
    correctAnswer: 1,
    feedback: "L'arrêt est anticipé selon l'acte et le risque, avec relais héparine si indiqué. La décision relève du prescripteur ; le pharmacien sécurise et rappelle le plan.",
    niveau: 'Pré-op / actes invasifs'
  },
  {
    id: 8,
    type: 'qcu',
    question: "Quel conseil est adapté au quotidien ?",
    options: [
      'Rasage électrique et brosse à dents souple',
      'Sports de contact encouragés',
      'Alcool à volonté',
      'Ne pas porter la carte anticoagulant en dehors des RDV'
    ],
    correctAnswer: 0,
    feedback: "On limite les risques de saignement (rasage électrique, brosse souple), alcool avec modération, et carte anticoagulant toujours sur soi.",
    niveau: 'Vie quotidienne'
  },
  {
    id: 9,
    type: 'qcu',
    question: "Bonne pratique après l'entretien :",
    options: [
      'Aucune trace si tout va bien',
      'Traçabilité DP/DMP, CR court si besoin, et message MSS au MT si situation clinique à signaler',
      'Envoyer l\'ordonnance originale à la CPAM',
      'Téléphoner à la pharmacie de garde chaque soir'
    ],
    correctAnswer: 1,
    feedback: "Tracer dans DP/DMP, conserver les fiches, informer le MT via MSS si utile sont attendus.",
    niveau: 'Coordination & traçabilité'
  },
  {
    id: 10,
    type: 'qcu',
    question: "Quelle affirmation est correcte ?",
    options: [
      'Année 1 : ASI 15 € + 15 € + 20 € ; Années suivantes : ASS 10 € + 20 €',
      'TAC = 10 € forfait au démarrage',
      'Actes cumulables avec toute autre prestation le même jour',
      'Fréquence libre : autant d\'entretiens que souhaité'
    ],
    correctAnswer: 0,
    feedback: "TAC = traceur (0,01 €). Année 1 : 3 entretiens ASI (15/15/20). Années suivantes : ASS (10/20). Acte isolé non cumulable le jour même sur le même flux.",
    niveau: 'Facturation'
  }
]

export default function QCMAVK() {
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
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-2xl transition-all"
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
          <h1 className="text-4xl font-bold text-white mb-2">💊 AVK</h1>
          <p className="text-white/80">Question {currentQuestion + 1} sur {questions.length}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-red-500 to-orange-500"
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
              <span className="px-4 py-2 bg-red-500/20 text-red-200 rounded-full text-sm font-semibold">
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
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
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
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
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
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
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
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
