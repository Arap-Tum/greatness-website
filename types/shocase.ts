export type MediaType = 'image' | 'video'

export interface ShowcaseMedia {
  id: string
  type: MediaType
  url: string
  thumbnail?: string
  title?: string
}

export interface ShowcaseProject {
  id: string
  title: string
  description?: string
  media: ShowcaseMedia[]
}

export interface ShowcaseCompany {
  id: string
  name: string
  category: string
  tagline: string
  logo: string
  initials: string
  accent: string

  projects: ShowcaseProject[]
}