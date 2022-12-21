import { panda } from '../../../panda/jsx'
import type { JSXStyleProperties } from '../../../panda/types'

export const Heading = (props: JSXStyleProperties) => {
  // @ts-expect-error typings are wrong
  return <panda.h2 {...props} />
}
