import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectClearTriggerProps extends HTMLArkProps<'button'> {}

export const SelectClearTrigger = (props: SelectClearTriggerProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getClearTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
