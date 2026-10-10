import { motion } from 'framer-motion';
import DailyHeading from '@/components/DailyHeading';
import Countdown from '@/components/Countdown';
import MusicPlayer from '@/components/MusicPlayer';
import NearestPandal from '@/components/NearestPandal';
import PandalGuide from '@/components/PandalGuide';
import DeveloperFooter from '@/components/DeveloperFooter';
import LiveUserCount from '@/components/LiveUserCount';

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <LiveUserCount />

      <DailyHeading />

      {/* Countdown — directly below the main heading */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        className="px-6 pb-10 sm:px-10 lg:px-16"
      >
        <div className="border-b border-white/[0.06] pb-10">
          <Countdown />
        </div>
      </motion.section>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
        className="px-6 pb-8 sm:px-10 lg:px-16"
      >
        <div className="grid grid-cols-1 gap-px lg:grid-cols-2 lg:gap-16">
          {/* Left — music & nearest pandal */}
          <section className="flex flex-col gap-12 lg:pr-12 lg:border-r lg:border-white/[0.06]">
            <div>
              <div className="mb-5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
                Pujo Radio
              </div>
              <MusicPlayer />
            </div>
            <div className="pb-4">
              <NearestPandal />
            </div>
          </section>

          {/* Right — zoned pandal guide */}
          <section className="lg:pl-4">
            <PandalGuide />
          </section>
        </div>
      </motion.main>

      <DeveloperFooter />
    </div>
  );
}