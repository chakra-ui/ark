import { css } from 'styled-system/css'
import { HStack } from 'styled-system/jsx'
import { Text } from '~/components/ui/text'
import { type ResolvedAuthor, avatarUrl, resolveAuthors } from '~/lib/authors'

const ring = css({
  rounded: 'full',
  objectFit: 'cover',
  borderWidth: '2px',
  borderColor: 'bg.default',
  backgroundColor: 'bg.muted',
})

const badge = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  rounded: 'full',
  borderWidth: '2px',
  borderColor: 'bg.default',
  bg: 'bg.emphasized',
  color: 'fg.muted',
  fontWeight: 'medium',
})

export const formatAuthorNames = (names: string[]): string => {
  if (names.length <= 1) return names[0] ?? ''
  if (names.length <= 3) return `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}`
  return `${names.slice(0, 2).join(', ')} & ${names.length - 2} others`
}

interface Props {
  author?: string | string[]
  size?: number
  max?: number
  showNames?: boolean
}

export const AuthorAvatars = ({ author, size = 24, max = 4, showNames = true }: Props) => {
  const authors = resolveAuthors(author)
  if (authors.length === 0) return null

  const withAvatar = authors.filter((a): a is ResolvedAuthor & { login: string } => Boolean(a.login))
  const shown = withAvatar.slice(0, max)
  const extra = withAvatar.length - shown.length
  const overlap = Math.round(size / 3)

  return (
    <HStack gap="2" className={css({ color: 'fg.muted', textStyle: 'sm' })}>
      {shown.length > 0 && (
        <HStack gap="0">
          {shown.map((a, index) => (
            <img
              key={a.login}
              src={avatarUrl(a.login, size * 2)}
              alt={a.name}
              width={size}
              height={size}
              className={ring}
              style={{ marginLeft: index === 0 ? 0 : `-${overlap}px`, zIndex: shown.length - index }}
            />
          ))}
          {extra > 0 && (
            <div
              className={badge}
              style={{ width: size, height: size, fontSize: size * 0.42, marginLeft: `-${overlap}px` }}
            >
              +{extra}
            </div>
          )}
        </HStack>
      )}
      {showNames && (
        <Text as="span" color="fg.muted">
          {formatAuthorNames(authors.map((a) => a.name))}
        </Text>
      )}
    </HStack>
  )
}
