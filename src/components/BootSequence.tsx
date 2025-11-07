import { useState, useEffect, useRef } from "react";

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [stage, setStage] = useState(0);
  const [cursor, setCursor] = useState(true);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");
  const [line4, setLine4] = useState("");
  const [line5, setLine5] = useState("");
  const [line6, setLine6] = useState("");
  const [line7, setLine7] = useState("");
  const [progress, setProgress] = useState(0);
  const [flashBreach, setFlashBreach] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [logoGlitch, setLogoGlitch] = useState(false);
  const [logoFragment, setLogoFragment] = useState(false);
  const [logoDissolve, setLogoDissolve] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [redFlash, setRedFlash] = useState(false);
  const [crtOff, setCrtOff] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Typewriter effect
  const typeWriter = (text: string, setter: (val: string) => void, startDelay: number, speed: number = 50) => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setter(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);
      timeoutRefs.current.push(interval as any);
    }, startDelay);
    timeoutRefs.current.push(timeout);
  };

  useEffect(() => {
    // Cursor blink
    const cursorInterval = setInterval(() => {
      setCursor(prev => !prev);
    }, 500);

    // Stage 1: Initializing Connection (0.0s - 2.0s)
    typeWriter("INITIALIZING CONNECTION...", setLine1, 500);
    
    const t1 = setTimeout(() => {
      setLine1("INITIALIZING CONNECTION... COMPLETE");
    }, 2000);
    timeoutRefs.current.push(t1);

    // Stage 2: Firewall Breach (2.0s - 5.0s)
    typeWriter("TARGET: 104.22.9.88 (ZETATECH-DYNAMICS-CORP-INTRA)", setLine2, 2100);
    typeWriter("ATTEMPTING FIREWALL BREACH... (v7.3.4-Z)", setLine3, 3000);
    
    // Progress bar animation
    const t2 = setTimeout(() => {
      setStage(1);
      let prog = 0;
      const progressInterval = setInterval(() => {
        prog += 5;
        setProgress(prog);
        if (prog >= 100) {
          clearInterval(progressInterval);
          // Flash breach successful
          let flashCount = 0;
          const flashInterval = setInterval(() => {
            setFlashBreach(prev => prev + 1);
            flashCount++;
            if (flashCount >= 6) {
              clearInterval(flashInterval);
              setLine4("...BREACH SUCCESSFUL.");
            }
          }, 150);
          timeoutRefs.current.push(flashInterval as any);
        }
      }, 20);
      timeoutRefs.current.push(progressInterval as any);
    }, 3100);
    timeoutRefs.current.push(t2);

    // Stage 3: Corporate Logo Corruption (5.0s - 8.0s)
    const tLogo1 = setTimeout(() => {
      setStage(2);
      setShowLogo(true);
    }, 5000);
    timeoutRefs.current.push(tLogo1);

    const tLogo2 = setTimeout(() => {
      setLogoGlitch(true);
      setTimeout(() => setLogoGlitch(false), 100);
    }, 5500);
    timeoutRefs.current.push(tLogo2);

    const tLogo3 = setTimeout(() => {
      setLogoFragment(true);
    }, 6000);
    timeoutRefs.current.push(tLogo3);

    const tLogo4 = setTimeout(() => {
      setLogoDissolve(true);
    }, 7000);
    timeoutRefs.current.push(tLogo4);

    const tLogo5 = setTimeout(() => {
      setShowLogo(false);
      setStage(3);
    }, 7900);
    timeoutRefs.current.push(tLogo5);

    // Stage 4: Bypassing ICE & Warning (8.0s - 11.0s)
    typeWriter("BYPASSING COUNTER-INTRUSION (ICE)...", setLine5, 8100);
    typeWriter("...ICE BYPASSED.", setLine6, 9000);
    
    // Glitch effect
    const t3 = setTimeout(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 9500);
    timeoutRefs.current.push(t3);

    // Warning message
    const t4 = setTimeout(() => {
      setStage(4);
    }, 9600);
    timeoutRefs.current.push(t4);

    // Stage 5: The Final Countdown (11.0s - 15.0s)
    typeWriter("ACCESSING ROOT DIRECTORY: /ASSET_CATALOG_7.3.4/", setLine7, 11000);
    
    const t5 = setTimeout(() => {
      setStage(5);
    }, 12000);
    timeoutRefs.current.push(t5);

    // Countdown
    const t6 = setTimeout(() => { setStage(6); setCountdown(5); }, 13000);
    const t7 = setTimeout(() => setCountdown(4), 14000);
    const t8 = setTimeout(() => setCountdown(3), 14500);
    timeoutRefs.current.push(t6, t7, t8);

    // Stage 5 Transition: The Transition (15.0s onwards)
    const t9 = setTimeout(() => {
      setRedFlash(true);
      setTimeout(() => {
        setCrtOff(true);
        setTimeout(() => {
          setFadeIn(true);
          setTimeout(() => {
            onComplete();
          }, 1500);
        }, 500);
      }, 100);
    }, 15000);
    timeoutRefs.current.push(t9);

    return () => {
      clearInterval(cursorInterval);
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    };
  }, [onComplete]);

  const renderProgressBar = () => {
    const total = 20;
    const filled = Math.floor((progress / 100) * total);
    const bar = "■".repeat(filled) + ".".repeat(total - filled);
    return `[ ${bar} ] ${progress}%`;
  };

  if (fadeIn) {
    return (
      <div className="fixed inset-0 z-50 bg-black animate-fade-out" />
    );
  }

  return (
    <>
      {/* Scan line overlay */}
      <div className="boot-scanlines" />
      
      {/* Flicker overlay */}
      <div className="boot-flicker" />
      
      <div 
        className={`fixed inset-0 z-50 bg-background flex items-center justify-center ${
          crtOff ? 'boot-crt-off' : ''
        }`}
      >
        {/* Logo Stage */}
        {showLogo && (
          <div className="flex items-center justify-center">
            <svg 
              width="200" 
              height="200" 
              viewBox="0 0 200 200"
              className={`${logoGlitch ? 'boot-logo-glitch' : ''} ${logoFragment ? 'boot-logo-fragment' : ''} ${logoDissolve ? 'boot-logo-dissolve' : ''}`}
            >
              {/* Zetatech Z Logo */}
              <path
                d="M 40 40 L 160 40 L 40 160 L 160 160 M 100 100 L 140 60"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                fill="none"
                strokeLinecap="square"
              />
              <circle
                cx="100"
                cy="100"
                r="70"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </div>
        )}

        {/* Text Stages */}
        {!showLogo && (
          <div 
            className={`font-terminal text-primary text-sm md:text-base space-y-1 px-4 max-w-3xl ${
              glitch ? 'boot-glitch' : ''
            } ${redFlash ? 'text-destructive' : ''}`}
          >
            {/* Stage 1 */}
            <div>{line1}{line1 && !line1.includes("COMPLETE") && cursor && "_"}</div>
          
          {/* Stage 2 */}
          {line2 && <div>{line2}</div>}
          {line3 && <div>{line3}</div>}
          {stage >= 1 && progress < 100 && <div>{renderProgressBar()}</div>}
          {line4 && (
            <div className={flashBreach % 2 === 0 ? 'text-foreground' : 'text-primary'}>
              {line4}
            </div>
          )}
          
          {/* Stage 4 */}
          {line5 && <div>{line5}</div>}
          {line6 && <div>{line6}</div>}
          {stage >= 4 && (
            <div className="text-accent boot-shake">
              !! WARNING: UNAUTHORIZED ACCESS DETECTED. TRACE INITIATED. !!
            </div>
          )}
          
          {/* Stage 5 */}
          {line7 && <div>{line7}</div>}
          {stage >= 5 && <div>LOADING CATALOG...</div>}
          {stage >= 6 && (
            <div className="text-[#FF0000]">
              PURGE IN T-MINUS: {countdown}
            </div>
          )}
          </div>
        )}
      </div>

      <style>{`
        .boot-scanlines {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
          z-index: 51;
        }

        .boot-flicker {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.05);
          pointer-events: none;
          z-index: 51;
          animation: boot-flicker-anim 3s infinite;
        }

        @keyframes boot-flicker-anim {
          0%, 90%, 100% { opacity: 0; }
          91%, 94%, 97% { opacity: 1; }
          92%, 95%, 98% { opacity: 0; }
        }

        .boot-glitch {
          animation: boot-glitch-shift 0.1s;
        }

        @keyframes boot-glitch-shift {
          0% { transform: translateX(0); }
          25% { transform: translateX(5px); }
          50% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }

        .boot-shake {
          animation: boot-shake-anim 0.3s infinite;
        }

        @keyframes boot-shake-anim {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-1px, 1px); }
          50% { transform: translate(1px, -1px); }
          75% { transform: translate(-1px, -1px); }
        }

        .boot-crt-off {
          animation: boot-crt-shutdown 0.5s forwards;
        }

        @keyframes boot-crt-shutdown {
          0% {
            transform: scaleY(1) scaleX(1);
            opacity: 1;
          }
          50% {
            transform: scaleY(0.01) scaleX(1);
            opacity: 0.5;
          }
          100% {
            transform: scaleY(0) scaleX(1.5);
            opacity: 0;
          }
        }

        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        .animate-fade-out {
          animation: fade-out 1.5s forwards;
        }

        .boot-logo-glitch {
          animation: logo-glitch 0.1s;
          filter: brightness(3);
        }

        @keyframes logo-glitch {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }

        .boot-logo-fragment {
          animation: logo-fragment 1s forwards;
        }

        @keyframes logo-fragment {
          0% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
          20% { clip-path: polygon(0 0, 100% 0, 100% 30%, 0 30%); }
          40% { clip-path: polygon(0 40%, 100% 40%, 100% 70%, 0 70%); }
          60% { clip-path: polygon(30% 0, 70% 0, 70% 100%, 30% 100%); }
          80% { clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%); }
          100% { clip-path: polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%); }
        }

        .boot-logo-dissolve {
          animation: logo-dissolve 0.9s infinite;
        }

        @keyframes logo-dissolve {
          0%, 100% { 
            stroke: hsl(var(--terminal-green));
            opacity: 1;
          }
          33% { 
            stroke: hsl(var(--glitch-magenta));
            opacity: 0.7;
          }
          66% { 
            stroke: hsl(var(--warning-red));
            opacity: 0.3;
          }
        }
      `}</style>
    </>
  );
};

export default BootSequence;
