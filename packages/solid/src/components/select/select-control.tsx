import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectControlBaseProps extends PolymorphicProps<'div'> {}
export interface SelectControlProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    SelectControlBaseProps {}

export const SelectControl = (props: SelectControlProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
