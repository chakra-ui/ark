import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useToggleGroupContext } from './toggle-group-context'

// TODO export from zag.js
type _ToggleProps = {
  value: string
  disabled?: boolean
}

export type ToggleProps = Assign<HTMLArkProps<'button'>, _ToggleProps>

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>((props, ref) => {
  const [toggleProps, localProps] = createSplitProps<_ToggleProps>()(props, ['value', 'disabled'])
  const api = useToggleGroupContext()
  const mergedProps = mergeProps(api.getToggleProps(toggleProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

Toggle.displayName = 'Toggle'
