/** Notify observers without letting a nested component impersonate its owner. */
export function emit<Detail>(element: HTMLElement, type: string, detail?: Detail): void {
  const original = detail instanceof Event ? detail : undefined
  const cancel = (detail as { cancel?: VoidFunction } | undefined)?.cancel
  const event = new CustomEvent(type, {
    detail,
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
    ? CustomEvent<Parameters<Extract<NonNullable<Props[Key]>, Callback>>[0]>
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
