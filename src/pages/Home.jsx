import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const modules = [
  {
    id: 'femme-enceinte',
    title: 'Femme Enceinte',
    icon: '👶',
    subtitle: 'Entretien de Prévention',
    description: 'Accompagnement médicamenteux pendant la grossesse : repérage, messages clés, risques et coordination.',
    questions: 7,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600',
    path: '/femme-enceinte',
    code: 'EFE'
  },
  {
    id: 'opioides',
    title: 'Opioïdes Palier II',
    icon: '💊',
    subtitle: 'Accompagnement EPA',
    description: 'Suivi des patients sous antalgiques opioïdes : mésusage, interactions et traçabilité.',
    questions: 8,
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    path: '/opioides',
    code: 'EPA'
  },
  {
    id: 'asthme',
    title: 'Asthme',
    icon: '🫁',
    subtitle: 'Accompagnement ASI/ASS',
    description: 'Parcours d\'accompagnement complet : techniques d\'inhalation, observance et plan d\'action.',
    questions: 10,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    path: '/asthme',
    code: 'ASI'
  },
  {
    id: 'avk',
    title: 'AVK',
    icon: '🩸',
    subtitle: 'Anti-vitamine K',
    description: 'Surveillance INR, interactions alimentaires et médicamenteuses, gestion des risques.',
    questions: 12,
    color: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    path: '/avk',
    code: 'AVK'
  },
  {
    id: 'aod',
    title: 'AOD',
    icon: '💉',
    subtitle: 'Anticoagulants Oraux Directs',
    description: 'Observance, interactions, situations à risque et conseils pratiques.',
    questions: 10,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    path: '/aod',
    code: 'AOD'
  },
  {
    id: 'complet',
    title: 'Évaluation Complète',
    icon: '⭐',
    subtitle: 'Tous les Modules',
    description: 'Test complet regroupant tous les modules du Bloc 2 pour une évaluation globale.',
    questions: 47,
    color: 'from-yellow-500 to-amber-500',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
    path: '/complet',
    code: 'BLOC 2'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Formation Pharmacie
              </h1>
              <p className="text-slate-600 mt-1">Bloc 2 - Entretiens Pharmaceutiques</p>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900">{modules.reduce((acc, m) => acc + m.questions, 0)}</div>
                <div className="text-sm text-slate-500">Questions totales</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900">{modules.length}</div>
                <div className="text-sm text-slate-500">Modules</div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Modules de Formation Interactifs
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Évaluez vos connaissances avec des QCM professionnels couvrant l'ensemble du référentiel
            de formation officinale. Feedback détaillé et scoring en temps réel.
          </p>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link to={module.path} className="block h-full">
                <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-transparent overflow-hidden h-full">
                  {/* Card Header with Gradient */}
                  <div className={`h-2 bg-gradient-to-r ${module.color}`}></div>

                  <div className="p-6">
                    {/* Icon and Code */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 ${module.bgColor} rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                        {module.icon}
                      </div>
                      <span className={`px-3 py-1 ${module.bgColor} ${module.textColor} rounded-full text-xs font-semibold`}>
                        {module.code}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {module.title}
                    </h3>
                    <p className={`text-sm font-medium ${module.textColor} mb-3`}>
                      {module.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {module.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span className="text-sm font-medium text-slate-700">{module.questions} questions</span>
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-semibold ${module.textColor} group-hover:gap-2 transition-all`}>
                        Commencer
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-md p-8 border border-slate-200"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Fonctionnalités Pédagogiques
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Feedback Instantané</h4>
              <p className="text-sm text-slate-600">Corrections détaillées et explications complètes pour chaque question</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Suivi de Progression</h4>
              <p className="text-sm text-slate-600">Score en temps réel et statistiques de performance détaillées</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Cas Pratiques</h4>
              <p className="text-sm text-slate-600">Situations réelles de l'officine et mise en contexte professionnelle</p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-slate-600 text-sm">Formation Pharmacie - Bloc 2</p>
              <p className="text-slate-400 text-xs mt-1">Entretiens Pharmaceutiques & Accompagnement Patient</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-400 text-xs">Version 1.0.0 • 2024</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
