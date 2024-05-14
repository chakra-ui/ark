import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectControlProps extends HTMLArkProps<'div'> {}

export const SelectControl = (props: SelectControlProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().controlProps, props)

  return <ark.div {...mergedProps} />
}
