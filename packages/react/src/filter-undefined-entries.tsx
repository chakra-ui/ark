export function filterUndefinedEntries(target: Record<string, unknown>) {
  if (!target || typeof target !== 'object') {
    return target
  }

  return Object.fromEntries(
    Object.entries(target).filter(([, value]) => typeof value !== 'undefined'),
  )
}
