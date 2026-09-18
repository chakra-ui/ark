import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface CascadeSelectHiddenInputProps extends HTMLProps<'input'>, CascadeSelectHiddenInputBaseProps {}

export const CascadeSelectHiddenInput = (props: CascadeSelectHiddenInputProps) => {
  const context = useCascadeSelectContext()
  const mergedProps = mergeProps(() => context().getHiddenInputProps(), props)
  return <ark.input {...mergedProps} />
}
