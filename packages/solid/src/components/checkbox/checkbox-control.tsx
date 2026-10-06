import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useCheckboxContext } from './use-checkbox-context.ts'

export interface CheckboxControlBaseProps extends PolymorphicProps<'span'> {}
export interface CheckboxControlProps extends HTMLProps<'span'>, CheckboxControlBaseProps {}

export const CheckboxControl = (props: CheckboxControlProps) => {
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(() => checkbox().getControlProps(), props)

  return <ark.span {...mergedProps} />
}
