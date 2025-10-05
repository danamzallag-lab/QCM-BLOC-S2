import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRight, CheckCircle, XCircle, AlertCircle, RotateCcw, Trophy, Award, Target, CheckCircle2 } from 'lucide-react';

/**
 * QCM Interactif — AOD (style clair)
 * Inspiré des modèles fournis : progression, feedback immédiat, panneau d’explication,
 * résultats avec stats par catégorie, timer, bouton Recommencer.
 * Thèmes : Éligibilité, Posologie, Oublis, Interactions (P‑gp/CYP3A4), Saignement/Antidotes,
 * Actes invasifs, Vie quotidienne, Coordination/Traçabilité, Facturation TAC/ASI/ASS.
 * Footer obligatoire : © Contenu réalisé par le Docteur Dan Amzallag.
 */

// Types
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
  {
    id: 1,
    type: 'single',
    category: 'Éligibilité',
    question: "Quel patient est éligible/prioritaire pour l’accompagnement AOD en officine ?",
    options: [
      'Patient sous warfarine au long cours',
      'Patient sous apixaban/rivaroxaban/dabigatran/édoxaban',
      'Patient sous héparine de bas poids moléculaire ponctuelle',
      'Patient sevré de tout anticoagulant depuis 1 an'
    ],
    correct: 1,
    explanation: "L’accompagnement AOD concerne les patients traités par apixaban, rivaroxaban, dabigatran ou édoxaban, à l’initiation ou au long cours."
  },
  {
    id: 2,
    type: 'multi',
    category: 'Posologie',
    question: 'Quelles affirmations sont correctes concernant la prise des AOD ? (plusieurs réponses) ',
    options: [
      'Ne jamais doubler une dose pour rattraper un oubli',
      'Rivaroxaban 15/20 mg : à prendre avec un repas',
      'Tous les AOD se prennent strictement à jeun',
      'Adapter les horaires au quotidien pour favoriser l’observance'
    ],
    correctAnswers: [0, 1, 3],
    explanation: "Rivaroxaban 15/20 mg nécessite un repas pour une bonne biodisponibilité. On n’augmente jamais la dose pour rattraper. Les horaires peuvent s’ancrer à des routines."
  },
  {
    id: 3,
    type: 'multi',
    category: 'Oublis',
    question: 'Conduites en cas d’oubli (généralités) — cochez les réponses correctes',
    options: [
      'Prise 1/j : prendre la dose oubliée si l’on s’en rend compte le même jour',
      'Prise 1/j : doubler la dose le lendemain',
      'Prise 2/j : prendre dès que possible si l’intervalle est court',
      'Prise 2/j : si l’heure suivante est proche, attendre la prochaine prise'
    ],
    correctAnswers: [0, 2, 3],
    explanation: "Règle générale : ne pas doubler. 1/j : rattraper dans la même journée sinon sauter. 2/j : prendre dès que possible si intervalle raisonnable, sinon attendre la prochaine."
  },
  {
    id: 4,
    type: 'multi',
    category: 'Interactions',
    question: 'Sélectionnez les situations nécessitant une vigilance accrue (interactions)',
    options: [
      'Introduction d’un inhibiteur/inducteur puissant de P‑gp/CYP3A4',
      'Millepertuis',
      'Automédication par AINS/aspirine sans avis',
      'Paracétamol aux doses usuelles'
    ],
    correctAnswers: [0, 1, 2],
    explanation: "Inhibiteurs/inducteurs P‑gp/CYP3A4, millepertuis et AINS/aspirine augmentent le risque. Le paracétamol aux doses usuelles reste l’antalgique de référence."
  },
  {
    id: 5,
    type: 'single',
    category: 'Saignement/Antidotes',
    question: 'Quel couple antidote–médicament est correctement associé ?',
    options: [
      'Idarucizumab — anti‑Xa',
      'Andexanet alfa — dabigatran',
      'Idarucizumab — dabigatran',
      'Vitamine K — apixaban'
    ],
    correct: 2,
    explanation: "Idarucizumab est l’antidote spécifique du dabigatran. Andexanet alfa cible les anti‑Xa (apixaban, rivaroxaban, ± édoxaban selon indications locales)."
  },
  {
    id: 6,
    type: 'single',
    category: 'Saignement (conduite)',
    question: 'Conduite prioritaire face à un saignement majeur sous AOD :',
    options: [
      'Poursuivre l’AOD et surveiller',
      'Arrêt temporaire et orientation en urgence (antidote possible selon molécule)',
      'Doubler la dose suivante pour compenser',
      'Boire de l’eau sucrée'
    ],
    correct: 1,
    explanation: "Devant un saignement majeur : arrêt temporaire, orientation en urgence, bilan et éventuel usage d’un antidote spécifique selon la molécule."
  },
  {
    id: 7,
    type: 'single',
    category: 'Actes invasifs',
    question: 'Avant une chirurgie à risque hémorragique, le principe général est :',
    options: [
      'Arrêt 24–48 h avant selon risque et fonction rénale (décision médicale)',
      'Arrêt la veille uniquement, quelle que soit la situation',
      'Poursuite systématique des AOD',
      'Relais HBPM automatique pour tous'
    ],
    correct: 0,
    explanation: "L’arrêt est anticipé selon le geste et la clairance rénale ; le relais HBPM n’est pas systématique et relève de la décision médicale."
  },
  {
    id: 8,
    type: 'single',
    category: 'Vie quotidienne',
    question: 'Quel conseil au quotidien est approprié ?',
    options: [
      'Sports de contact encouragés',
      'Carte anticoagulant sur soi et informer tout soignant',
      'Automédication sans avis',
      'Doubler la dose lors d’oubli'
    ],
    correct: 1,
    explanation: "Informer les soignants et porter la carte anticoagulant ; éviter sports de contact ; pas d’automédication risquée ; jamais de double dose."
  },
  {
    id: 9,
    type: 'single',
    category: 'Coordination/Traçabilité',
    question: 'Bonne pratique officinale après l’entretien AOD :',
    options: [
      'Aucune trace si tout va bien',
      'Traçabilité DP/DMP, fiches archivées ; MSS au MT si besoin',
      'Envoyer l’ordonnance originale à la CPAM',
      'Téléphoner chaque soir au patient'
    ],
    correct: 1,
    explanation: "Tracer dans DP/DMP, conserver les fiches, informer le médecin (MSS) en cas de besoin font partie du standard de qualité."
  },
  {
    id: 10,
    type: 'single',
    category: 'Facturation',
    question: 'Quelle affirmation est correcte concernant la facturation ?',
    options: [
      'Année 1 : ASI 15 € + 15 € + 20 € ; Années suivantes : ASS 10 € + 20 €',
      'TAC = 10 € au démarrage',
      'Actes cumulables avec toute autre prestation le même jour',
      'Nombre d’entretiens annuel libre'
    ],
    correct: 0,
    explanation: "TAC = traceur (0,01 €). Année 1 : 3 entretiens ASI (15/15/20). Années suivantes : ASS (10/20). Acte isolé non cumulable le même jour sur le même flux."
  }
];

const AODQCM: React.FC = () => {
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
        <div className="max-w-4xl w-full bg-white/90 rounded-3xl p-8 shadow-xl border border-slate-200">
          <div className="text-center mb-8">
            <div className={`inline-flex ${msg.color} mb-4`}>{msg.icon}</div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2">Résultats du QCM AOD</h2>
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
            <div className="space-y-3">
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
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-slate-900">QCM — Patients sous AOD</h1>
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
        <div className="max-w-4xl w-full">
          <div className="bg-white/90 rounded-3xl p-8 shadow-xl border border-slate-200">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm mb-4 border border-indigo-200">
                AOD — {current.category}
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
                    <p className="text-slate-800">{'explanation' in current ? current.explanation : ''}</p>
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
        <div className="max-w-4xl mx-auto flex items-center justify-between text-sm text-slate-600">
          <span>© Contenu réalisé par le Docteur Dan Amzallag.</span>
          <span>Module : AOD — QCM interactif</span>
        </div>
      </div>
    </div>
  );
};

export default AODQCM;