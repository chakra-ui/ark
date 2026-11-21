import * as splitter from '@zag-js/splitter'
import { num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { panelAttributes, readPanels, root, sizes } from './shared.js'

const registries = new WeakMap<Element, splitter.SplitterRegistry>()

// Nested splitters share the outermost one's registry so a drag at an intersection moves both
function registryOf(el: HTMLElement) {
  let outer: HTMLElement = el
  for (let next = el.parentElement?.closest(root); next; next = next.parentElement?.closest(root)) outer = next
  if (outer === el && !el.querySelector(root)) return undefined
  let registry = registries.get(outer)
  if (!registry) {
    registry = splitter.registry()
    registries.set(outer, registry)
  }
  return registry
}

const panelsKey = (el: HTMLElement) => JSON.stringify(readPanels(el))

defineRoot<splitter.Api>({
  properties: ['ids'],

  tag: root,
  machine: splitter.machine,
  connect: splitter.connect,
  attributes: ['size', 'default-size', 'orientation', 'disabled', 'keyboard-resize-by', 'nonce'],
  state: {
    size: {
      get: (api) => api.getSizes(),
      set: (api, value) => api.setSizes(value),
    },
  },
  props: (el) => ({
    panels: readPanels(el),
    size: sizes(el, 'size'),
    defaultSize: sizes(el, 'default-size'),
    orientation: str<'horizontal' | 'vertical'>(el, 'orientation') ?? 'horizontal',
    disabled: el.hasAttribute('disabled'),
    keyboardResizeBy: num(el, 'keyboard-resize-by'),
    nonce: str(el, 'nonce'),
    registry: registryOf(el),
  }),
  // `resize` would bubble to window and trip its resize listeners
  events: {
    onResize: 'resize',
    onResizeStart: 'resizestart',
    onResizeEnd: 'resizeend',
    onCollapse: 'collapse',
    onExpand: 'expand',
  },
  setup: (el) => {
    let key = panelsKey(el)
    const observer = new MutationObserver(() => {
      const next = panelsKey(el)
      if (next === key) return
      key = next
      el.refresh()
    })
    observer.observe(el, { subtree: true, childList: true, attributeFilter: panelAttributes })
    return () => observer.disconnect()
  },
  rootProps: (api) => api.getRootProps(),
})
