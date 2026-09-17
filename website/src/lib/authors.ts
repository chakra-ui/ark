export interface Author {
  name: string
  /** GitHub handle, used for the avatar. */
  login: string
}

const AUTHORS: Record<string, Author> = {
  sage: { name: 'Segun Adebayo', login: 'segunadebayo' },
  esther: { name: 'Esther Agbaje', login: 'estheragbaje' },
  lope: { name: 'Adebesin Tolulope', login: 'Adebesin-Cell' },
  christian: { name: 'Christian Schröter', login: 'cschroeter' },
  abraham: { name: 'Abraham', login: 'anubra266' },
}

export const avatarUrl = (login: string, size = 48) => `https://github.com/${login}.png?size=${size}`

export interface ResolvedAuthor {
  name: string
  login?: string
}

export const resolveAuthors = (author?: string | string[]): ResolvedAuthor[] => {
  const names = Array.isArray(author) ? author : author ? [author] : []
  return names.map((name) => {
    const match = AUTHORS[name.toLowerCase()]
    return match ?? { name }
  })
}
