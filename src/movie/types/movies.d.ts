import { AxiosResponse } from "axios";
import { Observable, ObservableInputTuple } from "rxjs";

export type TmdbApiResponseType = {
  page: number,
  results: TmdbMovie[],
  total_pages: number,
  total_results: number
}

export type Movie = {
  title: string,
  image_url: string
}

export type TmdbMovie = {
  original_title: string,
  poster_path: string,
  title: string,
  [key: string]: unknown
}

export type TmdbAxiosResponse = Observable<AxiosResponse<TmdbApiResponseType>>;