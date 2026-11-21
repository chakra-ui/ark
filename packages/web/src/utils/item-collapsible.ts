import * as collapsible from '@zag-js/collapsible'
import { normalizeProps, VanillaMachine } from '@zag-js/vanilla'

interface Init {
  id: string
  contentId: string
  open: boolean
}

export interface ItemCollapsible {
  api: () => collapsible.Api
  sync: (open: boolean) => void
  stop: VoidFunction
}

const items = new WeakMap<HTMLElement, ItemCollapsible>()

export function itemCollapsible(host: HTMLElement, init: () => Init, onChange: VoidFunction): ItemCollapsible {
  const existing = items.get(host)
  if (existing) return existing

  const { id, contentId, open } = init()
  let props: collapsible.Props = {
    id,
    ids: { content: contentId },
    open,
    getRootNode: () => host.getRootNode() as Document | ShadowRoot,
  }
  const service = new VanillaMachine(collapsible.machine, () => props)
  const unsubscribe = service.subscribe(onChange)
  service.start()

  const item: ItemCollapsible = {
    api: () => collapsible.connect(service.service, normalizeProps),
    sync(open) {
      if (open === props.open) return
      props = { ...props, open }
      // An empty patch re-reads `props`
      service.updateProps({} as collapsible.Props)
    },
    stop() {
      unsubscribe()
      service.stop()
      items.delete(host)
    },
  }
  items.set(host, item)
  return item
}

export const stopItemCollapsible = (host: HTMLElement) => items.get(host)?.stop()

export function withoutVisibility(props: Record<string, any>) {
  const { hidden: _, 'data-state': __, ...rest } = props
  return rest
}
