import { forwardRef as __forwardRef } from 'react'

type Pretty<T> = T extends infer U ? { [K in keyof U]: U[K] } : never
type Assign<T, U> = Pretty<T & Omit<U, keyof T>>

export function forwardRef<
  T extends React.ElementType,
  P extends Record<never, never> = Record<never, never>,
>(
  component: React.ForwardRefRenderFunction<
    never,
    Assign<React.ComponentPropsWithoutRef<T>, P & { asChild?: boolean }>
  >,
) {
  return __forwardRef(component)
}
