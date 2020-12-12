export interface InterfaceToast {
  show: (id: string) => void
  hide: (id: string) => void
}

export interface Film {
  id: number
  title: string
  tagline: string
  vote_average: number
  vote_count: number
  release_date: string
  poster_path: string
  overview: string
  budget: number
  revenue: number
  genres: Array<string>
  runtime: number
}

export interface FilmForm {
  id: number | null
  title: string | null
  date: string | null
  url: string | null
  overview: string | null
  runtime: number | null
}

export interface Films {
  data: Array<Film>
  totalAmount: number
}

export interface Genres {
  code: string
  name: string
}

export interface MovieRequest {
  [key: string]: string | number | Array<string> | null
}

export interface Form {
  value: string
}
