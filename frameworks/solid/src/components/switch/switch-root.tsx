import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseSwitchProps, useSwitch } from './use-switch'
import { SwitchProvider } from './use-switch-context'

export interface SwitchRootProps extends Assign<HTMLArkProps<'label'>, UseSwitchProps> {}

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

  return (
    <SwitchProvider value={api}>
      <ark.label {...mergedProps} />
    </SwitchProvider>
  )
}
