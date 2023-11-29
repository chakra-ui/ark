import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { SwitchProvider } from './switch-context'
import { useSwitch, type UseSwitchProps, type UseSwitchReturn } from './use-switch'

export interface SwitchProps
  extends Assign<
    Assign<HTMLArkProps<'label'>, { children?: ReactNode | ((api: UseSwitchReturn) => ReactNode) }>,
    UseSwitchProps
  > {}

export const Switch = forwardRef<HTMLLabelElement, SwitchProps>((props, ref) => {
  const [switchProps, { children, ...localProps }] = createSplitProps<UseSwitchProps>()(props, [
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

  const api = useSwitch(switchProps)
  const mergedProps = mergeProps(api.rootProps, localProps)

  const view = runIfFn(children, api)

  return (
    <SwitchProvider value={api}>
      <ark.label {...mergedProps} ref={ref}>
        {view}
      </ark.label>
    </SwitchProvider>
  )
})

Switch.displayName = 'Switch'
