let counter = 0

export const createArkId = (prefix: string): string => {
  counter += 1
  return `${prefix}::${counter}`
}
