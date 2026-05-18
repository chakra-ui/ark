import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useRadioGroupContext } from './use-radio-group-context.ts'

export interface RadioGroupIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface RadioGroupIndicatorProps extends HTMLProps<'div'>, RadioGroupIndicatorBaseProps {}

export const RadioGroupIndicator = (props: RadioGroupIndicatorProps) => {
  const radioGroup = useRadioGroupContext()
  const mergedProps = mergeProps(() => radioGroup().getIndicatorProps(), props)

  return <ark.div {...mergedProps} />
}
