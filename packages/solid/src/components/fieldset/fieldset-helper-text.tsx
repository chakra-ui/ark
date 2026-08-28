import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldsetContext } from './use-fieldset-context.ts'

export interface FieldsetHelperTextBaseProps extends PolymorphicProps<'span'> {}
export interface FieldsetHelperTextProps extends HTMLProps<'span'>, FieldsetHelperTextBaseProps {}

export const FieldsetHelperText = (props: FieldsetHelperTextProps) => {
  const fieldset = useFieldsetContext()
  const mergedProps = mergeProps(() => fieldset().getHelperTextProps(), props)

  return <ark.span {...mergedProps} />
}
