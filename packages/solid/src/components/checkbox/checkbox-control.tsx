import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxControlBaseProps extends PolymorphicProps<'div'> {}
export interface CheckboxControlProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    CheckboxControlBaseProps {}

export const CheckboxControl = (props: CheckboxControlProps) => {
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(() => checkbox().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
