export const callAll =
  <Args extends unknown[]>(...fns: ((...args: Args) => unknown)[]) =>
  (...args: Args): VoidFunction => {
    const cleanups = fns.map((fn) => fn?.(...args))
    return () => {
      for (const cleanup of cleanups) {
        typeof cleanup === 'function' && cleanup?.()
      }
    }
  }
