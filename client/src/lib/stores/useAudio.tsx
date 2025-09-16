import { create } from "zustand";

interface AudioState {
  backgroundMusic: HTMLAudioElement | null;
  hitSound: HTMLAudioElement | null;
  successSound: HTMLAudioElement | null;
  hoverSound: HTMLAudioElement | null;
  isMuted: boolean;
  isBackgroundPlaying: boolean;
  volume: number;
  
  // Initialization
  initializeAudio: () => void;
  
  // Control functions
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  startBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  
  // Sound effects
  playHit: () => void;
  playSuccess: () => void;
  playHover: () => void;
  playButtonClick: () => void;
}

export const useAudio = create<AudioState>((set, get) => ({
  backgroundMusic: null,
  hitSound: null,
  successSound: null,
  hoverSound: null,
  isMuted: true, // Start muted by default
  isBackgroundPlaying: false,
  volume: 0.3,
  
  initializeAudio: () => {
    try {
      // Initialize background music
      const bgMusic = new Audio('/sounds/background.mp3');
      bgMusic.loop = true;
      bgMusic.volume = 0.1; // Very low volume for ambient
      
      // Initialize sound effects
      const hit = new Audio('/sounds/hit.mp3');
      const success = new Audio('/sounds/success.mp3');
      
      // Create hover sound using hit sound at lower volume
      const hover = new Audio('/sounds/hit.mp3');
      
      set({
        backgroundMusic: bgMusic,
        hitSound: hit,
        successSound: success,
        hoverSound: hover
      });
      
      console.log("Audio initialized successfully");
    } catch (error) {
      console.log("Audio initialization failed:", error);
    }
  },
  
  toggleMute: () => {
    const { isMuted, backgroundMusic, isBackgroundPlaying } = get();
    const newMutedState = !isMuted;
    
    set({ isMuted: newMutedState });
    
    // Handle background music muting
    if (backgroundMusic && isBackgroundPlaying) {
      backgroundMusic.muted = newMutedState;
    }
    
    console.log(`Sound ${newMutedState ? 'muted' : 'unmuted'}`);
  },
  
  setVolume: (newVolume) => {
    const { backgroundMusic } = get();
    set({ volume: newVolume });
    
    if (backgroundMusic) {
      backgroundMusic.volume = newVolume * 0.3; // Scale down for background
    }
  },
  
  startBackgroundMusic: () => {
    const { backgroundMusic, isMuted, volume } = get();
    if (backgroundMusic && !isMuted) {
      backgroundMusic.volume = volume * 0.1; // Very quiet ambient music
      backgroundMusic.muted = false;
      backgroundMusic.play().catch(error => {
        console.log("Background music play prevented:", error);
      });
      set({ isBackgroundPlaying: true });
    }
  },
  
  stopBackgroundMusic: () => {
    const { backgroundMusic } = get();
    if (backgroundMusic) {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
      set({ isBackgroundPlaying: false });
    }
  },
  
  playHit: () => {
    const { hitSound, isMuted, volume } = get();
    if (hitSound && !isMuted) {
      const soundClone = hitSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = volume * 0.5;
      soundClone.play().catch(error => {
        console.log("Hit sound play prevented:", error);
      });
    }
  },
  
  playSuccess: () => {
    const { successSound, isMuted, volume } = get();
    if (successSound && !isMuted) {
      successSound.currentTime = 0;
      successSound.volume = volume * 0.7;
      successSound.play().catch(error => {
        console.log("Success sound play prevented:", error);
      });
    }
  },
  
  playHover: () => {
    const { hoverSound, isMuted, volume } = get();
    if (hoverSound && !isMuted) {
      const soundClone = hoverSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = volume * 0.2; // Very subtle hover sound
      soundClone.play().catch(error => {
        console.log("Hover sound play prevented:", error);
      });
    }
  },
  
  playButtonClick: () => {
    const { hitSound, isMuted, volume } = get();
    if (hitSound && !isMuted) {
      const soundClone = hitSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = volume * 0.4;
      soundClone.playbackRate = 1.2; // Slightly higher pitch for buttons
      soundClone.play().catch(error => {
        console.log("Button click sound play prevented:", error);
      });
    }
  }
}));
