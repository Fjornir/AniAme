export interface AnimeSearchDataType {
  id: number;
  russian: string;
  kind:
    | 'tv'
    | 'movie'
    | 'ova'
    | 'ona'
    | 'special'
    | 'tv_special'
    | 'music'
    | 'pv'
    | 'cm';
  poster: { id: number; originalUrl: string; mainUrl: string };
  status: 'anons' | 'ongoing' | 'released';
  releasedOn: { year?: number; month?: number; day?: number; date?: string };
  genres: { id: number; name: string; russian: string; kind: string }[];
  studios: { id: number; name: string; imageUrl: string }[];
}
