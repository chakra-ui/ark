import { HTMLPandaProps, panda } from '@/panda/jsx'
import { divider } from '@/panda/recipes'

export const Divider = (props: HTMLPandaProps<'hr'>) => {
  return <panda.hr className={divider()} {...props} />
}
