import { panda, type HTMLPandaProps } from '@/panda/jsx'

export const Heading = (props: HTMLPandaProps<'h2'>) => {
  return <panda.h2 {...props} />
}
