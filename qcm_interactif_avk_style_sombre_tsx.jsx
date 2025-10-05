import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronRight, CheckCircle, XCircle, AlertCircle, RotateCcw,
  Trophy, Award, Target, HeartPulse
} from 'lucide-react';

/**
 * QCM Interactif — AVK (style sombre)
 * Inspiré des modèles fournis (progression, feedback immédiat, explication, résultats avec stats, timer, recommencer)
 * Thèmes couverts : Éligibilité, INR, Alimentation/Vit K, Interactions (médicaments & phyto), Observance & carnet AVK,
 * Situations à risque (INR haut/bas, chirurgie), Vie quotidienne, Coordination/Traçabilité, Facturation TAC/ASI/ASS.
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
    question: "Quel patient est prioritaire pour l'accompagnement AVK en officine ?",
    options: [
      'Patient sous AOD depuis 2 semaines',
      'Patient sous warfarine/acénocoumarol avec suivi au long cours',
      'Patient avec ecchymoses post‑traumatiques isolées',
      'Patient sevré d’AVK depuis 6 mois'
    ],
    correct: 1,
    explanation: "L'accompagnement cible les patients sous AVK (warfarine, acénocoumarol) suivis au long cours (FA, MTEV, valves, SAPL…), pour sécuriser INR, observance et interactions."
  },
  {
    id: 2,
    type: 'single',
    category: 'INR',
    question: "Message clé concernant l’INR :",
    options: [
      "L'INR mesure la glycémie à jeun",
      "La cible est identique pour tous : 1,0",
      "L'INR guide l'ajustement : ne jamais modifier la dose sans avis",
      "L’INR ne concerne que les AOD"
    ],
    correct: 2,
    explanation: "L’INR est l’indicateur d’anticoagulation sous AVK et conditionne l’ajustement des doses. Le patient ne doit jamais modifier seul."
  },
  {
    id: 3,
    type: 'multi',
    category: 'Alimentation & Vit K',
    question: "Quelles recommandations sont correctes au sujet de la vitamine K ? (plusieurs réponses)",
    options: [
      'Régime stable, éviter les variations brutales d’aliments très verts',
      'Éliminer totalement tout aliment contenant de la vitamine K',
      'Informer en cas de changement majeur de régime',
      'Faire une cure détox « jus verts » 3 jours par mois'
    ],
    correctAnswers: [0, 2],
    explanation: "On privilégie la STABILITÉ des apports en vit K. Pas d’interdiction totale, mais éviter les variations rapides (cures vertes). Prévenir en cas de changement important."
  },
  {
    id: 4,
    type: 'multi',
    category: 'Interactions',
    question: "Sélectionnez les situations nécessitant une vigilance accrue sous AVK (plusieurs réponses)",
    options: [
      'Introduction d’amiodarone',
      'Automédication par ibuprofène',
      'Cure de millepertuis',
      'Association paracétamol aux doses usuelles'
    ],
    correctAnswers: [0, 1, 2],
    explanation: "Amiodarone, AINS (ex. ibuprofène) et millepertuis interagissent. Le paracétamol aux doses habituelles est généralement l’antalgique de 1er choix (prudence si fortes doses prolongées)."
  },
  {
    id: 5,
    type: 'single',
    category: 'Observance & carnet AVK',
    question: "Quel énoncé est correct concernant le carnet AVK ?",
    options: [
      'Il n’est utile que pour les urgences',
      'Il sert à noter doses, INR, RDV et contacts — à apporter à chaque passage',
      'Il remplace la traçabilité DP/DMP',
      "Il doit rester au domicile pour ne pas l'abîmer"
    ],
    correct: 1,
    explanation: "Le carnet AVK centralise doses/INR/RDV/contacts et doit accompagner le patient. Il complète la traçabilité (DP/DMP), il ne la remplace pas."
  },
  {
    id: 6,
    type: 'single',
    category: 'Situations à risque',
    question: "Conduite prioritaire devant un INR très élevé avec saignements :",
    options: [
      'Doubler la dose le lendemain',
      'Suspendre l’AVK et avis médical en urgence (± vitamine K selon protocole)',
      'Prendre de la vitamine C',
      'Attendre le prochain contrôle prévu'
    ],
    correct: 1,
    explanation: "INR haut + saignements = risque hémorragique : on suspend l’AVK et on contacte sans délai pour conduite médicale (vit K possible selon protocole)."
  },
  {
    id: 7,
    type: 'single',
    category: 'Pré‑op / actes invasifs',
    question: "Avant une chirurgie programmée sous AVK, quel principe ?",
    options: [
      'Arrêt la veille, sans informer le médecin',
      'Arrêt anticipé selon protocole et éventuel relais HBPM décidé médicalement',
      'Poursuite systématique des AVK',
      'Prise double la veille pour compenser l’arrêt'
    ],
    correct: 1,
    explanation: "L’arrêt est anticipé selon l’acte et le risque, avec relais héparine si indiqué. La décision relève du prescripteur ; le pharmacien sécurise et rappelle le plan."
  },
  {
    id: 8,
    type: 'single',
    category: 'Vie quotidienne',
    question: "Quel conseil est adapté au quotidien ?",
    options: [
      'Rasage électrique et brosse à dents souple',
      'Sports de contact encouragés',
      'Alcool à volonté',
      'Ne pas porter la carte anticoagulant en dehors des RDV'
    ],
    correct: 0,
    explanation: "On limite les risques de saignement (rasage électrique, brosse souple), alcool avec modération, et carte anticoagulant toujours sur soi."
  },
  {
    id: 9,
    type: 'single',
    category: 'Coordination & traçabilité',
    question: "Bonne pratique après l’entretien :",
    options: [
      'Aucune trace si tout va bien',
      'Traçabilité DP/DMP, CR court si besoin, et message MSS au MT si situation clinique à signaler',
      'Envoyer l’ordonnance originale à la CPAM',
      'Téléphoner à la pharmacie de garde chaque soir'
    ],
    correct: 1,
    explanation: "Tracer dans DP/DMP, conserver les fiches, informer le MT via MSS si utile sont attendus."
  },
  {
    id: 10,
    type: 'single',
    category: 'Facturation',
    question: "Quelle affirmation est correcte ?",
    options: [
      'Année 1 : ASI 15 € + 15 € + 20 € ; Années suivantes : ASS 10 € + 20 €',
      'TAC = 10 € forfait au démarrage',
      'Actes cumulables avec toute autre prestation le même jour',
      'Fréquence libre : autant d’entretiens que souhaité'
    ],
    correct: 0,
    explanation: "TAC = traceur (0,01 €). Année 1 : 3 entretiens ASI (15/15/20). Années suivantes : ASS (10/20). Acte isolé non cumulable le jour même sur le même flux."
  }
];

// Component
const AVKQCM: React.FC = () => {
  const [qIndex, setQIndex] = useState(0);
  const [singleSelections, setSingleSelections] = useState<Record<number, number | undefined>>({});
  const [multiSelections, setMultiSelections] = useState<Record<number, number[]>>({});
  const [validated, setValidated] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  useEffect(() => {
    if (startTime === null) setStartTime(Date.now());
  }, [startTime]);

  const current = questions[qIndex];
  const total = questions.length;
  const progress = ((qIndex + 1) / total) * 100;

  const toggleMulti = (idx: number) => {
    if (validated[qIndex]) return;
    const currentSel = multiSelections[qIndex] || [];
    const exists = currentSel.includes(idx);
    const nextSel = exists ? currentSel.filter((i) => i !== idx) : [...currentSel, idx];
    setMultiSelections({ ...multiSelections, [qIndex]: nextSel });
  };

  const answerSingle = (idx: number) => {
    if (validated[qIndex]) return;
    const isCorrect = (current as QuestionSingle).correct === idx;
    setSingleSelections({ ...singleSelections, [qIndex]: idx });
    setValidated({ ...validated, [qIndex]: true });
    if (isCorrect) setScore((s) => s + 1);
  };

  const validateMulti = () => {
    if (validated[qIndex]) return;
    const sel = new Set(multiSelections[qIndex] || []);
    const corr = new Set((current as QuestionMulti).correctAnswers);
    const isCorrect = sel.size === corr.size && [...sel].every((x) => corr.has(x));
    setValidated({ ...validated, [qIndex]: true });
    if (isCorrect) setScore((s) => s + 1);
  };

  const next = () => {
    if (qIndex < total - 1) {
      setQIndex(qIndex + 1);
    } else {
      setEndTime(Date.now());
      setShowResults(true);
    }
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
      ? { text: 'Excellent ! Maîtrise parfaite', icon: <Trophy className="w-8 h-8" />, color: 'text-yellow-300' }
      : pct >= 70
      ? { text: 'Très bien ! Bon niveau', icon: <Award className="w-8 h-8" />, color: 'text-sky-300' }
      : pct >= 50
      ? { text: 'Correct — à consolider', icon: <Target className="w-8 h-8" />, color: 'text-blue-300' }
      : { text: 'À retravailler', icon: <HeartPulse className="w-8 h-8" />, color: 'text-rose-300' };

    return (
      <div className="w-screen h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-8">
        <div className="max-w-4xl w-full bg-gray-900/80 rounded-3xl p-8 shadow-2xl border border-gray-700">
          <div className="text-center mb-8">
            <div className={`inline-flex ${msg.color} mb-4`}>{msg.icon}</div>
            <h2 className="text-4xl font-bold text-white mb-2">Résultats du QCM AVK</h2>
            <p className="text-2xl text-gray-300">{msg.text}</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
              <p className="text-gray-400 mb-2">Score</p>
              <p className="text-3xl font-bold text-white">{score}/{total}</p>
              <p className="text-gray-300">{pct}%</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
              <p className="text-gray-400 mb-2">Temps</p>
              <p className="text-3xl font-bold text-white">{minutes}:{rem.toString().padStart(2, '0')}</p>
              <p className="text-gray-300">min:s</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
              <p className="text-gray-400 mb-2">Moyenne</p>
              <p className="text-3xl font-bold text-white">{Math.round(seconds / total)}s</p>
              <p className="text-gray-300">par question</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Performance par catégorie</h3>
            <div className="space-y-3">
              {Object.entries(categoryStats).map(([cat, st]) => (
                <div key={cat} className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">{cat}</span>
                    <span className="text-sky-300 font-semibold">{st.correct}/{st.total}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-sky-400 to-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(st.correct / st.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={reset} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-red-500 text-white rounded-xl font-semibold hover:from-rose-700 hover:to-red-600 transition-all duration-300 shadow-lg">
              <RotateCcw className="w-5 h-5" />
              Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isValidated = !!validated[qIndex];
  const isMulti = current.type === 'multi';

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800 bg-gray-900/80 backdrop-blur">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-white">QCM — Patients sous AVK</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Question {qIndex + 1}/{total}</span>
              <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                <span className="text-rose-300 font-semibold">Score: {score}</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div className="bg-gradient-to-r from-rose-600 to-red-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <div className="bg-gray-900/80 rounded-3xl p-8 shadow-2xl border border-gray-700">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800 text-rose-300 rounded-lg text-sm mb-4 border border-gray-700">
                <HeartPulse className="w-4 h-4" />
                {current.category}
              </span>
              <h2 className="text-2xl font-bold text-white">{current.question}</h2>
            </div>

            <div className="space-y-3 mb-6">
              {current.options.map((opt, idx) => {
                const selSingle = singleSelections[qIndex];
                const selMulti = multiSelections[qIndex] || [];
                const isSelected = isMulti ? selMulti.includes(idx) : selSingle === idx;

                // compute correctness after validation
                const isCorrect = current.type === 'single' ? idx === current.correct : (current.correctAnswers || []).includes(idx);

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (current.type === 'single') return answerSingle(idx);
                      toggleMulti(idx);
                    }}
                    disabled={current.type === 'single' ? isValidated : false}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      !isValidated
                        ? (isSelected ? 'bg-gray-800 border border-rose-500' : 'bg-gray-800/60 hover:bg-gray-800 border border-gray-700 hover:border-gray-600')
                        : isCorrect
                        ? 'bg-green-900/30 border border-green-600'
                        : isSelected
                        ? 'bg-red-900/30 border border-red-600'
                        : 'bg-gray-800/40 border border-gray-700 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-200">{opt}</span>
                      {isValidated && (
                        <div>
                          {isCorrect && <CheckCircle className="w-6 h-6 text-green-400" />}
                          {!isCorrect && isSelected && <XCircle className="w-6 h-6 text-red-400" />}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {isValidated && (
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 mb-6 border border-gray-700">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-rose-300 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-rose-200 mb-2">Explication</h3>
                    <p className="text-gray-200">{'explanation' in current ? current.explanation : ''}</p>
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
                      ? 'bg-gradient-to-r from-rose-600 to-red-500 text-white hover:from-rose-700 hover:to-red-600 shadow-lg'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
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
                    ? 'bg-gradient-to-r from-rose-600 to-red-500 text-white hover:from-rose-700 hover:to-red-600 shadow-lg'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
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
      <div className="p-4 border-t border-gray-800 bg-gray-900/80 backdrop-blur">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <span>© Contenu réalisé par le Docteur Dan Amzallag.</span>
          <span>Module : AVK — QCM interactif</span>
        </div>
      </div>
    </div>
  );
};

export default AVKQCM;
