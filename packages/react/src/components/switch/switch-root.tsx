import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseSwitchProps, useSwitch } from './use-switch'
import { SwitchProvider } from './use-switch-context'

export interface SwitchRootBaseProps extends UseSwitchProps, PolymorphicProps {}
export interface SwitchRootProps extends HTMLProps<'label'>, SwitchRootBaseProps {}

const splitRootProps = createSplitProps<UseSwitchProps>()

export const SwitchRoot = forwardRef<HTMLLabelElement, SwitchRootProps>((props, ref) => {
  const [useSwitchProps, localProps] = splitRootProps(props, [
    'checked',
    'defaultChecked',
    'disabled',
    'form',
    'id',
    'ids',
    'invalid',
    'label',
    'name',
    'onCheckedChange',
    'readOnly',
    'required',
    'value',
  ])

  const switchContext = useSwitch(useSwitchProps)
  const mergedProps = mergeProps(switchContext.getRootProps(), localProps)

  return (
    <SwitchProvider value={switchContext}>
      <ark.label {...mergedProps} ref={ref} />
    </SwitchProvider>
  )
})

SwitchRoot.displayName = 'SwitchRoot'
