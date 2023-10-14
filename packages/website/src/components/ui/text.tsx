import { styled, type HTMLStyledProps } from '@ark-ui/styled-system/jsx'

type As = 'p' | 'span' | 'div' | 'label'

export type TextProps = {
  as?: As
} & HTMLStyledProps<As>

export const Text = (props: TextProps) => {
  const { as = 'p', ...rest } = props
  const Component = styled(as)

  return <Component {...rest} />
}
