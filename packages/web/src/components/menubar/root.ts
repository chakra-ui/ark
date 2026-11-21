import * as menubar from '@zag-js/menubar'

import { str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { dirOf, menusOf, root } from './shared.js'

type Orientation = NonNullable<menubar.Props['orientation']>

defineRoot<menubar.Api>({
  tag: root,
  machine: menubar.machine,
  connect: menubar.connect,

  attributes: ['orientation', 'disabled', 'loop-focus', 'dir'],
  properties: ['ids'],
  props: (el) => ({
    orientation: str<Orientation>(el, 'orientation'),
    disabled: el.hasAttribute('disabled'),
    loopFocus: el.getAttribute('loop-focus') !== 'false',
    dir: dirOf(el),
  }),

  rootProps: (api) => api.getRootProps(),
  render: (_api, el) => {
    for (const menu of menusOf(el)) menu.refresh?.()
  },
})
