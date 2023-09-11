import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { SwitchProvider } from './switch-context'
import { useSwitch, type UseSwitchProps, type UseSwitchReturn } from './use-switch'

export type SwitchProps = Assign<
  Assign<HTMLArkProps<'label'>, UseSwitchProps>,
  {
    children?: ReactNode | ((pages: UseSwitchReturn) => ReactNode)
  }
>

export const Switch = forwardRef<HTMLLabelElement, SwitchProps>((props, ref) => {
  const [switchProps, { children, ...labelProps }] = createSplitProps<UseSwitchProps>()(props, [
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
    'onChange',
    'readOnly',
    'required',
    'value',
  ])
  const api = useSwitch(switchProps)
  const view = runIfFn(children, api)
  const mergedProps = mergeProps(api.rootProps, labelProps)

  return (
    <SwitchProvider value={api}>
      <ark.label {...mergedProps} ref={ref}>
        {view}
      </ark.label>
      <input {...api.hiddenInputProps} />
    </SwitchProvider>
  )
})

Switch.displayName = 'Switch'
