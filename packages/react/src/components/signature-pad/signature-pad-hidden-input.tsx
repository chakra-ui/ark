'use client'

import { mergeProps } from '@zag-js/react'
import type { HiddenInputProps } from '@zag-js/signature-pad'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFieldContext } from '../field/index.ts'
import { useSignaturePadContext } from './use-signature-pad-context.ts'

export interface SignaturePadHiddenInputBaseProps extends HiddenInputProps, PolymorphicProps {}
export interface SignaturePadHiddenInputProps extends Assign<HTMLProps<'input'>, SignaturePadHiddenInputBaseProps> {}

const splitHiddenInputProps = createSplitProps<HiddenInputProps>()

export const SignaturePadHiddenInput = forwardRef<HTMLInputElement, SignaturePadHiddenInputProps>((props, ref) => {
  const [hiddenInputProps, localProps] = splitHiddenInputProps(props, ['value'])
  const signaturePad = useSignaturePadContext()
  const mergedProps = mergeProps(signaturePad.getHiddenInputProps(hiddenInputProps), localProps)
  const field = useFieldContext()

  return <ark.input aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
})

SignaturePadHiddenInput.displayName = 'SignaturePadHiddenInput'
