import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import type { HTMLProps, PolymorphicProps } from '../factory'
import { ark } from '../factory'
import { type UseToggleProps, useToggle } from './use-toggle'
import { ToggleProvider } from './use-toggle-context'

export interface ToggleRootBaseProps extends UseToggleProps, PolymorphicProps {}

export interface ToggleRootProps extends HTMLProps<'button'>, ToggleRootBaseProps {}

export const ToggleRoot = forwardRef<HTMLButtonElement, ToggleRootProps>((props, ref) => {
  const [useToggleProps, localProps] = createSplitProps<UseToggleProps>()(props, [
    'pressed',
    'defaultPressed',
    'disabled',
    'onPressedChange',
  ])

  const toggle = useToggle(useToggleProps)
  const mergedProps = mergeProps(toggle.getRootProps(), localProps)

  return (
    <ToggleProvider value={toggle}>
      <ark.button {...mergedProps} ref={ref} />
    </ToggleProvider>
  )
})

ToggleRoot.displayName = 'ToggleRoot'
