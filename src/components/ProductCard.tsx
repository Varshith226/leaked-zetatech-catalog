import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div className="bg-card border border-primary/30 overflow-hidden hover:border-primary transition-all glitch-hover">
      {/* Product Image */}
      <div className="aspect-video w-full overflow-hidden bg-background">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
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
          onClick={onClick}
          variant="cyber"
          className="w-full"
        >
          VIEW SPEC
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
