import { Asset, Entry } from "contentful";
type _Product = {
  name: string;
  summary: string;
  price: number;
  description: string;
  image: Asset[];
  heatLevel: "Mild" | "Medium" | "Hot";
};

export type Product = Entry<_Product>;
