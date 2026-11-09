/*
  Gentle instrumental fallback used when the music file is missing or cannot be
  played. It is generated with the Web Audio API, so it never needs a file.
  A slow eight-bar chord progression in D major (D - A - Bm - F#m - G - D - G - A).
*/

const PROGRESSION = [
  [293.66, 369.99, 440.0],   // D
  [277.18, 329.63, 440.0],   // A
  [246.94, 293.66, 369.99],  // Bm
  [185.0, 220.0, 277.18],    // F#m
  [246.94, 293.66, 392.0],   // G
  [293.66, 369.99, 440.0],   // D
  [246.94, 293.66, 392.0],   // G
  [277.18, 329.63, 440.0],   // A
];

const BAR_SECONDS = 3.2;

export function startPad() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;

  let ctx;
  try {
    ctx = new AudioCtx();
  } catch (err) {
    return null;
  }

  const master = ctx.createGain();
  master.gain.value = 0.0001;
  master.connect(ctx.destination);
  master.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 3);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1800;
  filter.connect(master);

  let bar = 0;
  let stopped = false;

  const playBar = () => {
    if (stopped) return;
    const start = ctx.currentTime + 0.12;
    const chord = PROGRESSION[bar % PROGRESSION.length];
    bar += 1;

    chord.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      osc.type = index === 0 ? 'sine' : 'triangle';
      osc.frequency.value = freq;
      osc.detune.value = (index - 1) * 4;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(0.16 / (index + 1.4), start + BAR_SECONDS * 0.35);
      gain.gain.linearRampToValueAtTime(0.0001, start + BAR_SECONDS * 1.02);

      osc.connect(gain);
      gain.connect(filter);
      osc.start(start);
      osc.stop(start + BAR_SECONDS * 1.1);
    });

    // Soft bass note underneath the chord.
    const bass = ctx.createOscillator();
    bass.type = 'sine';
    bass.frequency.value = chord[0] / 2;
    const bassGain = ctx.createGain();
    bassGain.gain.setValueAtTime(0.0001, start);
    bassGain.gain.linearRampToValueAtTime(0.18, start + 0.7);
    bassGain.gain.linearRampToValueAtTime(0.0001, start + BAR_SECONDS * 1.05);
    bass.connect(bassGain);
    bassGain.connect(filter);
    bass.start(start);
    bass.stop(start + BAR_SECONDS * 1.1);
  };

  playBar();
  const timer = setInterval(playBar, BAR_SECONDS * 1000);

  return {
    stop() {
      stopped = true;
      clearInterval(timer);
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value || 0.0001, now);
      master.gain.linearRampToValueAtTime(0.0001, now + 0.6);
      setTimeout(() => {
        if (ctx.state !== 'closed') ctx.close();
      }, 900);
    },
  };
}
