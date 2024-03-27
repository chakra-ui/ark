import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { SwitchProvider } from './switch-context'
import { useSwitch, type UseSwitchProps, type UseSwitchReturn } from './use-switch'

interface ElementProps extends UseSwitchProps {
  children?: JSX.Element | ((api: UseSwitchReturn) => JSX.Element)
}

export interface SwitchRootProps extends Assign<HTMLArkProps<'label'>, ElementProps> {}

export const SwitchRoot = (props: SwitchRootProps) => {
  const [switchProps, localProps] = createSplitProps<UseSwitchProps>()(props, [
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
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  const getChildren = () => runIfFn(props.children, api)

  return (
    <SwitchProvider value={api}>
      <ark.label {...mergedProps}>{getChildren()}</ark.label>
    </SwitchProvider>
  )
}
