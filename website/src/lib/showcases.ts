import showcasesData from '~/content/showcases.json'

export interface Showcase {
  title: string
  description: string
  url: string
  image: string
}

export type Showcases = Showcase

export const showcases = showcasesData as Showcase[]
