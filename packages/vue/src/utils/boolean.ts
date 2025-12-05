export type Booleanish = boolean | 'true' | 'false'

export const toBooleanValue = (value: Booleanish | undefined) => {
  return typeof value === 'boolean' ? value : value === 'true'
}
