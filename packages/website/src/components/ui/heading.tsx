import { styled, type HTMLStyledProps } from 'styled-system/jsx'
import { heading } from 'styled-system/recipes'

type As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type HeadingProps = {
  as?: As
} & HTMLStyledProps<As>

export const Heading = (props: HeadingProps) => {
  const { as = 'h2', ...rest } = props
  const Component = styled(as, heading)

  return <Component {...rest} />
}
