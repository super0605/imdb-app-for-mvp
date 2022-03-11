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
  original_name?: string;
};

export type MovieState = {
  movies: MovieType[];
  nowPlayingCollections: MovieType[];
  featuredTodayCollections: MovieType[];
  fanFavoritesCollections: MovieType[];
  selectedMovie: MovieType | null;
  isFetching?: boolean;
  errorMessage?: any;
};


export type FavoritesState = {
  favorites: MovieType[];
  isLoading?: boolean;
  errorMessage?: any;
};

export type RootState = {
  movieState: MovieState;
  favoritesState: FavoritesState;
};

export type PayloadType = {
  type: string;
  payload: any;
};
