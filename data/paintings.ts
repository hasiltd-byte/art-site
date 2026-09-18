import type { Painting } from "@/types/painting";

export const seedPaintings: Painting[] = [
  {
    slug: "birth-of-the-phoenix",
    title: "Birth of the Phoenix",
    titleHe: "לידת הפינקס",
    imageUrl: "/artworks/birth-of-the-phoenix.jpg",
    medium: "Acrylic on watercolor paper",
    dimensions: "30 × 50 cm",
    availability: "Original retained by artist · Private inquiry",
    description:
      "From the deep blue, a figure emerges. Born from pain, a new beginning takes shape — a bird of fire and blood, powerful and alive. The forms appeared intuitively during the painting process, without a predetermined plan.",
    quote: "Transformation lives within us all.",
    featured: true,
    order: 1
  },
  {
    slug: "full-as-a-pomegranate",
    title: "Full as a Pomegranate",
    titleHe: "מלא כרימון",
    imageUrl: "/artworks/full-as-a-pomegranate.jpg",
    medium: "Watercolor on watercolor paper",
    dimensions: "29.5 × 42 cm",
    availability: "Original retained by artist · Private inquiry",
    description:
      "Between the trees rests a pomegranate filled with figures — joyful, sad, hidden and emerging. What begins as fruit becomes a field of faces and imagination, revealing a world inside the seeds.",
    featured: true,
    order: 2
  },
  {
    slug: "woman-between-darkness-and-blood-of-life",
    title: "Woman Between Darkness and the Blood of Life",
    titleHe: "אישה בין כתמי החושך ודם החיים",
    imageUrl: "/artworks/woman-between-darkness-and-blood-of-life.jpg",
    medium: "Acrylic on watercolor paper",
    dimensions: "29.5 × 42 cm",
    availability: "Original retained by artist · Private inquiry",
    description:
      "From emptiness and darkness a woman breaks into life. Her sensual silhouette stands proud; the surrounding black and red hold tension, desire and resistance while several figures emerge and disappear between the layers.",
    featured: true,
    order: 3
  },
  {
    slug: "female-power-male-descent",
    title: "Female Power, Male Descent",
    titleHe: "עוצמה נשית, שקיעה גברית",
    imageUrl: "/artworks/female-power-male-descent.jpg",
    medium: "Acrylic on watercolor paper",
    dimensions: "29.5 × 42 cm",
    availability: "Original retained by artist · Private inquiry",
    description:
      "A relationship saturated with emotional residue, pain and disappointment. As the woman grows stronger and more assured, the man appears to shrink and sink — yet the composition leaves room for support, recovery and a possible rise for both.",
    order: 4
  },
  {
    slug: "gaze-of-passion",
    title: "Gaze of Passion",
    titleHe: "מבט התשוקה",
    imageUrl: "/artworks/gaze-of-passion.jpg",
    medium: "Acrylic on watercolor paper",
    dimensions: "29.5 × 42 cm",
    availability: "Original retained by artist · Private inquiry",
    description:
      "Visible femininity meets a hidden femininity. One is red and charged with passion, another appears between the lines with a quieter gaze, while a white flame moves between them.",
    order: 5
  },
  {
    slug: "half-broken-self-portrait",
    title: "Half-Broken Self Portrait",
    titleHe: "דיוקן עצמי שבור למחצה",
    imageUrl: "/artworks/half-broken-self-portrait.jpg",
    medium: "Acrylic and watercolor on watercolor paper",
    dimensions: "29.5 × 42 cm",
    availability: "Original retained by artist · Private inquiry",
    description:
      "Part of a self-portrait series. The self appears broken yet whole, closed yet flowing, watching yet disappearing — wanting to speak while the words have no clear path outward.",
    order: 6
  },
  {
    slug: "men-in-turmoil",
    title: "Men in Turmoil",
    titleHe: "גברים במערבולת",
    imageUrl: "/artworks/men-in-turmoil.jpg",
    medium: "Acrylic on watercolor paper",
    dimensions: "30 × 50 cm",
    availability: "Original retained by artist · Private inquiry",
    description:
      "Out of a difficult and exhausting struggle, strong male figures reach toward a man on the ground. From a moment of fracture comes a request for help — and another figure answers it.",
    order: 7
  },
  {
    slug: "pain-of-passion",
    title: "Pain of Passion",
    titleHe: "כאב התשוקה",
    imageUrl: "/artworks/pain-of-passion.jpg",
    medium: "Acrylic on watercolor paper",
    dimensions: "29.5 × 42 cm",
    availability: "Original retained by artist · Private inquiry",
    description:
      "An intuitive work about the friction between desire, closeness and emotional pain. The image does not explain the feeling; it lets the movement and color carry it.",
    order: 8
  }
];

export const getPaintingBySlug = (slug: string) =>
  seedPaintings.find((painting) => painting.slug === slug);
