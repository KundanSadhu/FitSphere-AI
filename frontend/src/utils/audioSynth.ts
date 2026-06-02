// Web Audio API Procedural Synthesizer for Meditation Soundscapes
// No dependencies, commercial-free, offline-safe, with beautiful harmonics

class MeditationAudioSynth {
  private ctx: AudioContext | null = null;
  private droneGain: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private droneOscs: OscillatorNode[] = [];
  private rainNode: AudioWorkletNode | ScriptProcessorNode | null = null;
  private isRainActive: boolean = false;

  private initContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Plays a beautiful, warm metallic Tibetan Singing Bowl gong strike
  public strikeSingingBowl(baseFreq: number = 144) {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Creating harmonics for the iconic singing bowl sound
    const partials = [1.0, 1.98, 2.94, 4.15, 5.08, 6.12];
    const amplitudes = [1.0, 0.45, 0.25, 0.12, 0.08, 0.04];
    const decays = [8.0, 5.5, 3.5, 2.5, 1.5, 1.0]; // higher partials decay faster

    const masterGainGroup = this.ctx.createGain();
    masterGainGroup.gain.setValueAtTime(0.0, now);
    masterGainGroup.gain.linearRampToValueAtTime(0.5, now + 0.04);
    masterGainGroup.gain.exponentialRampToValueAtTime(0.0001, now + 10.0);
    masterGainGroup.connect(this.ctx.destination);

    partials.forEach((ratio, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const pGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * ratio, now);
      // Slight pitch drift to simulate realistic organic movement
      osc.frequency.linearRampToValueAtTime(baseFreq * ratio * 0.997, now + decays[i]);

      pGain.gain.setValueAtTime(0, now);
      pGain.gain.linearRampToValueAtTime(amplitudes[i] * 0.4, now + 0.02);
      pGain.gain.exponentialRampToValueAtTime(0.0001, now + decays[i]);

      osc.connect(pGain);
      pGain.connect(masterGainGroup);

      osc.start(now);
      osc.stop(now + decays[i] + 0.5);
    });
  }

  // Starts an ambient drone tuned to 432Hz Solfeggio (Cosmic Om harmonizer)
  public startAmbientDrone(volume: number = 0.35) {
    try {
      this.initContext();
      if (!this.ctx) return;
      this.stopAmbientDrone();

      const now = this.ctx.currentTime;
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0, now);
      this.droneGain.gain.linearRampToValueAtTime(volume, now + 3.0); // smooth fade-in
      this.droneGain.connect(this.ctx.destination);

      // 432Hz Cosmic tuning ratios (C4 = 256, Om = 136.1Hz, Solfeggio A=432)
      // Root (108Hz), Fifth (162Hz), Octave (216Hz), Minor Third (129.6Hz) for warm emotional grounding
      const frequencies = [108.0, 162.0, 216.0, 129.6];
      this.droneOscs = [];

      frequencies.forEach((freq, idx) => {
        if (!this.ctx || !this.droneGain) return;
        const osc = this.ctx.createOscillator();
        const oGain = this.ctx.createGain();

        // Warm triangle waves filtered look incredibly natural
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Slow pitch drift to prevent phase cancellation and create organic movement
        osc.frequency.linearRampToValueAtTime(freq + (idx % 2 === 0 ? 0.3 : -0.3), now + 30);

        // Low pass filter to keep it extremely deep and eye-closed calming
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(idx === 2 ? 450 : 250, now);

        // Specific gain balance for each frequency note
        const subVolume = idx === 0 ? 0.4 : idx === 1 ? 0.35 : idx === 2 ? 0.15 : 0.25;
        oGain.gain.setValueAtTime(subVolume, now);

        osc.connect(filter);
        filter.connect(oGain);
        oGain.connect(this.droneGain);

        osc.start(now);
        this.droneOscs.push(osc);
      });

      // Add a Slow Breathing LFO to modulate filters/volume, helping sync respiratory cycles!
      this.lfo = this.ctx.createOscillator();
      this.lfo.type = 'sine';
      this.lfo.frequency.setValueAtTime(0.08, now); // 12-second cycle (0.08Hz is about 12.5s)
      
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(volume * 0.15, now);

      this.lfo.connect(lfoGain);
      if (this.droneGain) {
        lfoGain.connect(this.droneGain.gain); // Modulates master drone level gently with breathing rate
      }
      this.lfo.start(now);

    } catch (err) {
      console.error('Failed to play ambient drone synth', err);
    }
  }

  // Smoothly fades out and halts the background noise drone
  public stopAmbientDrone() {
    if (this.ctx && this.droneGain) {
      const now = this.ctx.currentTime;
      try {
        this.droneGain.gain.cancelScheduledValues(now);
        this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
        this.droneGain.gain.linearRampToValueAtTime(0.0, now + 1.5); // smooth fade-out

        setTimeout(() => {
          try {
            this.droneOscs.forEach(osc => osc.stop());
            this.droneOscs = [];
            if (this.lfo) {
              this.lfo.stop();
              this.lfo = null;
            }
          } catch (e) {
            // Osc was already stopped
          }
        }, 1600);
      } catch (e) {
        console.warn('Drone stop failed', e);
      }
    }
  }

  // Generates dynamic rain/white-noise sweeps
  public startZenRain(volume: number = 0.1) {
    this.initContext();
    if (!this.ctx) return;
    this.isRainActive = true;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Generate Pinkish white noise
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Basic pink filter
        output[i] = (lastOut * 0.95 + white * 0.05);
        lastOut = output[i];
      }

      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      noiseNode.loop = true;

      // Filter sweeps to resemble gentle forest rain/wind and rustling leaves
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(1.5, now);
      filter.frequency.setValueAtTime(500, now);

      const rainGain = this.ctx.createGain();
      rainGain.gain.setValueAtTime(0, now);
      rainGain.gain.linearRampToValueAtTime(volume, now + 2.0);

      noiseNode.connect(filter);
      filter.connect(rainGain);
      rainGain.connect(this.ctx.destination);

      noiseNode.start(now);

      // Ambient modulation of wind filters dynamically with random intervals
      const interval = setInterval(() => {
        if (!this.isRainActive || !this.ctx) {
          clearInterval(interval);
          return;
        }
        const timeNow = this.ctx.currentTime;
        // Shift center wind frequency gently
        const targetCutoff = 350 + Math.random() * 400;
        filter.frequency.linearRampToValueAtTime(targetCutoff, timeNow + 3.0);
      }, 4000);

      const stopRainFn = () => {
        this.isRainActive = false;
        clearInterval(interval);
        try {
          const fadeNow = this.ctx?.currentTime || 0;
          rainGain.gain.setValueAtTime(rainGain.gain.value, fadeNow);
          rainGain.gain.linearRampToValueAtTime(0.04, fadeNow + 1.2);
          setTimeout(() => {
            try {
              noiseNode.stop();
            } catch (e) {}
          }, 1500);
        } catch (e) {}
      };

      return stopRainFn;
    } catch (err) {
      console.error('Failed to instantiate procedural Rain', err);
      return () => {};
    }
  }
}

export const meditationAudio = new MeditationAudioSynth();
