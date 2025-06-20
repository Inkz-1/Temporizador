import { useEffect, useState } from 'react';

export default function GiornoStopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const playAudio = (src) => {
    const audio = new Audio(src);
    audio.loop = false;
    audio.currentTime = 0;
    audio.volume = 1;
    audio.play().catch(err => {
      console.warn("Falha ao reproduzir o áudio:", err);
    });
  };

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = () => {
    let h = String(Math.floor(time / 3600)).padStart(2, '0');
    let m = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    let s = String(time % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleStart = () => {
    setRunning(true);
    document.body.className = 'giorno-started';
    playAudio('/sounds/start-cd.mp3');
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
    document.body.className = 'giorno-reset';
    playAudio('/sounds/reset.mp3');
  };

  return (
    <div className="giorno-container">
      <h2 className="giorno-title">Temporizador JOJO </h2>
      <div className="giorno-time">{formatTime()}</div>
      <div className="giorno-controls">
        <button className="giorno-btn start" onClick={handleStart}>
          Iniciar
        </button>
              <hr/>
        <button className="giorno-btn reset" onClick={handleReset}>
          Resetar
        </button>
        
      </div>
    </div>
  );
}
