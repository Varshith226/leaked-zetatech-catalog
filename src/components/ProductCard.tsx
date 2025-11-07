import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const handleClick = () => {
    // Flash effect on button
    const button = document.activeElement;
    if (button instanceof HTMLElement) {
      button.style.filter = 'brightness(3)';
      setTimeout(() => {
        button.style.filter = '';
      }, 100);
    }
    onClick();
  };

  return (
    <div className="bg-card border border-primary/30 overflow-hidden hover:border-primary transition-all glitch-hover product-card">
      {/* Product Image */}
      <div className="aspect-video w-full overflow-hidden bg-background">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-all duration-200 hover:brightness-125 hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="text-accent text-xs font-terminal mb-1">
          {product.category}
        </div>
        <h3 className="text-foreground font-terminal text-base md:text-lg mb-2 line-clamp-2">
          {product.title}
        </h3>
        <div className="text-primary text-xl font-terminal mb-4">
          PRICE: Ç {product.price.toLocaleString()}
        </div>
        <Button
          onClick={handleClick}
          variant="cyber"
          className="w-full transition-all hover:brightness-110"
        >
          VIEW SPEC
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
