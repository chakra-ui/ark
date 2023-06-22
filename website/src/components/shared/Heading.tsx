import { styled, type HTMLStyledProps } from '@/panda/jsx'

export const Heading = (props: HTMLStyledProps<'h2'>) => {
  return <styled.h2 {...props} />
}
