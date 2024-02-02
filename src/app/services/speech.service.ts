import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private speech!: SpeechSynthesisUtterance;

  constructor() { 
    this.speech = new SpeechSynthesisUtterance();

    this.initSpeech();
  }

  private initSpeech(): void {
    const checkVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        console.log(voices);
        
        this.speech.voice = voices[0];
        this.speech.lang = voices[0].lang; // Optionally, set the language
      } else {
        setTimeout(checkVoices, 50);
      }
    };

    checkVoices();
  }

  setSpeechContent(content: string): void{
    this.speech.text = content;
  }

  startSpeech(): void {
    console.log(this.speech);
    this.speech.onerror = (event: SpeechSynthesisErrorEvent) => {
      console.error('Speech Synthesis Error:', event.error);
    };

    speechSynthesis.speak(this.speech);
  }

  pauseSpeech(): void {
    speechSynthesis.pause();
  }

  resumeSpeech(): void{
    speechSynthesis.resume();
  }

  stopSpeech(): void {
    speechSynthesis.cancel();
  }
}
