import React from 'react'
import type { AsChildComponentProps, AsChildProps } from './factory'
import type { Assign } from './types'

export function forwardRef<
  E extends React.ElementType,
  P extends Record<never, never> = Record<never, never>,
>(
  component: React.ForwardRefRenderFunction<
    React.ElementRef<E>,
    Assign<React.ComponentPropsWithoutRef<E>, P & AsChildProps>
  >,
) {
  return React.forwardRef(component) as unknown as React.ForwardRefExoticComponent<
    Assign<AsChildComponentProps<E>, P>
  >
}
