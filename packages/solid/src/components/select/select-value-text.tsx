import { selectAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectValueTextBaseProps extends PolymorphicProps<'span'> {
  /**
   * Text to display when no value is selected.
   */
  placeholder?: string
}
export interface SelectValueTextProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    SelectValueTextBaseProps {}

export const SelectValueText = (props: SelectValueTextProps) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(() => selectAnatomy.build().valueText.attrs, props)

  return <ark.span {...mergedProps}>{select().valueAsString || props.placeholder}</ark.span>
}
