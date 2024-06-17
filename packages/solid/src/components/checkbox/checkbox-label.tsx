import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxLabelBaseProps extends PolymorphicProps<'span'> {}
export interface CheckboxLabelProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    CheckboxLabelBaseProps {}

export const CheckboxLabel = (props: CheckboxLabelProps) => {
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(() => checkbox().getLabelProps(), props)

  return <ark.span {...mergedProps} />
}
