import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'

export interface RadioGroupIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface RadioGroupIndicatorProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    RadioGroupIndicatorBaseProps {}

export const RadioGroupIndicator = (props: RadioGroupIndicatorProps) => {
  const radioGroup = useRadioGroupContext()
  const mergedProps = mergeProps(() => radioGroup().getIndicatorProps(), props)

  return <ark.div {...mergedProps} />
}
