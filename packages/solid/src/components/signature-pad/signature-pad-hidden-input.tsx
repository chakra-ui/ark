import type { HiddenInputProps } from '@zag-js/signature-pad'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldContext } from '../field/index.tsx'
import { useSignaturePadContext } from './use-signature-pad-context.ts'

export interface SignaturePadHiddenInputBaseProps extends HiddenInputProps, PolymorphicProps<'input'> {}
export interface SignaturePadHiddenInputProps extends Assign<HTMLProps<'input'>, SignaturePadHiddenInputBaseProps> {}

export const SignaturePadHiddenInput = (props: SignaturePadHiddenInputProps) => {
  const [hiddenInputProps, localProps] = createSplitProps<HiddenInputProps>()(props, ['value'])
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(() => signaturePad().getHiddenInputProps(hiddenInputProps), localProps)
  const field = useFieldContext()

  return <ark.input aria-describedby={field?.().ariaDescribedby} {...mergedProps} />
}
