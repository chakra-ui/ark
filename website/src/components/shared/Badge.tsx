import { panda } from '@/panda/jsx'
import { badge } from '@/panda/recipes'
import type { JSXStyleProperties } from '@/panda/types'

export const Badge = (props: JSXStyleProperties) => {
  // @ts-expect-error
  return <panda.div className={badge()} {...props} />
}
