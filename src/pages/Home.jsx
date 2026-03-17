import { motion } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import Shop from './Shop'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      <HeroSection />
      {/* Shop section embedded below hero */}
      <section id="shop-section" className="scroll-mt-20">
        <Shop embedded />
      </section>
    </motion.div>
  )
}
