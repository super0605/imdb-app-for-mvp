// export type MovieType = {
//   id: string;
//   title: string;
//   media_type?: string;
//   backdrop_path?: string;
//   original_language?: string;
//   original_title: string;
//   overview: string;
//   popularity?: number;
//   poster_path?: string;
//   release_date?: string;
//   video?: boolean;
//   adult?: boolean;
//   vote_average?: number;
//   vote_count?: number;
//   original_name?: string;
// };

export type MovieType = {
  id: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type MovieState = {
  movies: MovieType[];
  nowPlayingCollections: MovieType[];
  featuredTodayCollections: MovieType[];
  fanFavoritesCollections: MovieType[];
  isFetching?: boolean;
  errorMessage?: any;
};

export type RootState = {
  movieState: MovieState;
};

export type PayloadType = {
  type: string;
  payload: any;
};
