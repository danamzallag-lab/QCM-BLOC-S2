import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const questions = [
  // Femme enceinte (3)
  {
    id: 1,
    type: 'qcu',
    question: "Antalgique de 1er choix pendant la grossesse (si nécessaire et aux doses usuelles) :",
    options: ['Ibuprofène', 'Paracétamol', 'Kétoprofène', 'Aspirine systématique'],
    correctAnswer: 1,
    feedback: "Le paracétamol est l'antalgique/antipyrétique de référence si nécessaire. Les AINS sont contre-indiqués au 3e trimestre et à éviter sans avis médical.",
    niveau: 'Femme enceinte'
  },
  {
    id: 2,
    type: 'qcm',
    question: 'Conseils prioritaires à rappeler (plusieurs réponses) :',
    options: [
      'Pas d'automédication sans avis pharmaceutique',
      'Signalement immédiat de tout saignement ou douleur abdominale inhabituelle',
      'Association systématique huiles essentielles',
      'Carnet de suivi et calendrier vaccinal à jour'
    ],
    correctAnswers: [0, 1, 3],
    feedback: "Autonomie mais sans automédication risquée ; repérer signes d'alerte ; sécuriser le parcours (suivi, vaccinations selon recommandations).",
    niveau: 'Femme enceinte'
  },
  {
    id: 3,
    type: 'qcu',
    question: 'Concernant les AINS pendant la grossesse :',
    options: [
      'Autorisation large au 2e et 3e trimestres',
      'Contre-indiqués au 3e trimestre (risques fœto-maternels)',
      'Toujours préférés au paracétamol',
      'Sans impact sur le canal artériel'
    ],
    correctAnswer: 1,
    feedback: "Les AINS sont contre-indiqués au 3e trimestre (risque de fermeture du canal artériel, insuffisance rénale fœtale, hémorragies).",
    niveau: 'Femme enceinte'
  },

  // Opioïdes (3)
  {
    id: 4,
    type: 'qcm',
    question: 'Bonnes pratiques à l'initiation d'un opioïde (plusieurs réponses) :',
    options: [
      'Informer sur somnolence et conduite automobile',
      'Prévenir la constipation (laxatif conseillé)',
      'Conseiller de doubler la dose en cas de douleur persistante d'emblée',
      'Évaluer interactions et co-médications sédatives'
    ],
    correctAnswers: [0, 1, 3],
    feedback: "Information sécurité (somnolence), prévention systématique de la constipation, revue médicamenteuse et interactions ; pas d'escalade anarchique.",
    niveau: 'Opioïdes antalgiques'
  },
  {
    id: 5,
    type: 'qcu',
    question: 'Signe d'alerte d'un surdosage opioïde nécessitant une prise en charge urgente :',
    options: ['Myosis + bradypnée + somnolence profonde', 'Toux sèche isolée', 'Rhinorrhée', 'Prurit cutané léger'],
    correctAnswer: 0,
    feedback: "La triade myosis, dépression respiratoire, somnolence profonde évoque un surdosage. Appel urgence et conduite adaptée.",
    niveau: 'Opioïdes antalgiques'
  },
  {
    id: 6,
    type: 'qcu',
    question: 'À propos du tramadol :',
    options: [
      'C'est sans risque d'interactions',
      'Peut majorer le risque de syndrome sérotoninergique avec certains antidépresseurs',
      'Toujours associé à un AINS',
      'N'entraîne jamais de somnolence'
    ],
    correctAnswer: 1,
    feedback: "Le tramadol a un risque sérotoninergique (ISRS/IMAO/IRSNa…) et peut entraîner somnolence ; l'association systématique aux AINS n'est pas une règle.",
    niveau: 'Opioïdes antalgiques'
  },

  // Asthme (3)
  {
    id: 7,
    type: 'qcm',
    question: 'Points clés du suivi officinal (plusieurs réponses) :',
    options: [
      'Vérification régulière de la technique d'inhalation',
      'Repérage d'un sur-usage de SABA (≥3 boîtes/an)',
      'Arrêt arbitraire des CSI dès amélioration',
      'Plan d'action écrit et adhésion'
    ],
    correctAnswers: [0, 1, 3],
    feedback: "Technique d'inhalation = déterminante ; sur-usage de SABA est un signal de risque ; le traitement de fond ne s'arrête pas sans avis.",
    niveau: 'Asthme'
  },
  {
    id: 8,
    type: 'qcu',
    question: 'Message correct au comptoir :',
    options: [
      '"Le traitement de fond (CSI ± LABA) se prend tous les jours, même sans symptômes."',
      '"Le SABA est à prendre systématiquement avant chaque sortie."',
      '"Les inhalateurs n'influencent pas l'adhésion."',
      '"Un seul passage à l'officine suffit pour apprendre la technique."'
    ],
    correctAnswer: 0,
    feedback: "Le contrôle repose sur l'observance du fond ; le SABA est de secours ; l'éducation inhalatoire est répétée et personnalisée.",
    niveau: 'Asthme'
  },
  {
    id: 9,
    type: 'qcu',
    question: 'Priorité en cas d'exacerbation suspectée :',
    options: ['Reporter toute prise en charge', 'Conseiller d'augmenter le SABA sans évaluation', 'Orienter selon plan d'action et signes de gravité', 'Arrêter le CSI'],
    correctAnswer: 2,
    feedback: "On s'appuie sur le plan d'action et la recherche de signes de gravité ; pas d'arrêt sauvage du traitement de fond.",
    niveau: 'Asthme'
  },

  // AVK (3)
  {
    id: 10,
    type: 'qcu',
    question: 'Message central sur l'alimentation et la vitamine K :',
    options: ['Éviter définitivement les légumes verts', 'Stabiliser les apports sans faire de variations brutales', 'Faire des cures "détox" très vertes', 'Supprimer toute huile végétale'],
    correctAnswer: 1,
    feedback: "On recherche la stabilité des apports en vitamine K ; pas d'interdiction absolue mais éviter les variations rapides.",
    niveau: 'AVK'
  },
  {
    id: 11,
    type: 'qcm',
    question: 'Précautions / interactions à rappeler (plusieurs réponses) :',
    options: [
      'AINS/aspirine sans avis : à éviter',
      'Millepertuis : contre-indiqué',
      'Adaptation de dose par le patient selon son ressenti',
      'Carnet AVK à jour et carte anticoagulant sur soi'
    ],
    correctAnswers: [0, 1, 3],
    feedback: "AINS/aspirine augmentent le risque hémorragique ; le millepertuis est contre-indiqué ; traçabilité indispensable ; jamais d'auto-adaptation.",
    niveau: 'AVK'
  },
  {
    id: 12,
    type: 'qcu',
    question: 'Conduite correcte si INR très élevé + signes hémorragiques :',
    options: ['Poursuivre et recontrôler plus tard', 'Suspendre l'AVK et orienter immédiatement pour avis médical', 'Doubler la dose suivante', 'Ignorer si pas de douleur'],
    correctAnswer: 1,
    feedback: "Signe d'alarme : arrêt temporaire et orientation immédiate ; adaptation selon protocole médical (vitamine K possible).",
    niveau: 'AVK'
  },

  // AOD (3)
  {
    id: 13,
    type: 'qcm',
    question: 'Choisissez les affirmations correctes concernant la prise :',
    options: [
      'Rivaroxaban 15/20 mg à prendre avec repas',
      'Ne jamais doubler une dose oubliée',
      'Tous les AOD nécessitent un INR mensuel',
      'Associer la prise à une routine + rappels'
    ],
    correctAnswers: [0, 1, 3],
    feedback: "Rivaroxaban 15/20 mg : avec repas ; pas de rattrapage en doublant ; pas de surveillance d'INR systématique ; ancrer la prise dans le quotidien.",
    niveau: 'AOD'
  },
  {
    id: 14,
    type: 'qcu',
    question: 'Couple antidote — molécule correctement associé :',
    options: ['Idarucizumab — dabigatran', 'Andexanet alfa — dabigatran', 'Vitamine K — apixaban', 'Aucun antidote n'existe'],
    correctAnswer: 0,
    feedback: "Idarucizumab pour le dabigatran ; andexanet alfa pour les anti-Xa (apixaban, rivaroxaban, ± édoxaban selon indications locales).",
    niveau: 'AOD'
  },
  {
    id: 15,
    type: 'qcu',
    question: 'Avant une chirurgie à risque hémorragique :',
    options: [
      'Arrêt généralement 24–48 h selon risque et fonction rénale (décision médicale)',
      'Poursuite systématique',
      'Relais HBPM automatique pour tous',
      'Doubler la dose la veille'
    ],
    correctAnswer: 0,
    feedback: "La fenêtre d'arrêt dépend du geste et de la clairance rénale ; le relais n'est pas systématique et relève du prescripteur.",
    niveau: 'AOD'
  }
]

export default function QCMComplet() {
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
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl font-semibold hover:shadow-2xl transition-all"
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
          <h1 className="text-4xl font-bold text-white mb-2">⭐ QCM Complet - Bloc 2</h1>
          <p className="text-white/80">Question {currentQuestion + 1} sur {questions.length}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-yellow-500 to-amber-500"
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
              <span className="px-4 py-2 bg-yellow-500/20 text-yellow-200 rounded-full text-sm font-semibold">
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
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white'
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
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white'
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
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white'
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
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl font-semibold hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
