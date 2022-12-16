import { panda } from '../../../panda/jsx'
import type { JSXStyleProperties } from '../../../panda/types'

export const Heading = (props: JSXStyleProperties) => {
  return <panda.h2 {...props} />
}
