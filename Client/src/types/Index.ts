export interface IndexAnimeType {
  id: number;
  name: string;
  russian: string;
  licenseNameRu: string;
  english: string;
  japanese: string;
  poster: {
    mainUrl: string;
  };
}

export interface AnimePageDataType {
  id: string;
  malId: string;
  name: string;
  russian: string;
  licenseNameRu: string;
  english: string;
  japanese: string;
  synonyms: string[];
  kind:
    | "tv"
    | "movie"
    | "ova"
    | "ona"
    | "special"
    | "tv_special"
    | "music"
    | "pv"
    | "cm";
  rating: "none" | "g" | "pg" | "pg_13" | "r" | "r_plus" | "rx";
  score: number;
  status: "anons" | "ongoing" | "released";
  episodes: number;
  episodesAired: number;
  duration: string;
  airedOn: { year?: number; month?: number; day?: number; date?: string };
  releasedOn: { year?: number; month?: number; day?: number; date?: string };
  url: string;
  season: string;

  poster: { id: number; originalUrl: string; mainUrl: string };

  fansubbers: string[];
  fandubbers: string[];
  nextEpisodeAt: string;
  isCensored: boolean;

  genres: { id: number; name: string; russian: string; kind: string }[];
  studios: { id: number; name: string; imageUrl: string }[];

  externalLinks: {
    id: number;
    kind: string;
    url: string;
    createdAt: string;
    updatedAt: string;
  }[];

  personRoles: {
    id: number;
    rolesRu: string[];
    rolesEn: string[];
    person: { id: number; name: string; poster: { id: number } };
  }[];
  characterRoles: {
    id: number;
    rolesRu: string[];
    rolesEn: string[];
    character: { id: number; name: string; poster: { id: number } };
  }[];

  related: {
    id: number;
    anime: {
      id: number;
      name: string;
    };
    manga: {
      id: number;
      name: string;
    };
    relationRu: string;
    relationEn: string;
  }[];

  videos: {
    id: number;
    url: string;
    name: string;
    kind: string;
    playerUrl: string;
    imageUrl: string;
  }[];
  screenshots: {
    id: number;
    originalUrl: string;
    x166Url: string;
    x332Url: string;
  }[];

  scoresStats: { score: string; count: string }[];
  statusesStats: { status: string; count: number }[];

  description: string;
  descriptionHtml: string;
  descriptionSource: string;
  bannerImage: string;
  coverImage:string;
}
