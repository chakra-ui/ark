import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSwitch, type UseSwitchProps } from './use-switch'
import { SwitchProvider } from './use-switch-context'

export interface SwitchRootProps extends Assign<HTMLArkProps<'label'>, UseSwitchProps> {}

export const SwitchRoot = forwardRef<HTMLLabelElement, SwitchRootProps>((props, ref) => {
  const [switchProps, localProps] = createSplitProps<UseSwitchProps>()(props, [
    'checked',
    'defaultChecked',
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'id',
    'ids',
    'invalid',
    'label',
    'name',
    'onCheckedChange',
    'required',
    'value',
  ])

  const switchContext = useSwitch(switchProps)
  const mergedProps = mergeProps(switchContext.rootProps, localProps)

  return (
    <SwitchProvider value={switchContext}>
      <ark.label {...mergedProps} ref={ref} />
    </SwitchProvider>
  )
})

SwitchRoot.displayName = 'SwitchRoot'
