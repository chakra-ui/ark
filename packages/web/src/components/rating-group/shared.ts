export const root = 'ark-rating-group'

export const itemTag = 'ark-rating-group-item'

export const indexOf = (part: HTMLElement) => Number(part.closest(itemTag)?.getAttribute('index') ?? 0)
