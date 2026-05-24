import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useSelectContext } from './use-select-context.ts'

export interface SelectValueTextBaseProps extends PolymorphicProps<'span'> {
  /**
   * Text to display when no value is selected.
   */
  placeholder?: string
}
export interface SelectValueTextProps extends HTMLProps<'span'>, SelectValueTextBaseProps {}

export const SelectValueText = (props: SelectValueTextProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getValueTextProps(), props)

  return <ark.span {...mergedProps}>{select().valueAsString || props.placeholder}</ark.span>
}
