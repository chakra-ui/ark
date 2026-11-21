import * as toc from '@zag-js/toc'

import { list, num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { contentTag, itemsOf, observeItems, root } from './shared.js'

type TocHost = HTMLElement & { items?: toc.TocItem[]; scrollEl?: () => HTMLElement | null }

defineRoot<toc.Api>({
  tag: root,
  machine: toc.machine,
  connect: toc.connect,

  attributes: [
    'active-ids',
    'default-active-ids',
    'multiple',
    'auto-scroll',
    'scroll-behavior',
    'root-margin',
    'threshold',
  ],
  properties: ['ids', 'items', 'scrollEl'],
  state: {
    activeIds: {
      get: (api) => api.activeIds,
      set: (api, value) => api.setActiveIds((value as string[] | undefined) ?? []),
    },
  },
  props: (el) => {
    const host = el as unknown as TocHost
    return {
      items: host.items ?? itemsOf(el),
      scrollEl: host.scrollEl ?? (() => el.querySelector<HTMLElement>(contentTag)),
      activeIds: list(el, 'active-ids'),
      defaultActiveIds: list(el, 'default-active-ids'),
      multiple: el.hasAttribute('multiple'),
      autoScroll: el.hasAttribute('auto-scroll') ? el.getAttribute('auto-scroll') !== 'false' : undefined,
      scrollBehavior: str<ScrollBehavior>(el, 'scroll-behavior'),
      rootMargin: str(el, 'root-margin'),
      threshold: num(el, 'threshold'),
    }
  },

  events: {
    onActiveChange: 'activechange',
  },

  setup: (el) => observeItems(el, () => el.refresh()),
  rootProps: (api) => api.getRootProps(),
})
