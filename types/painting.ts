export type Painting = {
  slug: string;
  title: string;
  titleHe?: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  medium: string;
  dimensions: string;
  availability: string;
  description: string;
  quote?: string;
  featured?: boolean;
  order: number;
};
