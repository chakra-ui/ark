export type InputSource = 'keyboard' | 'mouse' | 'touch' | 'pen' | 'programmatic'

let modality: InputSource | undefined
let resetTimer: ReturnType<typeof setTimeout> | undefined

const trackedDocuments = new WeakSet<Document>()
const silenced = new Set<HTMLElement>()

const inputEvents = ['pointerdown', 'pointermove', 'pointerup', 'click', 'keydown', 'keyup', 'wheel']

const pointerSource = (event: PointerEvent): InputSource | undefined => {
  const type = event.pointerType
  return type === 'mouse' || type === 'touch' || type === 'pen' ? type : undefined
}

function sourceOf(event: Event): InputSource | undefined {
  if (event.type.startsWith('key')) return 'keyboard'
  if (event.type === 'wheel') return 'mouse'
  return event instanceof PointerEvent ? pointerSource(event) : undefined
}

function recordInput(event: Event) {
  if (!event.isTrusted) return
  silenced.clear()

  const source = sourceOf(event)
  if (!source) return

  modality = source
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => (modality = undefined))
}

export function trackInput(doc: Document) {
  if (trackedDocuments.has(doc)) return
  trackedDocuments.add(doc)

  for (const type of inputEvents) doc.addEventListener(type, recordInput, { capture: true, passive: true })
}

export function silently(element: HTMLElement, write: VoidFunction) {
  silenced.add(element)
  write()
  setTimeout(() => silenced.delete(element))
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  value != null && Object.getPrototypeOf(value) === Object.prototype

const withSource = (detail: unknown) =>
  isPlainObject(detail) ? { ...detail, source: modality ?? 'programmatic' } : detail

/** Notify observers without letting a nested component impersonate its owner. */
export function emit<Detail>(element: HTMLElement, type: string, detail?: Detail): void {
  if (silenced.has(element)) return

  const original = detail instanceof Event ? detail : undefined
  const cancel = (detail as { cancel?: VoidFunction } | undefined)?.cancel
  const event = new CustomEvent(type, {
    detail: withSource(detail),
    bubbles: false,
    composed: true,
    cancelable: original?.cancelable || typeof cancel === 'function',
  })

  if (!element.dispatchEvent(event)) {
    original?.preventDefault()
    cancel?.()
  }
}

type Callback = (...args: any[]) => any

/** Functions consumed by a machine, including predicates whose names start with `on`. */
export type FunctionProperties<Props> = Pick<
  Props,
  {
    [Key in keyof Props]-?: Key extends 'getRootNode'
      ? never
      : NonNullable<Props[Key]> extends Callback
        ? Key extends `on${string}`
          ? ReturnType<Extract<NonNullable<Props[Key]>, Callback>> extends void
            ? never
            : Key
          : Key
        : never
  }[keyof Props]
>

export type DetailKey<Name extends string> = Name extends `on${infer Rest}Change`
  ? Uncapitalize<Rest>
  : Name extends `on${infer Rest}`
    ? Uncapitalize<Rest>
    : Name

export type EventDetail<Name extends string, Param> = [Param] extends [Event]
  ? Param
  : [Param] extends [undefined]
    ? Param
    : [Param] extends [object]
      ? Param & { source: InputSource }
      : { [Key in DetailKey<Name>]: Param } & { source: InputSource }

export type CallbackEvents<Props> = {
  [
    Key in keyof Props as Key extends `on${infer Name}`
      ? NonNullable<Props[Key]> extends Callback
        ? ReturnType<Extract<NonNullable<Props[Key]>, Callback>> extends void
          ? Name extends 'Select'
            ? 'itemselect'
            : Lowercase<Name>
          : never
        : never
      : never
  ]-?: NonNullable<Props[Key]> extends Callback
    ? CustomEvent<EventDetail<Key & string, Parameters<Extract<NonNullable<Props[Key]>, Callback>>[0]>>
    : never
}

/** Native DOM listeners with component-specific CustomEvent payloads. */
export interface EventElement<Events extends object = {}> extends HTMLElement {
  addEventListener<Key extends keyof Events & string>(
    type: Key,
    listener: (event: Events[Key]) => void,
    options?: boolean | AddEventListenerOptions,
  ): void
  addEventListener<Key extends keyof HTMLElementEventMap>(
    type: Key,
    listener: (this: HTMLElement, event: HTMLElementEventMap[Key]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ): void
  removeEventListener<Key extends keyof Events & string>(
    type: Key,
    listener: (event: Events[Key]) => void,
    options?: boolean | EventListenerOptions,
  ): void
  removeEventListener<Key extends keyof HTMLElementEventMap>(
    type: Key,
    listener: (this: HTMLElement, event: HTMLElementEventMap[Key]) => any,
    options?: boolean | EventListenerOptions,
  ): void
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | EventListenerOptions,
  ): void
}
