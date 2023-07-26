import { styled, type HTMLStyledProps } from '@/panda/jsx'
import { badge } from '@/panda/recipes'

export const Badge = (props: HTMLStyledProps<'div'>) => {
  return <styled.div className={badge()} {...props} />
}
