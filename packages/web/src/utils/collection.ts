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

type ItemInput =
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

export interface ListLike<T = any> {
  items: T[]
  size: number
  getItemValue: (item: T | null | undefined) => string | null
  getItemDisabled: (item: T | null) => boolean
  stringifyItem: (item: T | null) => string | null
  indexOf: (value: string | null) => number
  group: () => [string, T[]][]
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
  render?: (list: HTMLElement, collection: C, config: CollectionConfig<C>) => void
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

export function positionOf(collection: Pick<ListLike, 'indexOf' | 'size'>, value: string | null) {
  const index = collection.indexOf(value)
  if (index < 0) return {}

  return { 'aria-posinset': index + 1, 'aria-setsize': collection.size }
}

function readFlatMarkup<C>(el: HTMLElement, config: CollectionConfig<C>): Item[] {
  return Array.from(el.querySelectorAll<HTMLElement>(`${config.item}:not([data-rendered])`), (item) => ({
    value: item.getAttribute('value') ?? '',
    label: (item.querySelector(config.itemText) ?? item).textContent?.trim() ?? '',
    disabled: item.hasAttribute('disabled'),
    group: (config.itemGroup && item.closest(config.itemGroup)?.getAttribute('name')) || undefined,
  }))
}

function readJson(script: HTMLScriptElement): Item[] {
  try {
    return (JSON.parse(script.textContent || '[]') as ItemInput[]).map(toItem)
  } catch {
    return []
  }
}

export function clearRendered(list: Element) {
  for (const rendered of list.querySelectorAll(':scope > [data-rendered]')) rendered.remove()
}

export function cloneTemplate(template: HTMLTemplateElement | null, fallback: () => HTMLElement) {
  const node = (template?.content.firstElementChild?.cloneNode(true) as HTMLElement | undefined) ?? fallback()
  node.setAttribute('data-rendered', '')
  return node
}

function createPart(doc: Document, tag: string, child?: string) {
  const node = doc.createElement(tag)
  if (child) node.append(doc.createElement(child))
  return node
}

interface Templates {
  item: HTMLTemplateElement | null
  group: HTMLTemplateElement | null
}

function renderGroup<C>(list: HTMLElement, templates: Templates, name: string, config: CollectionConfig<C>) {
  const group = cloneTemplate(templates.group, () =>
    createPart(list.ownerDocument, config.itemGroup!, config.itemGroupLabel),
  )
  group.setAttribute('name', name)

  const label = config.itemGroupLabel && group.querySelector(config.itemGroupLabel)
  if (label) label.textContent = name

  list.append(group)
  return group
}

function renderItem<C>(
  list: HTMLElement,
  templates: Templates,
  collection: ListLike,
  item: unknown,
  config: CollectionConfig<C>,
) {
  const node = cloneTemplate(templates.item, () => createPart(list.ownerDocument, config.item, config.itemText))
  node.setAttribute('value', collection.getItemValue(item) ?? '')
  node.toggleAttribute('disabled', collection.getItemDisabled(item))

  const text = node.querySelector(config.itemText) ?? node
  text.textContent = collection.stringifyItem(item) ?? ''

  return node
}

function renderList<C>(list: HTMLElement, collection: C, config: CollectionConfig<C>) {
  const source = collection as unknown as ListLike
  const templates = {
    item: list.querySelector<HTMLTemplateElement>(':scope > template:not([data-group])'),
    group: list.querySelector<HTMLTemplateElement>(':scope > template[data-group]'),
  }

  clearRendered(list)

  for (const [name, items] of source.group()) {
    const parent = name && config.itemGroup ? renderGroup(list, templates, name, config) : list
    for (const item of items) parent.append(renderItem(list, templates, source, item, config))
  }
}

interface State<C> {
  source: unknown
  key: string
  collection: C
  list: HTMLElement | null
}

const markup = Symbol('markup')

interface Source<C> {
  source: unknown
  key: string
  property?: C
  items?: () => Item[]
}

export function defineCollection<C>(config: CollectionConfig<C>) {
  const states = new WeakMap<HTMLElement, State<C>>()
  const readMarkup = config.readMarkup ?? readFlatMarkup
  const render = config.render ?? renderList

  const attributesOf = (el: HTMLElement) => JSON.stringify(config.attributes?.map((name) => el.getAttribute(name)))

  const readProperty = (el: HTMLElement): Source<C> | null => {
    const property = (el as HTMLElement & { collection?: C }).collection
    if (!property) return null

    return { source: property, key: '', property }
  }

  const readScript = (el: HTMLElement): Source<C> | null => {
    const script = el.querySelector<HTMLScriptElement>(':scope > script[type="application/json"]')
    if (!script) return null

    return {
      source: script,
      key: `${script.textContent}|${attributesOf(el)}`,
      items: () => readJson(script),
    }
  }

  const readItems = (el: HTMLElement): Source<C> => {
    const items = readMarkup(el, config)

    return {
      source: markup,
      key: `${JSON.stringify(items)}|${attributesOf(el)}`,
      items: () => items,
    }
  }

  const read = (el: HTMLElement) => readProperty(el) ?? readScript(el) ?? readItems(el)

  const renderTarget = (el: HTMLElement, dataDriven: boolean) => {
    const list = el.querySelector<HTMLElement>(config.list)
    if (!dataDriven || !list || list.hasAttribute('manual')) return null
    return list
  }

  function build(el: HTMLElement) {
    const next = read(el)
    const prev = states.get(el)

    const changed = !prev || prev.source !== next.source || prev.key !== next.key
    const collection = changed ? (next.property ?? config.create(next.items!(), el)) : prev.collection

    const dataDriven = next.source !== markup
    if (!dataDriven && changed && prev?.list) clearRendered(prev.list)

    const list = renderTarget(el, dataDriven)
    if (list && (changed || prev?.list !== list)) render(list, collection, config)

    states.set(el, { source: next.source, key: next.key, collection, list })
    return changed
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
    get: (el: HTMLElement) => states.get(el)?.collection,
    valueOf: (part: HTMLElement) => part.closest(config.item)?.getAttribute('value') ?? null,
  }
}
