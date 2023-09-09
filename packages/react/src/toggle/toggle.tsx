import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { type Assign } from '../types'
import { useToggle, type UseToggleProps } from './use-toggle'

export type ToggleProps = Assign<ComponentPropsWithoutRef<typeof ark.button>, UseToggleProps>

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>((props, ref) => {
  const [useToggleProps, divProps] = createSplitProps<UseToggleProps>()(props, [
    'aria-label',
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'onChange',
    'pressed',
  ])
  const api = useToggle(useToggleProps)
  const mergedProps = mergeProps(api.buttonProps, divProps)

  return <ark.button {...mergedProps} ref={ref} />
})

Toggle.displayName = 'Toggle'
