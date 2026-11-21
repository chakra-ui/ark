export const root = 'ark-collapsible'

export const size = (value: string | null) =>
  value == null ? undefined : /^\d+(\.\d+)?$/.test(value) ? Number(value) : value
