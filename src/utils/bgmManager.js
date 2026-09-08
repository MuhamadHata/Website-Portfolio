/**
 * Persona 5 Background Music (BGM) Manager
 * Handles playlist, autoplay restrictions, volume management, and smooth fade-in.
 */

export const P5_TRACKS = [
  {
    id: 'beneath-the-mask',
    title: 'Beneath the Mask',
    subtitle: 'Instrumental Version',
    src: '/music/Beneath the Mask -instrumental version-.mp3',
    tag: 'CHILL // METAVERSE'
  },
  {
    id: 'life-goes-on',
    title: 'Life Goes On',
    subtitle: 'School & Daily Theme',
    src: '/music/Life Goes On.mp3',
    tag: 'ACADEMIC // DAILY'
  },
  {
    id: 'phantom',
    title: 'Phantom',
    subtitle: 'Infiltration Theme',
    src: '/music/Phantom.mp3',
    tag: 'INFILTRATION // HEIST'
  }
];

// Initial default volume is set very low (15%) to avoid startling the user
const DEFAULT_VOLUME = 0.15;

class BgmManager {
  constructor() {
    this.audio = null;
    this.currentTrackIndex = 0;
    this.volume = DEFAULT_VOLUME;
    this.isMuted = false;
    this.isPlaying = false;
    this.hasUserInteracted = false;
    this.fadeInterval = null;
    this.listeners = new Set();
  }

  getAudio() {
    if (!this.audio && typeof window !== 'undefined') {
      this.audio = new Audio();
      this.audio.loop = true;
      this.audio.volume = 0; // Starts at 0 for smooth fade-in
      this.audio.src = P5_TRACKS[this.currentTrackIndex].src;

      // When track finishes, advance to next track
      this.audio.addEventListener('ended', () => {
        this.nextTrack();
      });

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notifyListeners();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notifyListeners();
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('BGM playback warning:', e);
      });
    }
    return this.audio;
  }

  // Smooth fade-in volume ramp
  fadeIn(targetVolume = this.volume, durationMs = 1500) {
    const audio = this.getAudio();
    if (!audio) return;

    if (this.fadeInterval) clearInterval(this.fadeInterval);

    audio.volume = 0;
    const steps = 30;
    const stepTime = durationMs / steps;
    const volumeStep = targetVolume / steps;

    this.fadeInterval = setInterval(() => {
      if (!audio || audio.paused) {
        clearInterval(this.fadeInterval);
        return;
      }
      if (audio.volume + volumeStep < targetVolume) {
        audio.volume = Math.min(targetVolume, audio.volume + volumeStep);
      } else {
        audio.volume = targetVolume;
        clearInterval(this.fadeInterval);
      }
    }, stepTime);
  }

  // Smooth fade-out volume ramp
  fadeOut(durationMs = 800) {
    return new Promise((resolve) => {
      const audio = this.getAudio();
      if (!audio || audio.paused) return resolve();

      if (this.fadeInterval) clearInterval(this.fadeInterval);

      const currentVol = audio.volume;
      const steps = 20;
      const stepTime = durationMs / steps;
      const volumeStep = currentVol / steps;

      this.fadeInterval = setInterval(() => {
        if (!audio) {
          clearInterval(this.fadeInterval);
          return resolve();
        }
        if (audio.volume - volumeStep > 0.01) {
          audio.volume = Math.max(0, audio.volume - volumeStep);
        } else {
          audio.volume = 0;
          audio.pause();
          clearInterval(this.fadeInterval);
          resolve();
        }
      }, stepTime);
    });
  }

  // Start BGM on user interaction with smooth fade-in
  async startOnUserGesture() {
    if (this.hasUserInteracted) return;
    this.hasUserInteracted = true;

    try {
      const audio = this.getAudio();
      if (!audio) return;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        this.isPlaying = true;
        this.fadeIn(this.isMuted ? 0 : this.volume);
        this.notifyListeners();
      }
    } catch (err) {
      // Browser autoplay policy might block unmuted audio initially
      this.isPlaying = false;
      this.notifyListeners();
    }
  }

  async play() {
    try {
      const audio = this.getAudio();
      if (!audio) return;
      await audio.play();
      this.isPlaying = true;
      this.fadeIn(this.isMuted ? 0 : this.volume);
      this.notifyListeners();
    } catch (err) {
      console.warn('Playback error:', err);
    }
  }

  async pause() {
    await this.fadeOut(500);
    this.isPlaying = false;
    this.notifyListeners();
  }

  async togglePlay() {
    if (this.isPlaying) {
      await this.pause();
    } else {
      await this.play();
    }
  }

  setTrack(index) {
    if (index < 0 || index >= P5_TRACKS.length) return;
    const wasPlaying = this.isPlaying;
    this.currentTrackIndex = index;
    
    const audio = this.getAudio();
    if (audio) {
      audio.src = P5_TRACKS[this.currentTrackIndex].src;
      if (wasPlaying) {
        audio.play().then(() => {
          this.fadeIn(this.isMuted ? 0 : this.volume);
        }).catch(() => {});
      }
    }
    this.notifyListeners();
  }

  nextTrack() {
    const nextIdx = (this.currentTrackIndex + 1) % P5_TRACKS.length;
    this.setTrack(nextIdx);
  }

  prevTrack() {
    const prevIdx = (this.currentTrackIndex - 1 + P5_TRACKS.length) % P5_TRACKS.length;
    this.setTrack(prevIdx);
  }

  setVolume(newVol) {
    this.volume = Math.max(0, Math.min(1, newVol));
    const audio = this.getAudio();
    if (audio && !this.isMuted) {
      audio.volume = this.volume;
    }
    this.notifyListeners();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    const audio = this.getAudio();
    if (audio) {
      if (this.isMuted) {
        audio.volume = 0;
      } else {
        this.fadeIn(this.volume, 600);
      }
    }
    this.notifyListeners();
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      currentTrack: P5_TRACKS[this.currentTrackIndex],
      currentTrackIndex: this.currentTrackIndex,
      volume: this.volume,
      isMuted: this.isMuted,
      tracks: P5_TRACKS
    };
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.getState());
    return () => {
      this.listeners.delete(callback);
    };
  }

  notifyListeners() {
    const state = this.getState();
    this.listeners.forEach((callback) => callback(state));
  }
}

export const bgmManager = new BgmManager();
