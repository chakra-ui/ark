const label = (el: HTMLElement) => (el.id ? `${el.localName}#${el.id}` : el.localName)

/** Logging is on while the element or an ancestor has the `debug` attribute. */
export const debugging = (el: HTMLElement) => el.isConnected && el.closest('[debug]') != null

export function debug(el: HTMLElement, message: string, ...data: unknown[]) {
  if (!debugging(el)) return
  console.debug(`[ark] ${label(el)} ${message}`, ...data)
}

export function traceState(el: HTMLElement, read: () => unknown) {
  let previous = read()

  return () => {
    const next = read()
    if (Object.is(next, previous)) return

    debug(el, `state ${String(previous)} → ${String(next)}`)
    previous = next
  }
}
