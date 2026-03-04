import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectValueTextBaseProps extends PolymorphicProps<'span'> {
  /**
   * Text to display when no value is selected.
   */
  placeholder?: string
}
export interface CascadeSelectValueTextProps extends HTMLProps<'span'>, CascadeSelectValueTextBaseProps {}

export const CascadeSelectValueText = (props: CascadeSelectValueTextProps) => {
  const context = useCascadeSelectContext()
  const mergedProps = mergeProps(() => context().getValueTextProps(), props)

  return <ark.span {...mergedProps}>{context().valueAsString || props.placeholder}</ark.span>
}
