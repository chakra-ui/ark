import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { SwitchProvider, type SwitchContext } from './switch-context'
import { useSwitch, type UseSwitchProps } from './use-switch'

export type SwitchProps = Assign<
  HTMLArkProps<'label'>,
  UseSwitchProps & {
    children?: JSX.Element | ((context: SwitchContext) => JSX.Element)
  }
>

export const Switch = (props: SwitchProps) => {
  const [switchProps, labelProps] = createSplitProps<UseSwitchProps>()(props, [
    'checked',
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
  const mergedProps = mergeProps(() => api().rootProps, labelProps)
  const getChildren = () => runIfFn(props.children, api)

  return (
    <SwitchProvider value={api}>
      <ark.label {...mergedProps}>{getChildren()}</ark.label>
    </SwitchProvider>
  )
}
