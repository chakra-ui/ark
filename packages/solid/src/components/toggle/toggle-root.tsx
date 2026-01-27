import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseToggleProps, useToggle } from './use-toggle'
import { ToggleProvider } from './use-toggle-context'

export interface ToggleRootBaseProps extends UseToggleProps, PolymorphicProps<'button'> {}

export interface ToggleRootProps extends HTMLProps<'button'>, ToggleRootBaseProps {}

export const ToggleRoot = (props: ToggleRootProps) => {
  const [useToggleProps, localProps] = createSplitProps<UseToggleProps>()(props, [
    'pressed',
    'defaultPressed',
    'disabled',
    'onPressedChange',
  ])

  const toggle = useToggle(useToggleProps)
  const mergedProps = mergeProps(() => toggle().getRootProps(), localProps)

  return (
    <ToggleProvider value={toggle}>
      <ark.button {...mergedProps} />
    </ToggleProvider>
  )
}
