import { HTMLPandaProps, panda } from '@/panda/jsx'

export const Text = (props: HTMLPandaProps<'p'>) => {
  return <panda.p {...props} />
}
