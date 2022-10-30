export function filterUndefinedEntries<T>(target: T) {
  if (!target || typeof target !== 'object') {
    return target
  }

  return Object.fromEntries(
    Object.entries(target).filter(([, value]) => typeof value !== 'undefined'),
  ) as T
}
