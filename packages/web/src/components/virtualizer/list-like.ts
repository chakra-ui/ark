import type { ListVirtualizerOptions, VirtualItem, WindowVirtualizerOptions } from '@zag-js/virtualizer'

import type { CreateListVirtualizerReturn, CreateWindowVirtualizerReturn } from './create.js'
import { adoptDisplay, asChild } from '../../utils/define.js'

import { composed, contentOf, defined, number, reuse, templateOf } from './dom.js'
import { renderVirtualItems, spreadVirtualizerProps } from './render.js'

const listAttributes = ['count', 'estimated-size', 'overscan', 'gap', 'orientation', 'padding-start', 'padding-end']

type ListLike = CreateListVirtualizerReturn | CreateWindowVirtualizerReturn
type ListLikeOptions = ListVirtualizerOptions | WindowVirtualizerOptions

export abstract class ListLikeVirtualizerElement<V extends ListLike, O extends ListLikeOptions> extends HTMLElement {
  static observedAttributes = listAttributes

  renderItem?: (element: HTMLElement, item: VirtualItem) => void

  #options: Partial<O> = {}
  #virtualizer: V | undefined
  #cleanup: VoidFunction | undefined

  protected abstract create(options: O): V
  protected abstract contentTag: string
  protected abstract itemTag: string

  get virtualizer(): V | undefined {
    return this.#virtualizer
  }

  get options(): Partial<O> {
    return this.#options
  }

  set options(value: Partial<O>) {
    this.#options = value
    this.#update()
  }

  get count(): number {
    return number(this, 'count') ?? 0
  }

  set count(value: number) {
    this.setAttribute('count', String(value))
  }

  #resolve(): O {
    const size = number(this, 'estimated-size') ?? 40

    return {
      estimatedSize: () => size,
      ...defined({
        count: this.count,
        overscan: number(this, 'overscan'),
        gap: number(this, 'gap'),
        orientation: this.getAttribute('orientation') ?? undefined,
        paddingStart: number(this, 'padding-start'),
        paddingEnd: number(this, 'padding-end'),
      }),
      ...this.#options,
    } as unknown as O
  }

  connectedCallback() {
    adoptDisplay(this, 'block')

    const virtualizer = this.create(this.#resolve())
    const content = contentOf(this, this.contentTag)
    const template = templateOf(content)

    const measured: Array<[VirtualItem, HTMLElement]> = []

    const renderItem = (item: VirtualItem, element?: HTMLElement) => {
      const next = reuse(element, template, this.itemTag, String(item.index))

      const target = asChild(next.element) ?? next.element

      if (next.fresh) {
        this.renderItem?.(target, item)
        if (next.element.hasAttribute('measure')) measured.push([item, target])
      }

      spreadVirtualizerProps(target, {
        ...(target.localName === this.itemTag ? virtualizer.getItemAriaAttrs(item.index) : {}),
        style: virtualizer.getItemStyle(item),
      })

      return next.element
    }

    const render = () => {
      this.style.setProperty('--total-size', `${virtualizer.getTotalSize()}px`)
      spreadVirtualizerProps(content, { style: virtualizer.getContentStyle() })
      renderVirtualItems(content, virtualizer.getVirtualItems(), (item) => item.key, renderItem)

      for (const [item, element] of measured.splice(0)) item.measureElement(element)
    }

    spreadVirtualizerProps(this, {
      ...(composed(this) ? {} : virtualizer.getContainerAriaAttrs()),
      style: virtualizer.getContainerStyle(),
    })

    this.#virtualizer = virtualizer
    const unsubscribe = virtualizer.subscribe(render)
    const frame = requestAnimationFrame(() => {
      virtualizer.attach(this)
      render()
    })

    this.#cleanup = () => {
      cancelAnimationFrame(frame)
      unsubscribe?.()
      virtualizer.destroy()
    }
  }

  disconnectedCallback() {
    this.#cleanup?.()
    this.#cleanup = undefined
    this.#virtualizer = undefined
  }

  attributeChangedCallback() {
    this.#update()
  }

  #update() {
    this.#virtualizer?.updateOptions(this.#resolve())
  }

  /** Re-runs `renderItem` for every rendered item, e.g. after the data behind them changed. */
  refresh() {
    for (const element of this.querySelectorAll<HTMLElement>(`:scope > ${this.contentTag} > [data-index]`)) {
      delete element.dataset.index
    }

    this.#update()
  }
}
