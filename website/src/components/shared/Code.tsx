import { styled, type HTMLStyledProps } from '@/panda/jsx'
import { code } from '@/panda/recipes'

export const Code = (props: HTMLStyledProps<'code'>) => {
  return <styled.code className={code()} {...props} />
}
