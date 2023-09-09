import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useToggle, type UseToggleProps } from './use-toggle'

export type ToggleProps = Assign<HTMLArkProps<'button'>, UseToggleProps>

export const Toggle = (props: ToggleProps) => {
  const [toggleParams, restProps] = createSplitProps<UseToggleProps>()(props, [
    'aria-label',
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'onChange',
    'pressed',
  ])

  const api = useToggle(toggleParams)
  const buttonProps = mergeProps(() => api().buttonProps, restProps)

  return <ark.button {...buttonProps} />
}
