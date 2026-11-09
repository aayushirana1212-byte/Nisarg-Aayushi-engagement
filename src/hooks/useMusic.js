import { useCallback, useEffect, useRef, useState } from 'react';
import { MUSIC_SRC } from '../config.js';
import { startPad } from '../ambience.js';

const MISSING_MESSAGE = 'Background music is unavailable right now.';

/**
 * Background music controller.
 * - Audio only starts from a user interaction, because browsers block autoplay.
 * - It loops, and a missing or unplayable file falls back to a gentle
 *   generated instrumental instead of failing silently.
 */
export default function useMusic() {
  const audioRef = useRef(null);
  const padRef = useRef(null);
  const loadedRef = useRef(false);
  const noticeTimer = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [notice, setNotice] = useState('');

  const showNotice = useCallback((text) => {
    setNotice(text);
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(''), 4200);
  }, []);

  useEffect(() => {
    let audio = null;
    if (MUSIC_SRC) {
      audio = new Audio();
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0.6;
      audioRef.current = audio;
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.removeAttribute('src');
      }
      audioRef.current = null;
      if (padRef.current) padRef.current.stop();
      padRef.current = null;
      clearTimeout(noticeTimer.current);
    };
  }, []);

  const stopPad = useCallback(() => {
    if (padRef.current) {
      padRef.current.stop();
      padRef.current = null;
    }
  }, []);

  const play = useCallback(
    async (silent = false) => {
      const audio = audioRef.current;
      if (audio) {
        try {
          if (!loadedRef.current) {
            audio.src = MUSIC_SRC;
            loadedRef.current = true;
          }
          await audio.play();
          stopPad();
          setPlaying(true);
          return true;
        } catch (err) {
          loadedRef.current = false;
          audio.removeAttribute('src');
        }
      }

      // Fallback: gentle instrumental generated in the browser.
      try {
        if (!padRef.current) padRef.current = startPad();
        if (padRef.current) {
          setPlaying(true);
          return true;
        }
      } catch (err) {
        padRef.current = null;
      }

      setPlaying(false);
      if (!silent) showNotice(MISSING_MESSAGE);
      return false;
    },
    [showNotice, stopPad]
  );

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) audio.pause();
    stopPad();
    setPlaying(false);
  }, [stopPad]);

  const toggle = useCallback(() => {
    if (playing) pause();
    else play(false);
  }, [playing, play, pause]);

  // Called from the first user interaction (opening the envelope).
  const startFromInteraction = useCallback(() => play(false), [play]);

  return { playing, notice, toggle, startFromInteraction };
}
