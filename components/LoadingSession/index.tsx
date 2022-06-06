import LogoType from '../LogoType';
import styles from './index.module.scss';
import { motion } from 'framer-motion';

const loadingContainerVariants = {
  start: { transition: { staggerChildren: 0.2 } },
  end: { transition: { staggerChildren: 0.2 } },
};

const loadingCircleVariants = {
  start: { y: '0%' },
  end: { y: '100%' },
};

const loadingCircleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: 'easeInOut',
};

export default function LoadingSession() {
  return (
    <div className={styles.container}>
      <LogoType fill="currentColor" />

      <motion.div
        role="progressbar"
        className={styles.loadingContainer}
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.div
          className={styles.loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.div
          className={styles.loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.div
          className={styles.loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
      </motion.div>
    </div>
  );
}
