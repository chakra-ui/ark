import * as scrollArea from '@zag-js/scroll-area'

import { str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { type Api, root } from './shared.js'

type Dir = 'ltr' | 'rtl'

const dirOf = (el: Element): Dir | undefined => {
  const own = str<Dir>(el, 'dir')
  if (own) return own

  const inherited = el.parentElement?.closest('[dir]')?.getAttribute('dir')
  return (inherited as Dir | null) ?? undefined
}

defineRoot<Api>({
  tag: root,
  machine: scrollArea.machine,
  connect: scrollArea.connect,

  attributes: ['dir'],
  properties: ['ids'],
  props: (el) => ({
    dir: dirOf(el),
  }),

  rootProps: (api) => api.getRootProps(),
})
