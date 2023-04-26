/* eslint-disable @typescript-eslint/no-explicit-any */

import { forwardRef as __forwardRef } from 'react'
import type { HTMLArkProps } from './factory'
import type { Assign } from './types'

export function forwardRef<
  T extends React.ElementType,
  P extends Record<never, never> = Record<never, never>,
>(
  component: React.ForwardRefRenderFunction<
    any,
    Assign<React.ComponentPropsWithoutRef<T>, P & { asChild?: boolean }>
  >,
) {
  return __forwardRef(component) as unknown as React.FC<HTMLArkProps<T, P>>
}
