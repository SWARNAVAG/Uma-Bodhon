import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { TRACKS, PLAYLIST_URL, PLAYLIST_TITLE, PLAYLIST_OWNER, PLAYLIST_TOTAL } from '@/lib/playlist';

const BARS = Array.from({ length: 14 });

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const playerRef = useRef(null);
  const holderRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const create = () => {
      if (cancelled || playerRef.current || !holderRef.current || !window.YT || !window.YT.Player) return;
      playerRef.current = new window.YT.Player(holderRef.current, {
        width: '200',
        height: '113',
        videoId: TRACKS[0].videoId,
        playerVars: { autoplay: 0, controls: 0, disablekb: 1, modestbranding: 1, playsinline: 1 },
        events: {
          onStateChange: (e) => {
            setPlaying(e.data === 1);
            if (e.data === 0) {
              const next = (currentRef.current + 1) % TRACKS.length;
              setCurrent(next);
              playerRef.current?.loadVideoById?.(TRACKS[next].videoId);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      create();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prev === 'function') prev();
        create();
      };
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy?.();
      } catch (e) {
        /* player already gone */
      }
      playerRef.current = null;
    };
  }, []);

  const currentRef = useRef(0);
  currentRef.current = current;

  const playTrack = (i) => {
    setCurrent(i);
    setStarted(true);
    const p = playerRef.current;
    if (p && p.loadVideoById) p.loadVideoById(TRACKS[i].videoId);
  };

  const toggle = () => {
    const p = playerRef.current;
    if (!p || !p.playVideo) return;
    if (!started) {
      setStarted(true);
      p.loadVideoById(TRACKS[current].videoId);
      return;
    }
    if (p.getPlayerState && p.getPlayerState() === 1) {
      p.pauseVideo();
    } else {
      p.playVideo();
    }
  };

  const track = TRACKS[current];

  return (
    <div>
      {/* hidden YouTube iframe drives the audio */}
      <div className="pointer-events-none absolute h-px w-px overflow-hidden opacity-[0.01]">
        <div ref={holderRef} />
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'}
          className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 text-terracotta transition-colors hover:border-terracotta/40 hover:bg-terracotta/5"
        >
          {playing ? (
            <Pause className="h-4 w-4" strokeWidth={1.25} />
          ) : (
            <Play className="h-4 w-4 translate-x-[1px]" strokeWidth={1.25} />
          )}
          {playing && (
            <motion.span
              className="absolute inset-0 rounded-full border border-terracotta/30"
              animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </button>

        <div className="flex items-end gap-[2px] h-8 flex-1 overflow-hidden">
          {BARS.map((_, i) => (
            <motion.span
              key={i}
              className="w-[2px] flex-1 max-w-[3px] bg-terracotta/55 origin-bottom"
              style={{ height: '100%' }}
              animate={playing ? { scaleY: [0.12, 0.95, 0.3, 0.7, 0.18] } : { scaleY: 0.1 }}
              transition={
                playing
                  ? { duration: 1.1 + (i % 7) * 0.12, repeat: Infinity, ease: 'easeInOut', delay: (i % 9) * 0.04 }
                  : { duration: 0.5, ease: 'easeOut' }
              }
            />
          ))}
        </div>

        <button
          onClick={() => playTrack((current - 1 + TRACKS.length) % TRACKS.length)}
          aria-label="Previous track"
          className="shrink-0 text-muted-foreground/50 transition-colors hover:text-terracotta"
        >
          <SkipBack className="h-3.5 w-3.5" strokeWidth={1.25} />
        </button>
        <button
          onClick={() => playTrack((current + 1) % TRACKS.length)}
          aria-label="Next track"
          className="shrink-0 text-muted-foreground/50 transition-colors hover:text-terracotta"
        >
          <SkipForward className="h-3.5 w-3.5" strokeWidth={1.25} />
        </button>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <p className="min-w-0 truncate text-[13px] text-foreground/90">{track.title}</p>
        <p className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
          {track.duration}
        </p>
      </div>
      <p className="mt-0.5 text-[11px] text-muted-foreground italic truncate">{track.artist}</p>

      <div className="mt-5 border-t border-white/[0.06] pt-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60">
            {PLAYLIST_TITLE} · {PLAYLIST_OWNER}
          </span>
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[9px] uppercase tracking-[0.25em] text-terracotta/60 transition-colors hover:text-terracotta"
          >
            {PLAYLIST_TOTAL} tracks ↗
          </a>
        </div>

        <ul className="mt-3 max-h-56 overflow-y-auto pr-1">
          {TRACKS.map((t, i) => {
            const active = i === current;
            return (
              <li key={`${t.videoId}-${i}`}>
                <button
                  onClick={() => playTrack(i)}
                  className={`flex w-full items-center gap-3 rounded-sm px-2 py-2 text-left transition-colors ${
                    active ? 'bg-terracotta/10' : 'hover:bg-white/[0.04]'
                  }`}
                >
                  <span
                    className={`w-5 shrink-0 text-right text-[10px] tabular-nums ${
                      active ? 'text-terracotta' : 'text-muted-foreground/40'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className={`min-w-0 flex-1 truncate text-xs ${active ? 'text-terracotta' : 'text-foreground/80'}`}>
                    {t.title}
                  </span>
                  <span className="hidden sm:block shrink-0 max-w-[110px] truncate text-[10px] text-muted-foreground/50 italic">
                    {t.artist}
                  </span>
                  <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground/40">{t.duration}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}