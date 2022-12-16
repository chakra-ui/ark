export type Part = {
  selector: string
  attrs: Record<'data-scope' | 'data-part', string>
}

export type Anatomy<T extends string> = {
  parts: <U extends string>(...parts: U[]) => Omit<Anatomy<U>, 'parts'>
  extendWith: <V extends string>(...parts: V[]) => Omit<Anatomy<T | V>, 'parts'>
  build: () => Record<T, Part>
}

// TODO replace when zag updates
export const createAnatomy = <T extends string>(name: string, parts = [] as T[]): Anatomy<T> => ({
  parts: <U extends string>(...values: U[]): Omit<Anatomy<U>, 'parts'> => {
    if (isEmpty(parts)) {
      return createAnatomy(name, values)
    }
    throw new Error(
      'createAnatomy().parts(...) should only be called once. Did you mean to use .extend(...) ?',
    )
  },
  extendWith: <V extends string>(...values: V[]): Omit<Anatomy<T | V>, 'parts'> =>
    createAnatomy(name, [...parts, ...values]),
  build: () =>
    [...new Set(parts)].reduce<Record<string, Part>>(
      (prev, part) =>
        Object.assign(prev, {
          [part]: {
            selector: `&[data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(
              part,
            )}"], & [data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`,
            attrs: { 'data-scope': toKebabCase(name), 'data-part': toKebabCase(part) },
          },
        }),
      {},
    ),
})

const toKebabCase = (value: string) =>
  value
    .replace(/([A-Z])([A-Z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()

const isEmpty = <T>(v: T[]): boolean => v.length === 0
