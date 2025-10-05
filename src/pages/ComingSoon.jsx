import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ComingSoon({ title }) {
  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-8xl mb-6"
          >
            🚧
          </motion.div>

          <h1 className="text-5xl font-bold text-white mb-4">
            {title}
          </h1>

          <p className="text-2xl text-white/80 mb-8">
            Bientôt disponible
          </p>

          <p className="text-white/60 mb-12 text-lg">
            Ce module QCM est en cours de développement. Il sera disponible très prochainement avec :
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 rounded-2xl p-6">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="text-white font-semibold mb-2">Questions interactives</h3>
              <p className="text-white/60 text-sm">QCM, QCU, Vrai/Faux</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-white font-semibold mb-2">Suivi détaillé</h3>
              <p className="text-white/60 text-sm">Score et progression</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="text-white font-semibold mb-2">Feedback immédiat</h3>
              <p className="text-white/60 text-sm">Corrections détaillées</p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à l'accueil
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
