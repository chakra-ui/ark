/* eslint-disable @typescript-eslint/no-explicit-any */

import { forwardRef as __forwardRef } from 'react'
import type { ComponentPropsWithAsChild } from './factory'

type Pretty<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never

type Assign<T, U> = Pretty<DistributiveOmit<T, keyof U> & U>

export function forwardRef<
  T extends React.ElementType,
  P extends Record<never, never> = Record<never, never>,
>(
  component: React.ForwardRefRenderFunction<
    any,
    Assign<React.ComponentPropsWithoutRef<T>, P & { asChild?: boolean }>
  >,
) {
  return __forwardRef(component) as unknown as React.FC<Assign<ComponentPropsWithAsChild<T>, P>>
}
