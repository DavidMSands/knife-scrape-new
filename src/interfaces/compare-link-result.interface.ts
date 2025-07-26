export interface CompareLinkResult {
  product: CompareLinkProduct;
  matches?: CompareLinkMatch[];
}

interface CompareLinkProduct {
  title: string;
  price: string;
  vendor: string;
  link: string;
  image: string;
  available: boolean;
}

interface CompareLinkMatch {
  title: string;
  price: string;
  vendor: string;
  available: boolean;
  link: string;
  image: string;
}