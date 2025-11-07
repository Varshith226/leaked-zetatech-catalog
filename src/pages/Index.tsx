import { useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import BootSequence from "@/components/BootSequence";
import Ticker from "@/components/Ticker";
import CorruptedModal from "@/components/CorruptedModal";
import TraceWidget from "@/components/TraceWidget";
import { Product } from "@/types/product";

import nightOwlImg from "@/assets/night-owl.jpg";
import juggernautArmImg from "@/assets/juggernaut-arm.jpg";
import skillWeaverImg from "@/assets/skill-weaver.jpg";
import toxinLungsImg from "@/assets/toxin-lungs.jpg";

const products: Product[] = [
  {
    id: "1",
    title: 'K-Sec "Night-Owl" Mk. IV Optical Implant',
    category: "OPTICS (K-SEC)",
    price: 8500,
    image: nightOwlImg,
    description: "Replaces standard wetware with a military-grade optical sensor. Provides full-spectrum EM and thermal vision. See through walls, track heat signatures, and never miss a detail in the shadows.",
    sideEffects: [
      "Occasional retinal 'ghosting' of corporate advertisements.",
      "Involuntary data-feed to Zetatech security servers.",
      "Mild, persistent headache (described as 'like an ice-cream freeze, but forever').",
      "All food tastes faintly of static."
    ]
  },
  {
    id: "2",
    title: '"Juggernaut" Reinforced Arm Actuator',
    category: "CHASSIS (M-SPEC)",
    price: 22000,
    image: juggernautArmImg,
    description: "Swap that flimsy flesh for 800-lb-test strength. This full-arm replacement features reinforced myomer bundles and a hydraulic-grip hand. Perfect for 'manual' negotiations.",
    sideEffects: [
      "Requires 3x daily caloric intake or system shuts down.",
      "Prone to locking up in high-humidity environments.",
      "Randomly plays early 21st-century j-pop at 120 decibels.",
      "Warranty void if used for 'heavy lifting' (as defined by Zetatech legal)."
    ]
  },
  {
    id: "3",
    title: 'Neuro-Link "Skill-Weaver" (BANNED)',
    category: "NEURAL (BANNED)",
    price: 115000,
    image: skillWeaverImg,
    description: "Why learn when you can download? This banned neural-port allows for 'hot-swapping' skill-softs. Become a master pilot, concert violinist, or demolitions expert in 30 seconds. (Skill-softs sold separately).",
    sideEffects: [
      "High risk of data-corruption (e.g., you try to learn 'Karate' and get 'Advanced Origami').",
      "Permanent personality fragmentation.",
      "Susceptible to remote hijacking ('puppet-ware').",
      "You will forget your mother's name. We guarantee it."
    ]
  },
  {
    id: "4",
    title: '"Asbestos-Eater" Toxin Filter Lungs',
    category: "CHASSIS (M-SPEC)",
    price: 14200,
    image: toxinLungsImg,
    description: "The air in this city is poison. Breathe easy with the Asbestos-Eater. This dual-unit filtration system replaces your weak, organic lungs with a high-capacity air processor. 99.9% effective against all known atmospheric agents.",
    sideEffects: [
      "Must replace (expensive) filters every 72 hours.",
      "Emits a loud, mechanical 'hissing' sound when inhaling.",
      "Makes the user's voice sound like a 1950s radio announcer.",
      "Cannot process oxygen in 'clean' or 'natural' environments (e.g., a forest)."
    ]
  }
];

const Index = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCorrupted, setShowCorrupted] = useState(false);
  const [scrambling, setScrambling] = useState(false);

  const filteredProducts = products.filter((product) => {
    if (activeFilter === "ALL") return true;
    return product.category === activeFilter;
  });

  const handleFilterChange = (filter: string) => {
    if (filter === activeFilter) return;
    
    // Trigger scramble animation
    setScrambling(true);
    setTimeout(() => {
      setActiveFilter(filter);
      setScrambling(false);
    }, 300);
  };

  const handleProductClick = (product: Product) => {
    // Special case for Skill-Weaver - show corrupted modal
    if (product.id === "3") {
      setShowCorrupted(true);
    } else {
      setSelectedProduct(product);
    }
  };

  if (!bootComplete) {
    return <BootSequence onComplete={() => setBootComplete(true)} />;
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header onFilterChange={handleFilterChange} activeFilter={activeFilter} />
      <TraceWidget />

      {/* Main Content - Add top padding to account for fixed header */}
      <main className="container mx-auto px-4 pt-[200px] md:pt-[180px] pb-12">
        {/* Product Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-300 ${scrambling ? 'scramble' : ''}`}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-primary font-terminal text-xl">
              // NO ASSETS FOUND IN THIS CATEGORY //
            </p>
          </div>
        )}
      </main>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Corrupted Modal */}
      <CorruptedModal
        open={showCorrupted}
        onClose={() => setShowCorrupted(false)}
      />

      {/* Live Feed Ticker */}
      <Ticker />

      <style>{`
        .scramble {
          opacity: 0.5;
          position: relative;
        }

        .scramble::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%2339ff14" x="0" y="0" width="2" height="2"/><rect fill="%23ff00ff" x="50" y="50" width="2" height="2"/><rect fill="%23c0c0c0" x="100" y="100" width="2" height="2"/></svg>') repeat;
          opacity: 0.3;
          pointer-events: none;
          animation: static-noise 0.3s infinite;
        }

        @keyframes static-noise {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default Index;
