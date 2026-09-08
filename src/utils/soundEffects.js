/**
 * Persona 5 UI Procedural Web Audio API Synthesizer
 * Zero external audio assets required. Runs with 0ms latency in any browser.
 */

let audioCtx = null;
let isSoundEnabled = true;

const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const toggleSound = () => {
  isSoundEnabled = !isSoundEnabled;
  if (isSoundEnabled) {
    playP5Select();
  }
  return isSoundEnabled;
};

export const getSoundStatus = () => isSoundEnabled;

/**
 * Snappy P5 Menu Hover Chirp
 */
export const playP5Hover = () => {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.04);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch {
    // Ignore audio errors if browser blocks autoplay before user gesture
  }
};

/**
 * P5 Snappy Menu Button Click
 */
export const playP5Click = () => {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // First sharp click burst
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);

    // Accent high frequency transient
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(1200, now);
    osc2.frequency.setValueAtTime(1600, now + 0.02);

    gain2.gain.setValueAtTime(0.06, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(now);
    osc2.stop(now + 0.06);
  } catch {
    // Graceful fallback
  }
};

/**
 * Persona 5 Sharp "Slash" Transition Sound
 */
export const playP5Slash = () => {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.15);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.15);
    filter.Q.setValueAtTime(3, now);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  } catch {
    // Graceful fallback
  }
};

/**
 * P5 Success / Calling Card Dramatic Sound
 */
export const playP5CallingCard = () => {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    [440, 554.37, 659.25, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.05);

      gain.gain.setValueAtTime(0.08, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.05);
      osc.stop(now + 0.6);
    });
  } catch {
    // Graceful fallback
  }
};

export const playP5Select = () => {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(784, now);
    osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.06);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  } catch {
    // Graceful fallback
  }
};

/**
 * Persona 5 Paper Tear / Screen Slash Sound Effect
 */
export const playP5PaperTear = () => {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Noise Burst (Paper Rip Friction)
    const bufferSize = ctx.sampleRate * 0.25;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(3200, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(400, now + 0.22);
    noiseFilter.Q.setValueAtTime(4, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);

    // 2. High Resonant Slash
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1100, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);

    oscGain.gain.setValueAtTime(0.12, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  } catch {
    // Graceful fallback
  }
};

/**
 * Persona 5 Paper Crumple Sound Effect
 */
export const playP5PaperCrumple = () => {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 0.45;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Multi-crunch envelope
    for (let i = 0; i < bufferSize; i++) {
      const t = i / ctx.sampleRate;
      const crunch = Math.sin(t * 80) * Math.sin(t * 220);
      data[i] = (Math.random() * 2 - 1) * Math.abs(crunch) * Math.exp(-t * 3.5);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2800, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
  } catch {
    // Graceful fallback
  }
};
