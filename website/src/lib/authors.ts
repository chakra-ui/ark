export interface Author {
  name: string
  /** GitHub handle, used for the avatar. */
  login: string
  /** Twitter/X handle, without the leading @. */
  twitter?: string
}

const AUTHORS: Record<string, Author> = {
  sage: { name: 'Segun Adebayo', login: 'segunadebayo', twitter: 'thesegunadebayo' },
  esther: { name: 'Esther Agbaje', login: 'estheragbaje' },
  lope: { name: 'Adebesin Tolulope', login: 'Adebesin-Cell' },
  christian: { name: 'Christian Schröter', login: 'cschroeter' },
  abraham: { name: 'Abraham', login: 'anubra266' },
}

export const avatarUrl = (login: string, size = 48) => `https://github.com/${login}.png?size=${size}`

export const twitterUrl = (handle: string) => `https://x.com/${handle.replace(/^@/, '')}`

export interface ResolvedAuthor {
  name: string
  login?: string
  twitter?: string
}

export const resolveAuthors = (author?: string | string[]): ResolvedAuthor[] => {
  const names = Array.isArray(author) ? author : author ? [author] : []
  return names.map((name) => {
    const match = AUTHORS[name.toLowerCase()]
    return match ?? { name }
  })
}
