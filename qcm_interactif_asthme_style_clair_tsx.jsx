import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, CheckCircle, XCircle, AlertCircle, 
  Trophy, Target, Wind, Clock, RotateCcw, Award,
  Shield, Stethoscope
} from 'lucide-react';

const AsthmaQCM = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const questions = [
    {
      id: 1,
      question: "Quel est le critère d'éligibilité prioritaire pour engager l'accompagnement asthme en officine ?",
      options: [
        "Prescription d'un SABA seul (au besoin)",
        "Patient majeur avec au moins une hospitalisation pour crise",
        "Prescription de corticoïdes inhalés prévue sur 6 mois ou plus",
        "Âge supérieur à 12 ans"
      ],
      correct: 2,
      explanation: "L'éligibilité cible un patient sous traitement de fond par corticoïdes inhalés (CSI) avec une durée prévue ≥ 6 mois. Le repérage peut se faire à la primo-délivrance de CSI, aux renouvellements, ou après une décompensation.",
      category: "Éligibilité"
    },
    {
      id: 2,
      question: "Comment se structure le parcours d'accompagnement la 1re année ?",
      options: [
        "Deux entretiens: évaluation et bilan final",
        "Trois entretiens: évaluation, module thématique, 2e module + bilan",
        "Quatre entretiens: deux évaluations, un module, un bilan",
        "Un seul entretien annuel de synthèse"
      ],
      correct: 1,
      explanation: "Année 1: 3 entretiens — 1) Évaluation, 2) Module thématique adapté, 3) Second module + bilan et plan d'action.",
      category: "Parcours"
    },
    {
      id: 3,
      question: "Pour un aérosol doseur (MDI), quel geste est correct ?",
      options: [
        "Déclencher la bouffée après une inspiration profonde",
        "Déclencher au début d'une inspiration lente et profonde",
        "Inspirer très vite comme pour un DPI",
        "Souffler dans l'embout juste avant de déclencher"
      ],
      correct: 1,
      explanation: "MDI: expirer doucement, placer l'embout, puis déclencher au début d'une inspiration lente et profonde; garder la respiration quelques secondes ensuite.",
      category: "Technique d'inhalation"
    },
    {
      id: 4,
      question: "Pour un dispositif à poudre (DPI), quelle instruction est la plus juste ?",
      options: [
        "Inspirer lentement et déclencher en fin d'inspiration",
        "Ne pas expirer avant l'inspiration pour garder l'humidité",
        "Charger la dose, expirer loin de l'embout, inspirer fort et rapidement",
        "Rincer la bouche avant l'inspiration pour limiter la toux"
      ],
      correct: 2,
      explanation: "DPI: charger la dose selon le dispositif, expirer à distance de l'embout, puis inspirer FORT et rapidement; retenir son souffle quelques secondes.",
      category: "Technique d'inhalation"
    },
    {
      id: 5,
      question: "Pourquoi recommander un rinçage de bouche après chaque prise de CSI ?",
      options: [
        "Pour améliorer l'absorption systémique du CSI",
        "Pour diminuer la dysphonie et la candidose oropharyngée",
        "Pour accélérer l'effet bronchodilatateur",
        "Pour réduire l'effet anticholinergique"
      ],
      correct: 1,
      explanation: "Le rinçage de bouche réduit les effets indésirables locaux des corticoïdes inhalés: dysphonie et candidose.",
      category: "Effets indésirables"
    },
    {
      id: 6,
      question: "Quel conseil est le plus pertinent pour renforcer l'observance du traitement de fond ?",
      options: [
        "Diminuer progressivement le CSI dès amélioration",
        "Utiliser seulement le CSI en cas de symptômes",
        "Associer la prise à une routine quotidienne et programmer des rappels",
        "Passer d'un CSI quotidien à un SABA régulier"
      ],
      correct: 2,
      explanation: "Ancrer une routine (ex: après le brossage) et utiliser des rappels/alertes sont des leviers d'observance; le CSI se prend tous les jours, même sans symptômes.",
      category: "Observance"
    },
    {
      id: 7,
      question: "Quel conseil environnemental est approprié chez un patient sensibilisé aux acariens ?",
      options: [
        "Aérer très peu pour conserver une atmosphère stable",
        "Utiliser des housses anti-acariens et aérer régulièrement",
        "Éviter tout contact extérieur pendant la saison pollinique",
        "Dormir avec l'animal domestique pour s'habituer"
      ],
      correct: 1,
      explanation: "Mesures utiles: housses anti-acariens, aération régulière, réduire les nids à poussière; éviter la fumée de tabac.",
      category: "Déclencheurs"
    },
    {
      id: 8,
      question: "En cas de signes de décompensation sévère (dyspnée marquée, difficulté à parler), quelle conduite recommander ?",
      options: [
        "Prendre deux bouffées de CSI et attendre",
        "Boire de l'eau et se reposer",
        "Administrer 2 bouffées de salbutamol si disponible et appeler le 15 en cas de détresse",
        "Doubler le traitement de fond pendant 48 heures"
      ],
      correct: 2,
      explanation: "Devant des signes sévères: recourir au bronchodilatateur de secours si disponible et contacter les secours (15) en cas de détresse respiratoire.",
      category: "Urgence"
    },
    {
      id: 9,
      question: "Quelle pratique de coordination/traçabilité est attendue après l'entretien ?",
      options: [
        "Aucune trace si le patient va mieux",
        "Tracer dans DP/DMP et envoyer un message MSS au médecin traitant si besoin",
        "Envoyer systématiquement l'ordonnance originale à la CPAM",
        "Appeler la pharmacie de garde pour information"
      ],
      correct: 1,
      explanation: "Tracer dans le DP/DMP, conserver les fiches d'entretien et informer le médecin via MSS si nécessaire font partie des bonnes pratiques.",
      category: "Coordination"
    },
    {
      id: 10,
      question: "Quelle affirmation est correcte concernant la facturation ?",
      options: [
        "Année 1: trois entretiens ASI à 15 €, 15 € et 20 €",
        "TAC correspond à un forfait de 10 € au démarrage",
        "Années suivantes: 3 entretiens annuels ASS",
        "Les entretiens sont toujours cumulables avec toute autre prestation le même jour"
      ],
      correct: 0,
      explanation: "Année 1: 3 entretiens (ASI 15 € + 15 € + 20 €). Les années suivantes: ASS 10 € + 20 €. TAC est un traceur d'adhésion (0,01 €). L'acte n'est pas cumulable sur le même flux le jour même.",
      category: "Facturation"
    }
  ];

  useEffect(() => {
    if (!startTime && currentQuestion === 0 && !showResults) {
      setStartTime(Date.now());
    }
  }, [currentQuestion, showResults, startTime]);

  const handleAnswer = (optionIndex) => {
    if (answered) return;
    const newAnswers = { ...selectedAnswers, [currentQuestion]: optionIndex };
    setSelectedAnswers(newAnswers);
    setAnswered(true);
    setShowExplanation(true);
    if (optionIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setShowExplanation(false);
    } else {
      setEndTime(Date.now());
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setShowExplanation(false);
    setScore(0);
    setAnswered(false);
    setStartTime(Date.now());
    setEndTime(null);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return { text: 'Excellent ! Maîtrise parfaite', icon: <Trophy className="w-8 h-8" />, color: 'text-yellow-400' };
    if (percentage >= 70) return { text: 'Très bien ! Bonnes connaissances', icon: <Award className="w-8 h-8" />, color: 'text-sky-400' };
    if (percentage >= 50) return { text: 'Bien ! À consolider', icon: <Target className="w-8 h-8" />, color: 'text-blue-400' };
    return { text: 'À revoir. Continuez vos efforts !', icon: <Wind className="w-8 h-8" />, color: 'text-orange-400' };
  };

  const getCategoryStats = () => {
    const stats = {};
    questions.forEach((q, idx) => {
      if (!stats[q.category]) {
        stats[q.category] = { total: 0, correct: 0 };
      }
      stats[q.category].total++;
      if (selectedAnswers[idx] === q.correct) {
        stats[q.category].correct++;
      }
    });
    return stats;
  };

  if (showResults) {
    const scoreMessage = getScoreMessage();
    const categoryStats = getCategoryStats();
    const timeTaken = endTime && startTime ? Math.floor((endTime - startTime) / 1000) : 0;
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;

    return (
      <div className="w-screen h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full bg-white rounded-3xl p-8 shadow-2xl border border-sky-200">
          <div className="text-center mb-8">
            <div className={`inline-flex ${scoreMessage.color} mb-4`}>
              {scoreMessage.icon}
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2">Résultats du QCM</h2>
            <p className="text-2xl text-sky-600">{scoreMessage.text}</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-sky-50 rounded-xl p-6 text-center border border-sky-200">
              <p className="text-slate-600 mb-2">Score</p>
              <p className="text-3xl font-bold text-slate-900">{score}/{questions.length}</p>
              <p className="text-sky-600">{Math.round((score / questions.length) * 100)}%</p>
            </div>
            <div className="bg-sky-50 rounded-xl p-6 text-center border border-sky-200">
              <p className="text-slate-600 mb-2">Temps</p>
              <p className="text-3xl font-bold text-slate-900">{minutes}:{seconds.toString().padStart(2, '0')}</p>
              <p className="text-sky-600">minutes</p>
            </div>
            <div className="bg-sky-50 rounded-xl p-6 text-center border border-sky-200">
              <p className="text-slate-600 mb-2">Moyenne</p>
              <p className="text-3xl font-bold text-slate-900">{Math.round(timeTaken / questions.length)}s</p>
              <p className="text-sky-600">par question</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Performance par catégorie</h3>
            <div className="space-y-3">
              {Object.entries(categoryStats).map(([category, stats]) => (
                <div key={category} className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg p-4 border border-sky-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-700">{category}</span>
                    <span className="text-sky-600 font-semibold">{stats.correct}/{stats.total}</span>
                  </div>
                  <div className="w-full bg-sky-100 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-sky-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.correct / stats.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-semibold hover:from-sky-500 hover:to-blue-600 transition-all duration-300 shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sky-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-slate-900">QCM - Accompagnement du patient asthmatique</h1>
            <div className="flex items-center gap-4">
              <span className="text-slate-600">Question {currentQuestion + 1}/{questions.length}</span>
              <div className="bg-sky-50 px-4 py-2 rounded-lg border border-sky-200">
                <span className="text-sky-600 font-semibold">Score: {score}</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-sky-100 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-sky-400 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-sky-200">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 text-sky-600 rounded-lg text-sm mb-4 border border-sky-200">
                <Wind className="w-4 h-4" />
                {currentQ.category}
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                {currentQ.question}
              </h2>
            </div>

            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion] === index;
                const isCorrect = index === currentQ.correct;
                const showFeedback = answered;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      !answered 
                        ? 'bg-sky-50 hover:bg-sky-100 border border-sky-200 hover:border-sky-300'
                        : isCorrect
                        ? 'bg-green-50 border border-green-400'
                        : isSelected
                        ? 'bg-red-50 border border-red-400'
                        : 'bg-slate-50 border border-slate-200 opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700">{option}</span>
                      {showFeedback && (
                        <div>
                          {isCorrect && <CheckCircle className="w-6 h-6 text-green-500" />}
                          {isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6 mb-6 border border-sky-300">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-sky-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sky-700 mb-2">Explication</h3>
                    <p className="text-slate-700">{currentQ.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={nextQuestion}
                disabled={!answered}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  answered
                    ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-white hover:from-sky-500 hover:to-blue-600 shadow-lg'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {currentQuestion === questions.length - 1 ? 'Voir les résultats' : 'Question suivante'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sky-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-sm text-slate-600">
          <span>© Contenu réalisé par le Docteur Dan Amzallag.</span>
          <span>Module : Asthme — QCM interactif</span>
        </div>
      </div>
    </div>
  );
};

export default AsthmaQCM;
