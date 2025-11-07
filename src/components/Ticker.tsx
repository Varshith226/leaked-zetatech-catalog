const tickerText = "[LIVE FEED: // ZETATECH STOCK -11.4% (ARASAKA AGGRESSION) // NIGHT CITY SECTOR 4 QUARANTINE // NEW IMPLANT BATCH 404-D RECALLED: RISK OF 'COGNITIVE DISSOLUTION' // WARNING: IP TRACE IN PROGRESS... // SECURITY ALERT: DO NOT TRUST ZETATECH //] ";

const Ticker = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-primary overflow-hidden">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          <span className="ticker-text font-terminal text-xs md:text-sm text-accent">
            {tickerText.repeat(3)}
          </span>
        </div>
      </div>
      <style>{`
        .ticker-wrapper {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
        }
        
        .ticker-content {
          display: inline-block;
          animation: scroll-left 30s linear infinite;
        }
        
        .ticker-text {
          display: inline-block;
        }
        
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
};

export default Ticker;
