import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface SelectIndicatorProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    SelectIndicatorBaseProps {}

export const SelectIndicator = (props: SelectIndicatorProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getIndicatorProps(), props)

  return <ark.div {...mergedProps} />
}
