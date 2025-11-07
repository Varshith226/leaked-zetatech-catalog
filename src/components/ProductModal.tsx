import { Product } from "@/types/product";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, open, onClose }: ProductModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-background border-2 border-primary/50 p-0 overflow-hidden max-h-[90vh] overflow-y-auto modal-scan-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-6 w-6 text-primary" />
          <span className="sr-only">Close</span>
        </button>

        {/* Product Image */}
        <div className="w-full aspect-video bg-background overflow-hidden border-b-2 border-primary/30">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="p-6 md:p-8">
          <DialogTitle className="sr-only">{product.title}</DialogTitle>
          
          <div className="text-accent text-sm font-terminal mb-2">
            {product.category}
          </div>
          
          <h2 className="text-primary text-2xl md:text-3xl font-terminal mb-4 text-glitch">
            {product.title}
          </h2>

          <div className="text-primary text-3xl font-terminal mb-6">
            Ç {product.price.toLocaleString()}
          </div>

          <p className="text-foreground text-base md:text-lg mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Side Effects */}
          <div className="bg-card border-2 border-accent/50 p-4 md:p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-accent h-5 w-5" />
              <h3 className="text-accent font-terminal text-base md:text-lg">
                // SYSTEM CONFLICTS & SIDE EFFECTS:
              </h3>
            </div>
            
            <ul className="space-y-3">
              {product.sideEffects.map((effect, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-accent font-terminal shrink-0 mt-1">!</span>
                  <span className="text-foreground text-sm md:text-base">{effect}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Acquire Button (Disabled) */}
          <Button
            disabled
            className="w-full bg-muted text-muted-foreground font-terminal text-base md:text-lg py-6 relative overflow-hidden border border-muted-foreground/30"
          >
            <span className="line-through">ACQUIRE</span>
            <span className="ml-2 text-destructive">(LINK DEAD)</span>
          </Button>
        </div>

        <style>{`
          .modal-scan-in {
            animation: modal-scan-in 0.3s ease-out;
          }

          @keyframes modal-scan-in {
            0% {
              transform: scaleY(0);
              transform-origin: top;
              opacity: 0;
            }
            100% {
              transform: scaleY(1);
              transform-origin: top;
              opacity: 1;
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
