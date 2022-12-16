export interface Part {
  selector: string
}

export type Parts = Record<string, Part>

// TODO replace when panda updates
export function defineParts<T extends Parts>(parts: T) {
  return function (config: Partial<Record<keyof T, any>>) {
    return Object.fromEntries(
      Object.entries(config).map(([key, value]) => [parts[key].selector, value]),
    )
  }
}
