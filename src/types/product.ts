export type ProductCategory = "OPTICS (K-SEC)" | "CHASSIS (M-SPEC)" | "NEURAL (BANNED)";

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  price: number;
  image: string;
  description: string;
  sideEffects: string[];
}
