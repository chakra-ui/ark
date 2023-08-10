import type { PropsWithChildren } from 'react'
import { styled, type HTMLStyledProps } from 'styled-system/jsx'
import { slugify } from '~/lib/slugify'

type TagVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

type TypographyProps = PropsWithChildren<{
  as?: TagVariants
}> &
  HTMLStyledProps<TagVariants>

export const Typography = (props: TypographyProps) => {
  const { as = 'p', ...rest } = props

  const Component = styled(as)
  return <Component {...rest} />
}

type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type HeadingProps = PropsWithChildren<{
  as?: HeadingTags
}> &
  HTMLStyledProps<TagVariants>

export const Heading = (props: HeadingProps) => {
  const { as = 'h2', children, ...rest } = props
  const id = typeof children === 'string' ? slugify(children) : undefined

  return (
    <Typography as={as} id={id} fontWeight="bold" {...rest}>
      {children}
    </Typography>
  )
}
