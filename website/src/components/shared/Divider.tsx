import { styled, type HTMLStyledProps } from '@/panda/jsx'
import { divider } from '@/panda/recipes'

export const Divider = (props: HTMLStyledProps<'hr'>) => {
  return <styled.hr className={divider()} {...props} />
}
