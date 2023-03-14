import { HTMLPandaProps, panda } from '@/panda/jsx'
import { code } from '@/panda/recipes'

export const Code = (props: HTMLPandaProps<'code'>) => {
  return <panda.code className={code()} {...props} />
}
