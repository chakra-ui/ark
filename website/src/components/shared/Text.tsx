import { styled, type HTMLStyledProps } from '@/panda/jsx'

export const Text = (props: HTMLStyledProps<'p'>) => {
  return <styled.p {...props} />
}
