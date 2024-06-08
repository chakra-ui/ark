import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectIndicatorProps extends HTMLArkProps<'div'> {}

export const SelectIndicator = (props: SelectIndicatorProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getIndicatorProps(), props)

  return <ark.div {...mergedProps} />
}
