export interface SiteConfig {
  coupleNames: string;
  tagline: string;
  date: string;
  time: string;
  location: string;
  logo: string;
  backgroundMusic?: string;
}

export interface HeroData {
  enabled: boolean;
  backgroundImage: string;
  brideImage: string;
  groomImage: string;
  saveTheDate: string;
  brideName: string;
  groomName: string;
  date: string;
  location: string;
}

export interface StoryEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface StoryData {
  enabled: boolean;
  title: string;
  subtitle: string;
  brideSketch: string;
  groomSketch: string;
  coupleImage: string;
  events: StoryEvent[];
}

export interface VenueData {
  enabled: boolean;
  sectionTitle: string;
  name: string;
  address: string;
  date: string;
  time: string;
  image: string;
  mapEmbedUrl: string;
  lat: number;
  lng: number;
}

export interface LivestreamData {
  enabled: boolean;
  title: string;
  subtitle: string;
  streamUrl: string;
  date: string;
  time: string;
}

export interface MemoryItem {
  type: "image" | "video";
  src: string;
  caption: string;
}

export interface MemoriesData {
  enabled: boolean;
  title: string;
  subtitle: string;
  items: MemoryItem[];
}

export interface ClosingData {
  enabled: boolean;
  title: string;
  message: string;
  backgroundImage: string;
  coupleNames: string;
}

export interface WeddingData {
  site: SiteConfig;
  hero: HeroData;
  story: StoryData;
  venue: VenueData;
  reception: VenueData;
  livestream: LivestreamData;
  memories: MemoriesData;
  closing: ClosingData;
}
