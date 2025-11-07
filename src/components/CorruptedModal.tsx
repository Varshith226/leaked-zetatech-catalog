import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface CorruptedModalProps {
  open: boolean;
  onClose: () => void;
}

const skullAscii = `
    ⠀⠀⠀⠀⠀⣀⣤⣴⣶⣾⣿⣿⣿⣿⣷⣶⣦⣤⣀⠀⠀⠀⠀⠀
    ⠀⠀⢀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀
    ⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀
    ⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆
    ⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠛⠛⠛⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⡿⠁⠀⣀⣀⣀⣀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⠃⠀⠾⠿⠿⠿⠿⠷⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣷⣤⣤⣤⣤⣤⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀
    ⠀⠀⠙⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠋⠀⠀⠀
    ⠀⠀⠀⠀⠀⠉⠛⠻⠿⢿⣿⣿⣿⣿⡿⠿⠟⠛⠉⠀⠀⠀⠀⠀
`;

const CorruptedModal = ({ open, onClose }: CorruptedModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-black border-2 border-destructive p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glitching Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-glitch"
          style={{
            animation: 'glitchColor 0.5s infinite'
          }}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex flex-col items-center justify-center p-8 md:p-12 min-h-[600px]">
          {/* ASCII Skull */}
          <pre className="text-destructive text-xs md:text-sm mb-8 glitch-hover" style={{ lineHeight: '1' }}>
            {skullAscii}
          </pre>

          {/* Error Header */}
          <h1 className="text-destructive font-terminal text-2xl md:text-4xl mb-6 text-center text-glitch">
            !! CRITICAL SYSTEM FAILURE !!
          </h1>

          {/* Error Message */}
          <div className="text-foreground font-terminal text-sm md:text-base text-center space-y-4 max-w-2xl flicker">
            <p>
              DATA PACKET 0x8A4F... CORRUPTED.
            </p>
            <p>
              ASSET INFORMATION HAS BEEN PURGED BY ZETATECH INTERNAL SECURITY.
            </p>
            <p className="mt-6">
              WARNING: THIS IMPLANT IS ASSOCIATED WITH [ 1,488 ] CASES OF CATASTROPHIC{" "}
              <span className="inline-block bg-black border border-foreground px-8 py-1">
                [REDACTED]
              </span>
            </p>
          </div>
        </div>

        <style>{`
          @keyframes glitchColor {
            0%, 49%, 51%, 100% {
              color: hsl(var(--glitch-magenta));
            }
            50% {
              color: hsl(var(--terminal-green));
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

export default CorruptedModal;
