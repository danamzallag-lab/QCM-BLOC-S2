import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRight, CheckCircle, XCircle, AlertCircle, RotateCcw, Trophy, Award, Target, CheckCircle2 } from 'lucide-react';

/**
 * QCM Interactif — Bloc 2 : Actualisation du métier du pharmacien
 * Thèmes couverts : Femme enceinte • Opioïdes • Asthme • AVK • AOD
 * Modèle interactif (clair) : progression, feedback immédiat, explications, stats par catégorie, timer, restart.
 * Footer : © Contenu réalisé par le Docteur Dan Amzallag.
 */

type QuestionSingle = {
  id: number;
  type: 'single';
  category: string;
  question: string;
  options: string[];
  correct: number; // index
  explanation: string;
};

type QuestionMulti = {
  id: number;
  type: 'multi';
  category: string;
  question: string;
  options: string[];
  correctAnswers: number[]; // indices
  explanation: string;
};

type Question = QuestionSingle | QuestionMulti;

const questions: Question[] = [
  // ——— Femme enceinte (3)
  {
    id: 1,
    type: 'single',
    category: 'Femme enceinte',
    question: "Antalgique de 1er choix pendant la grossesse (si nécessaire et aux doses usuelles) :",
    options: ['Ibuprofène', 'Paracétamol', 'Kétoprofène', 'Aspirine systématique'],
    correct: 1,
    explanation: "Le paracétamol est l’antalgique/antipyrétique de référence si nécessaire. Les AINS sont contre-indiqués au 3e trimestre et à éviter sans avis médical." 
  },
  {
    id: 2,
    type: 'multi',
    category: 'Femme enceinte',
    question: 'Conseils prioritaires à rappeler (plusieurs réponses) :',
    options: [
      'Pas d’automédication sans avis pharmaceutique',
      'Signalement immédiat de tout saignement ou douleur abdominale inhabituelle',
      'Association systématique huiles essentielles',
      'Carnet de suivi et calendrier vaccinal à jour'
    ],
    correctAnswers: [0, 1, 3],
    explanation: "Autonomie mais sans automédication risquée ; repérer signes d’alerte ; sécuriser le parcours (suivi, vaccinations selon recommandations)."
  },
  {
    id: 3,
    type: 'single',
    category: 'Femme enceinte',
    question: 'Concernant les AINS pendant la grossesse :',
    options: [
      'Autorisation large au 2e et 3e trimestres',
      'Contre-indiqués au 3e trimestre (risques fœto-maternels)',
      'Toujours préférés au paracétamol',
      'Sans impact sur le canal artériel'
    ],
    correct: 1,
    explanation: "Les AINS sont contre-indiqués au 3e trimestre (risque de fermeture du canal artériel, insuffisance rénale fœtale, hémorragies)."
  },

  // ——— Opioïdes (3)
  {
    id: 4,
    type: 'multi',
    category: 'Opioïdes antalgiques',
    question: 'Bonnes pratiques à l’initiation d’un opioïde (plusieurs réponses) :',
    options: [
      'Informer sur somnolence et conduite automobile',
      'Prévenir la constipation (laxatif conseillé)',
      'Conseiller de doubler la dose en cas de douleur persistante d’emblée',
      'Évaluer interactions et co‑médications sédatives'
    ],
    correctAnswers: [0, 1, 3],
    explanation: "Information sécurité (somnolence), prévention systématique de la constipation, revue médicamenteuse et interactions ; pas d’escalade anarchique."
  },
  {
    id: 5,
    type: 'single',
    category: 'Opioïdes antalgiques',
    question: 'Signe d’alerte d’un surdosage opioïde nécessitant une prise en charge urgente :',
    options: ['Myosis + bradypnée + somnolence profonde', 'Toux sèche isolée', 'Rhinorrhée', 'Prurit cutané léger'],
    correct: 0,
    explanation: "La triade myosis, dépression respiratoire, somnolence profonde évoque un surdosage. Appel urgence et conduite adaptée."
  },
  {
    id: 6,
    type: 'single',
    category: 'Opioïdes antalgiques',
    question: 'À propos du tramadol :',
    options: [
      'C’est sans risque d’interactions',
      'Peut majorer le risque de syndrome sérotoninergique avec certains antidépresseurs',
      'Toujours associé à un AINS',
      'N’entraîne jamais de somnolence'
    ],
    correct: 1,
    explanation: "Le tramadol a un risque sérotoninergique (ISRS/IMAO/IRSNa…) et peut entraîner somnolence ; l’association systématique aux AINS n’est pas une règle."
  },

  // ——— Asthme (3)
  {
    id: 7,
    type: 'multi',
    category: 'Asthme',
    question: 'Points clés du suivi officinal (plusieurs réponses) :',
    options: [
      'Vérification régulière de la technique d’inhalation',
      'Repérage d’un sur‑usage de SABA (≥3 boîtes/an)',
      'Arrêt arbitraire des CSI dès amélioration',
      'Plan d’action écrit et adhésion'
    ],
    correctAnswers: [0, 1, 3],
    explanation: "Technique d’inhalation = déterminante ; sur‑usage de SABA est un signal de risque ; le traitement de fond ne s’arrête pas sans avis."
  },
  {
    id: 8,
    type: 'single',
    category: 'Asthme',
    question: 'Message correct au comptoir :',
    options: [
      '“Le traitement de fond (CSI ± LABA) se prend tous les jours, même sans symptômes.”',
      '“Le SABA est à prendre systématiquement avant chaque sortie.”',
      '“Les inhalateurs n’influencent pas l’adhésion.”',
      '“Un seul passage à l’officine suffit pour apprendre la technique.”'
    ],
    correct: 0,
    explanation: "Le contrôle repose sur l’observance du fond ; le SABA est de secours ; l’éducation inhalatoire est répétée et personnalisée."
  },
  {
    id: 9,
    type: 'single',
    category: 'Asthme',
    question: 'Priorité en cas d’exacerbation suspectée :',
    options: ['Reporter toute prise en charge', 'Conseiller d’augmenter le SABA sans évaluation', 'Orienter selon plan d’action et signes de gravité', 'Arrêter le CSI'],
    correct: 2,
    explanation: "On s’appuie sur le plan d’action et la recherche de signes de gravité ; pas d’arrêt sauvage du traitement de fond."
  },

  // ——— AVK (3)
  {
    id: 10,
    type: 'single',
    category: 'AVK',
    question: 'Message central sur l’alimentation et la vitamine K :',
    options: ['Éviter définitivement les légumes verts', 'Stabiliser les apports sans faire de variations brutales', 'Faire des cures “détox” très vertes', 'Supprimer toute huile végétale'],
    correct: 1,
    explanation: "On recherche la stabilité des apports en vitamine K ; pas d’interdiction absolue mais éviter les variations rapides."
  },
  {
    id: 11,
    type: 'multi',
    category: 'AVK',
    question: 'Précautions / interactions à rappeler (plusieurs réponses) :',
    options: [
      'AINS/aspirine sans avis : à éviter',
      'Millepertuis : contre‑indiqué',
      'Adaptation de dose par le patient selon son ressenti',
      'Carnet AVK à jour et carte anticoagulant sur soi'
    ],
    correctAnswers: [0, 1, 3],
    explanation: "AINS/aspirine augmentent le risque hémorragique ; le millepertuis est contre‑indiqué ; traçabilité indispensable ; jamais d’auto‑adaptation."
  },
  {
    id: 12,
    type: 'single',
    category: 'AVK',
    question: 'Conduite correcte si INR très élevé + signes hémorragiques :',
    options: ['Poursuivre et recontrôler plus tard', 'Suspendre l’AVK et orienter immédiatement pour avis médical', 'Doubler la dose suivante', 'Ignorer si pas de douleur'],
    correct: 1,
    explanation: "Signe d’alarme : arrêt temporaire et orientation immédiate ; adaptation selon protocole médical (vitamine K possible)."
  },

  // ——— AOD (3)
  {
    id: 13,
    type: 'multi',
    category: 'AOD',
    question: 'Choisissez les affirmations correctes concernant la prise :',
    options: [
      'Rivaroxaban 15/20 mg à prendre avec repas',
      'Ne jamais doubler une dose oubliée',
      'Tous les AOD nécessitent un INR mensuel',
      'Associer la prise à une routine + rappels'
    ],
    correctAnswers: [0, 1, 3],
    explanation: "Rivaroxaban 15/20 mg : avec repas ; pas de rattrapage en doublant ; pas de surveillance d’INR systématique ; ancrer la prise dans le quotidien."
  },
  {
    id: 14,
    type: 'single',
    category: 'AOD',
    question: 'Couple antidote — molécule correctement associé :',
    options: ['Idarucizumab — dabigatran', 'Andexanet alfa — dabigatran', 'Vitamine K — apixaban', 'Aucun antidote n’existe'],
    correct: 0,
    explanation: "Idarucizumab pour le dabigatran ; andexanet alfa pour les anti‑Xa (apixaban, rivaroxaban, ± édoxaban selon indications locales)."
  },
  {
    id: 15,
    type: 'single',
    category: 'AOD',
    question: 'Avant une chirurgie à risque hémorragique :',
    options: [
      'Arrêt généralement 24–48 h selon risque et fonction rénale (décision médicale)',
      'Poursuite systématique',
      'Relais HBPM automatique pour tous',
      'Doubler la dose la veille'
    ],
    correct: 0,
    explanation: "La fenêtre d’arrêt dépend du geste et de la clairance rénale ; le relais n’est pas systématique et relève du prescripteur."
  }
];

const QCMBloc2: React.FC = () => {
  const [qIndex, setQIndex] = useState(0);
  const [singleSelections, setSingleSelections] = useState<Record<number, number | undefined>>({});
  const [multiSelections, setMultiSelections] = useState<Record<number, number[]>>({});
  const [validated, setValidated] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  useEffect(() => { if (startTime === null) setStartTime(Date.now()); }, [startTime]);

  const current = questions[qIndex];
  const total = questions.length;
  const progress = ((qIndex + 1) / total) * 100;
  const isValidated = !!validated[qIndex];
  const isMulti = current.type === 'multi';

  const toggleMulti = (idx: number) => {
    if (validated[qIndex]) return;
    const cur = multiSelections[qIndex] || [];
    const next = cur.includes(idx) ? cur.filter((i) => i !== idx) : [...cur, idx];
    setMultiSelections({ ...multiSelections, [qIndex]: next });
  };

  const answerSingle = (idx: number) => {
    if (validated[qIndex]) return;
    const ok = (current as QuestionSingle).correct === idx;
    setSingleSelections({ ...singleSelections, [qIndex]: idx });
    setValidated({ ...validated, [qIndex]: true });
    if (ok) setScore((s) => s + 1);
  };

  const validateMulti = () => {
    if (validated[qIndex]) return;
    const sel = new Set(multiSelections[qIndex] || []);
    const corr = new Set((current as QuestionMulti).correctAnswers);
    const ok = sel.size === corr.size && [...sel].every((x) => corr.has(x));
    setValidated({ ...validated, [qIndex]: true });
    if (ok) setScore((s) => s + 1);
  };

  const next = () => {
    if (qIndex < total - 1) setQIndex(qIndex + 1);
    else { setEndTime(Date.now()); setShowResults(true); }
  };

  const reset = () => {
    setQIndex(0);
    setSingleSelections({});
    setMultiSelections({});
    setValidated({});
    setScore(0);
    setShowResults(false);
    setStartTime(Date.now());
    setEndTime(null);
  };

  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; correct: number }> = {};
    questions.forEach((q, idx) => {
      if (!stats[q.category]) stats[q.category] = { total: 0, correct: 0 };
      stats[q.category].total += 1;
      const ok = (() => {
        if (!validated[idx]) return false;
        if (q.type === 'single') return singleSelections[idx] === q.correct;
        const sel = new Set(multiSelections[idx] || []);
        const corr = new Set(q.correctAnswers);
        return sel.size === corr.size && [...sel].every((x) => corr.has(x));
      })();
      if (ok) stats[q.category].correct += 1;
    });
    return stats;
  }, [validated, singleSelections, multiSelections]);

  if (showResults) {
    const seconds = endTime && startTime ? Math.max(0, Math.floor((endTime - startTime) / 1000)) : 0;
    const minutes = Math.floor(seconds / 60);
    const rem = seconds % 60;
    const pct = Math.round((score / total) * 100);
    const msg = pct >= 90
      ? { text: 'Excellent ! Maîtrise parfaite', icon: <Trophy className="w-8 h-8" />, color: 'text-yellow-600' }
      : pct >= 70
      ? { text: 'Très bien ! Bon niveau', icon: <Award className="w-8 h-8" />, color: 'text-indigo-600' }
      : pct >= 50
      ? { text: 'Correct — à consolider', icon: <Target className="w-8 h-8" />, color: 'text-emerald-600' }
      : { text: 'À retravailler', icon: <CheckCircle2 className="w-8 h-8" />, color: 'text-rose-600' };

    return (
      <div className="w-screen h-screen bg-gradient-to-br from-white via-slate-50 to-white flex items-center justify-center p-8">
        <div className="max-w-5xl w-full bg-white/90 rounded-3xl p-8 shadow-xl border border-slate-200">
          <div className="text-center mb-8">
            <div className={`inline-flex ${msg.color} mb-4`}>{msg.icon}</div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2">Résultats — QCM Bloc 2</h2>
            <p className="text-2xl text-slate-700">{msg.text}</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-sm">
              <p className="text-slate-500 mb-2">Score</p>
              <p className="text-3xl font-bold text-slate-900">{score}/{total}</p>
              <p className="text-slate-700">{pct}%</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-sm">
              <p className="text-slate-500 mb-2">Temps</p>
              <p className="text-3xl font-bold text-slate-900">{minutes}:{rem.toString().padStart(2, '0')}</p>
              <p className="text-slate-700">min:s</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-sm">
              <p className="text-slate-500 mb-2">Moyenne</p>
              <p className="text-3xl font-bold text-slate-900">{Math.round(seconds / total)}s</p>
              <p className="text-slate-700">par question</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Performance par catégorie</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(categoryStats).map(([cat, st]) => (
                <div key={cat} className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-700">{cat}</span>
                    <span className="text-indigo-700 font-semibold">{st.correct}/{st.total}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(st.correct / st.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={reset} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-emerald-600 transition-all duration-300 shadow-lg">
              <RotateCcw className="w-5 h-5" />
              Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-white via-slate-50 to-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-slate-900">QCM — Bloc 2 : Femme enceinte • Opioïdes • Asthme • AVK • AOD</h1>
            <div className="flex items-center gap-4">
              <span className="text-slate-600">Question {qIndex + 1}/{total}</span>
              <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                <span className="text-indigo-700 font-semibold">Score: {score}</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-5xl w-full">
          <div className="bg-white/90 rounded-3xl p-8 shadow-xl border border-slate-200">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm mb-4 border border-indigo-200">
                {current.category}
              </span>
              <h2 className="text-2xl font-bold text-slate-900">{current.question}</h2>
            </div>

            <div className="space-y-3 mb-6">
              {current.options.map((opt, idx) => {
                const selSingle = singleSelections[qIndex];
                const selMulti = multiSelections[qIndex] || [];
                const isSelected = current.type === 'multi' ? selMulti.includes(idx) : selSingle === idx;
                const isCorrect = current.type === 'single' ? idx === (current as QuestionSingle).correct : (current as QuestionMulti).correctAnswers.includes(idx);

                return (
                  <button
                    key={idx}
                    onClick={() => { current.type === 'single' ? answerSingle(idx) : toggleMulti(idx); }}
                    disabled={current.type === 'single' ? isValidated : false}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      !isValidated
                        ? (isSelected ? 'bg-indigo-50 border border-indigo-300' : 'bg-white hover:bg-slate-50 border border-slate-200')
                        : isCorrect
                        ? 'bg-emerald-50 border border-emerald-300'
                        : isSelected
                        ? 'bg-rose-50 border border-rose-300'
                        : 'bg-white border border-slate-200 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-800">{opt}</span>
                      {isValidated && (
                        <div>
                          {isCorrect && <CheckCircle className="w-6 h-6 text-emerald-600" />}
                          {!isCorrect && isSelected && <XCircle className="w-6 h-6 text-rose-600" />}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {isValidated && (
              <div className="bg-gradient-to-r from-slate-100 to-white rounded-xl p-6 mb-6 border border-slate-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-indigo-700 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-indigo-800 mb-2">Explication</h3>
                    <p className="text-slate-800">{'explanation' in current ? (current as any).explanation : ''}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3">
              {isMulti && !isValidated && (
                <button
                  onClick={validateMulti}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    (multiSelections[qIndex] || []).length > 0
                      ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 text-white hover:from-indigo-600 hover:to-emerald-600 shadow-lg'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                  disabled={(multiSelections[qIndex] || []).length === 0}
                >
                  Valider
                </button>
              )}
              <button
                onClick={next}
                disabled={!isValidated}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isValidated
                    ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 text-white hover:from-indigo-600 hover:to-emerald-600 shadow-lg'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                {qIndex === total - 1 ? 'Voir les résultats' : 'Question suivante'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 bg-white/80 backdrop-blur">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-slate-600">
          <span>© Contenu réalisé par le Docteur Dan Amzallag.</span>
          <span>Bloc 2 — QCM général</span>
        </div>
      </div>
    </div>
  );
};

export default QCMBloc2;
