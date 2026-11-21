import * as toast from '@zag-js/toast'
import { spreadProps } from '@zag-js/vanilla'
import { list, num, str } from '../../utils/attrs.js'
import { defineRoot, type RootElement } from '../../utils/define.js'
import { repeat, templateOf } from '../../utils/repeat.js'
import { createToaster, entries, root, toaster } from './shared.js'

const stores = new WeakMap<Element, toast.Store<string>>()

const storeAttrs = (el: Element): toast.StoreProps => ({
  placement: str<toast.Placement>(el, 'placement'),
  max: num(el, 'max'),
  overlap: el.hasAttribute('overlap') || undefined,
  duration: num(el, 'duration'),
  gap: num(el, 'gap'),
  offsets: str(el, 'offsets'),
  removeDelay: num(el, 'remove-delay'),
  hotkey: list(el, 'hotkey'),
})

function storeOf(el: HTMLElement) {
  // A store assigned before the element upgraded sits on the instance and shadows the accessor
  if (Object.hasOwn(el, 'toaster')) {
    const store = (el as any).toaster
    delete (el as any).toaster
    stores.set(el, store)
  }
  let store = stores.get(el)
  if (!store) {
    store = createToaster(storeAttrs(el))
    stores.set(el, store)
  }
  return store
}

const Toaster = defineRoot<toast.GroupApi>({
  tag: toaster,
  machine: toast.group.machine,
  // `label` is a getGroupProps option, so it rides along as a machine prop
  connect: (service, normalize) => {
    const api = toast.group.connect(service, normalize)
    const label = service.prop('label')
    return { ...api, getGroupProps: (options = {}) => api.getGroupProps({ label, ...options }) }
  },
  attributes: ['label'],
  // Not observed: the group props write `dir` back onto this element
  props: (el) => ({
    store: storeOf(el),
    dir: el.parentElement?.closest('[dir]')?.getAttribute('dir') as 'ltr' | 'rtl' | undefined,
    label: str(el, 'label'),
  }),
  rootProps: (api) => api.getGroupProps(),
  render(api, el) {
    const template = templateOf(el)
    if (!template) return
    const parent = el.service as unknown as toast.GroupService
    repeat(
      template,
      api.getToasts(),
      (item) => item.id!,
      (node, item, index) => {
        entries.set(node, { toast: item as toast.Options<string>, index, parent })
        ;(node as Partial<RootElement>).refresh?.()
      },
    )
  },
})

Object.defineProperty(Toaster.prototype, 'toaster', {
  get(this: HTMLElement) {
    return storeOf(this)
  },
  set(this: HTMLElement & { connectedCallback(): void; disconnectedCallback(): void }, store: toast.Store<string>) {
    if (stores.get(this) === store) return
    stores.set(this, store)
    if (!this.isConnected) return
    // The group machine reads its store once, on creation
    this.disconnectedCallback()
    this.connectedCallback()
  },
})

const ghosts = new WeakMap<HTMLElement, HTMLElement[]>()

defineRoot<toast.Api>({
  events: { onStatusChange: 'statuschange' },
  tag: root,
  machine: toast.machine,
  connect: toast.connect,
  props: (el) => {
    const entry = entries.get(el)
    return entry ? { ...entry.toast, index: entry.index, parent: entry.parent } : {}
  },
  rootProps: (api) => api.getRootProps(),
  setup(el) {
    const before = document.createElement('div')
    const after = document.createElement('div')
    el.prepend(before)
    el.append(after)
    ghosts.set(el, [before, after])
    return () => {
      before.remove()
      after.remove()
    }
  },
  render(api, el) {
    const [before, after] = ghosts.get(el) ?? []
    if (!before || !after) return
    spreadProps(before, api.getGhostBeforeProps(), el.machineId)
    spreadProps(after, api.getGhostAfterProps(), el.machineId)
  },
})
