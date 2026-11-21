import type { RootElement } from './define.js'

export interface Item {
  value: string
  label: string
  disabled: boolean
  group?: string
  keywords?: string[]
  parent?: string
  children?: Item[]
}

export type ItemInput =
  | string
  | {
      value: string
      label?: string
      disabled?: boolean
      group?: string
      keywords?: string[]
      parent?: string
      children?: ItemInput[]
    }

export interface CollectionConfig<C> {
  item: string
  itemText: string
  list: string
  itemGroup?: string
  itemGroupLabel?: string
  create: (items: Item[], el: HTMLElement) => C
  attributes?: string[]
  readMarkup?: (el: HTMLElement, config: CollectionConfig<C>) => Item[]
  render?: (template: HTMLTemplateElement, items: Item[], config: CollectionConfig<C>) => void
}

const toItem = (input: ItemInput): Item =>
  typeof input === 'string'
    ? { value: input, label: input, disabled: false }
    : {
        value: input.value,
        label: input.label ?? input.value,
        disabled: !!input.disabled,
        group: input.group,
        keywords: input.keywords,
        parent: input.parent,
        children: input.children?.map(toItem),
      }

export const grouping = (items: Item[]) =>
  items.some((item) => item.group) ? { groupBy: (item: Item) => item.group ?? '' } : {}

function readFlatMarkup<C>(el: HTMLElement, config: CollectionConfig<C>): Item[] {
  return Array.from(el.querySelectorAll<HTMLElement>(`${config.item}:not([data-rendered])`), (item) => ({
    value: item.getAttribute('value') ?? '',
    label: (item.querySelector(config.itemText) ?? item).textContent?.trim() ?? '',
    disabled: item.hasAttribute('disabled'),
    group: (config.itemGroup && item.closest(config.itemGroup)?.getAttribute('name')) || undefined,
  }))
}

function renderItem<C>(template: HTMLTemplateElement, item: Item, config: CollectionConfig<C>) {
  const node = template.content.firstElementChild?.cloneNode(true) as HTMLElement
  node.setAttribute('value', item.value)
  node.toggleAttribute('disabled', item.disabled)
  node.setAttribute('data-rendered', '')
  ;(node.querySelector(config.itemText) ?? node).textContent = item.label
  return node
}

function renderFlat<C>(template: HTMLTemplateElement, items: Item[], config: CollectionConfig<C>) {
  const list = template.parentElement!
  for (const rendered of list.querySelectorAll(':scope > [data-rendered]')) rendered.remove()

  const groupTemplate = list.querySelector<HTMLTemplateElement>(':scope > template[data-group]')
  const groups = new Map<string, HTMLElement>()

  for (const item of items) {
    let parent: HTMLElement = list
    if (item.group && groupTemplate && config.itemGroup) {
      let group = groups.get(item.group)
      if (!group) {
        group = groupTemplate.content.firstElementChild?.cloneNode(true) as HTMLElement
        group.setAttribute('name', item.group)
        group.setAttribute('data-rendered', '')
        if (config.itemGroupLabel) {
          const label = group.querySelector(config.itemGroupLabel)
          if (label) label.textContent = item.group
        }
        groups.set(item.group, group)
        list.append(group)
      }
      parent = group
    }
    parent.append(renderItem(template, item, config))
  }
}

export function defineCollection<C>(config: CollectionConfig<C>) {
  const collections = new WeakMap<HTMLElement, C>()
  const keys = new WeakMap<HTMLElement, string>()
  const readMarkup = config.readMarkup ?? readFlatMarkup
  const render = config.render ?? renderFlat

  function readData(el: HTMLElement): Item[] | null {
    const prop = (el as HTMLElement & { items?: ItemInput[] }).items
    if (prop) return prop.map(toItem)
    const script = el.querySelector<HTMLScriptElement>(':scope > script[type="application/json"]')
    if (!script) return null
    try {
      return (JSON.parse(script.textContent || '[]') as ItemInput[]).map(toItem)
    } catch {
      return []
    }
  }

  function build(el: HTMLElement) {
    const data = readData(el)
    const items = data ?? readMarkup(el, config)
    const template = data && el.querySelector<HTMLTemplateElement>(`${config.list} > template:not([data-group])`)
    const key = JSON.stringify([items, config.attributes?.map((name) => el.getAttribute(name)), !!template])
    if (keys.get(el) === key) return false
    keys.set(el, key)
    if (template) render(template, data, config)
    collections.set(el, config.create(items, el))
    return true
  }

  function setup(el: RootElement): VoidFunction {
    build(el)

    const observer = new MutationObserver(() => {
      if (build(el)) el.refresh()
    })
    observer.observe(el, {
      subtree: true,
      childList: true,
      characterData: true,
      attributeFilter: ['value', 'disabled', ...(config.attributes ?? [])],
    })
    return () => observer.disconnect()
  }

  return {
    setup,
    update: build,
    get: (el: HTMLElement) => collections.get(el),
    valueOf: (part: HTMLElement) => part.closest(config.item)?.getAttribute('value') ?? null,
  }
}
