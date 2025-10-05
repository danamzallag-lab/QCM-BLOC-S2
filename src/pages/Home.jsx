import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const modules = [
  {
    id: 'femme-enceinte',
    title: 'Femme Enceinte',
    icon: '👶',
    description: 'Entretien de prévention médicamenteuse pendant la grossesse',
    questions: 7,
    color: 'from-pink-500 to-rose-500',
    path: '/femme-enceinte'
  },
  {
    id: 'opioides',
    title: 'Opioïdes Palier II',
    icon: '💊',
    description: 'Accompagnement des patients sous antalgiques opioïdes',
    questions: 8,
    color: 'from-purple-500 to-indigo-500',
    path: '/opioides'
  },
  {
    id: 'asthme',
    title: 'Asthme',
    icon: '🫁',
    description: 'Prise en charge et suivi des patients asthmatiques',
    questions: 10,
    color: 'from-blue-500 to-cyan-500',
    path: '/asthme'
  },
  {
    id: 'avk',
    title: 'AVK',
    icon: '🩸',
    description: 'Anti-vitamine K : surveillance et interactions',
    questions: 12,
    color: 'from-red-500 to-orange-500',
    path: '/avk'
  },
  {
    id: 'aod',
    title: 'AOD',
    icon: '💉',
    description: 'Anticoagulants oraux directs : observance et risques',
    questions: 10,
    color: 'from-emerald-500 to-teal-500',
    path: '/aod'
  },
  {
    id: 'complet',
    title: 'QCM Complet',
    icon: '⭐',
    description: 'Évaluation complète de tous les modules du Bloc 2',
    questions: 47,
    color: 'from-yellow-500 to-amber-500',
    path: '/complet'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-extrabold text-white mb-4"
          >
            📚 QCM Formation Pharmacie
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-white/90 font-light"
          >
            Bloc 2 - Entretiens Pharmaceutiques & Accompagnement Patient
          </motion.p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={module.path}>
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 shadow-2xl hover:shadow-3xl group">
                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${module.color} rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                    {module.icon}
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 transition-all">
                    {module.title}
                  </h2>

                  {/* Description */}
                  <p className="text-white/80 mb-6 leading-relaxed">
                    {module.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${module.color} text-white`}>
                      {module.questions} questions
                    </span>
                    <svg className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">✨ Fonctionnalités</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-white/90">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold mb-2">Feedback Instantané</h4>
              <p className="text-sm text-white/70">Corrections détaillées pour chaque réponse</p>
            </div>
            <div className="text-white/90">
              <div className="text-2xl mb-2">📊</div>
              <h4 className="font-semibold mb-2">Suivi de Progression</h4>
              <p className="text-sm text-white/70">Score en temps réel et statistiques</p>
            </div>
            <div className="text-white/90">
              <div className="text-2xl mb-2">💡</div>
              <h4 className="font-semibold mb-2">Cas Pratiques</h4>
              <p className="text-sm text-white/70">Situations réelles de l'officine</p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center text-white/60"
        >
          <p>Formation Pharmacie - Bloc 2 • Version 1.0.0</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
