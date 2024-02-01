import { useMemo } from 'react'
import { styled, type HTMLStyledProps, type StyledComponent } from 'styled-system/jsx'
import { text, type TextVariantProps } from 'styled-system/recipes'

type As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type HeadingProps = {
  as?: As
} & TextVariantProps &
  HTMLStyledProps<As>

export const Heading = (props: HeadingProps) => {
  const { as = 'h2', variant = 'heading', ...localProps } = props
  const Dynamic = useMemo(() => styled(as, text) as StyledComponent<As>, [as])

  return <Dynamic {...localProps} />
}
