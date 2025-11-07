import { useState, useEffect } from "react";

interface BootSequenceProps {
  onComplete: () => void;
}

const bootLines = [
  "INITIALIZING CONNECTION...",
  "TARGET: 104.22.9.88 (ZETATECH-DYNAMICS-CORP-INTRA)",
  "ATTEMPTING FIREWALL BREACH... (v7.3.4-Z)",
  "...BREACH SUCCESSFUL.",
  "BYPASSING ICE...",
  "...ICE BYPASSED.",
  "ACCESSING ROOT DIRECTORY: /ASSET_CATALOG_7.3.4/",
  "WARNING: UNAUTHORIZED ACCESS DETECTED. TRACE INITIATED.",
  "LOADING CATALOG... (PURGE IN T-MINUS 5...4...3...)"
];

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [flash, setFlash] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    
    const showNextLine = () => {
      if (currentIndex < bootLines.length) {
        setDisplayedLines(prev => [...prev, bootLines[currentIndex]]);
        currentIndex++;
        setTimeout(showNextLine, 500);
      } else {
        // All lines shown, pause then flash
        setTimeout(() => {
          setFlash(true);
          // Flash twice (on-off-on-off)
          setTimeout(() => {
            setFlash(false);
            setTimeout(() => {
              setFlash(true);
              setTimeout(() => {
                setFlash(false);
                // Fade out and complete
                setTimeout(() => {
                  setFadeOut(true);
                  setTimeout(() => {
                    onComplete();
                  }, 500);
                }, 100);
              }, 150);
            }, 150);
          }, 150);
        }, 1000);
      }
    };

    showNextLine();
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="font-terminal text-primary space-y-2 px-4 max-w-3xl">
        {displayedLines.map((line, index) => (
          <div 
            key={index} 
            className={`text-sm md:text-base ${flash ? 'text-destructive' : ''} transition-colors duration-100`}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BootSequence;
