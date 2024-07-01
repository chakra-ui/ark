import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputValueTextBaseProps extends PolymorphicProps<'span'> {}
export interface NumberInputValueTextProps
  extends HTMLProps<'span'>,
    NumberInputValueTextBaseProps {}

export const NumberInputValueText = (props: NumberInputValueTextProps) => {
  const numberInput = useNumberInputContext()
  const mergedProps = mergeProps(() => numberInput().getValueTextProps(), props)

  return <ark.span {...mergedProps} />
}
