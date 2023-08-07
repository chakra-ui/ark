import { styled, type HTMLStyledProps } from 'panda/jsx'
import type { PropsWithChildren } from 'react'

type TagVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

type TypographyProps = PropsWithChildren<{
  as?: TagVariants
}> &
  HTMLStyledProps<TagVariants>

export const Text = (props: TypographyProps) => {
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

  return (
    <Text as={as} fontWeight="bold" {...rest}>
      {children}
    </Text>
  )
}
