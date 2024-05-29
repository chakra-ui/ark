let count = 0

export const useId = (id?: string | null | undefined, prefix = 'ark') =>
  id ? id : `${prefix}-${count++}`
