import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputControlBaseProps extends PolymorphicProps<'div'> {}
export interface NumberInputControlProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    NumberInputControlBaseProps {}

export const NumberInputControl = (props: NumberInputControlProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
