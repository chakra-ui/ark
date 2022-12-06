import { panda } from '../../../panda/jsx'
import type { JSXStyleProperties } from '../../../panda/types'

export const Text = (props: JSXStyleProperties) => {
  return <panda.p {...props} />
}
