import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const ROOM_ID = 'devi-paksha-live';

/**
 * @typedef {Object} PresenceMessage
 * @property {string} type
 * @property {number} count
 */

export default function LiveUserCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    // Persist the conn id per tab so a reload reclaims the same seat
    let connId = sessionStorage.getItem('presence-conn-id');
    if (!connId) {
      connId = crypto.randomUUID();
      sessionStorage.setItem('presence-conn-id', connId);
    }
    const room = base44.actors.PresenceRoom(ROOM_ID).connect({ id: connId });
    const sub = room.subscribe((/** @type {unknown} */ msg) => {
      const presenceMsg = /** @type {PresenceMessage} */ (msg);
      if (presenceMsg && presenceMsg.type === 'presence' && typeof presenceMsg.count === 'number') {
        setCount(presenceMsg.count);
      }
    });
    return () => {
      sub.unsubscribe();
      room.close();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className="fixed left-4 top-4 z-50 flex items-center gap-2.5 rounded-full border border-white/10 bg-background/80 px-3.5 py-2 backdrop-blur"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-terracotta" />
      </span>
      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground tabular-nums">
        {count} online
      </span>
    </motion.div>
  );
}