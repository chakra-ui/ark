export function runIfFn<T, U, FunctionType extends (...fnArgs: U[]) => T = (...fnArgs: U[]) => T>(
  valueOrFn: T | FunctionType,
  ...args: U[]
): T {
  return typeof valueOrFn === 'function' ? (valueOrFn as FunctionType)(...args) : valueOrFn
}
