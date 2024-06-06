import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseSwitchProps, useSwitch } from './use-switch'
import { SwitchProvider } from './use-switch-context'

export interface SwitchRootProps extends Assign<HTMLArkProps<'label'>, UseSwitchProps> {}

export const SwitchRoot = forwardRef<HTMLLabelElement, SwitchRootProps>((props, ref) => {
  const [switchProps, localProps] = createSplitProps<UseSwitchProps>()(props, [
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

  const switchContext = useSwitch(switchProps)
  const mergedProps = mergeProps(switchContext.getRootProps(), localProps)

  return (
    <SwitchProvider value={switchContext}>
      <ark.label {...mergedProps} ref={ref} />
    </SwitchProvider>
  )
})

SwitchRoot.displayName = 'SwitchRoot'
