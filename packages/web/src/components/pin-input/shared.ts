export const root = 'ark-pin-input'

export const inputTag = 'ark-pin-input-input'

export const inputsOf = (el: Element) => Array.from(el.querySelectorAll<HTMLElement>(inputTag))
