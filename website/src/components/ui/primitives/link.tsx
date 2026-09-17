import { ark } from '@ark-ui/react/factory'
import NextLink from 'next/link'
import { styled } from 'styled-system/jsx'
import { link } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

export type LinkProps = ComponentProps<typeof StyledAnchor>
const StyledAnchor = styled(ark.a, link)
const StyledNextLink = styled(NextLink, link)

export const Link = (props: LinkProps) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return <StyledNextLink {...props} href={href} />
  }

  return <StyledAnchor target="_blank" rel="noopener" {...props} />
}
