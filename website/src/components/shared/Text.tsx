import { panda } from '@/panda/jsx'
import type { JSXStyleProperties } from '@/panda/types'

export const Text = (props: JSXStyleProperties) => {
  // @ts-expect-error typings are wrong
  return <panda.p {...props} />
}
