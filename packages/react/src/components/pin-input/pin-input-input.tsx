'use client'

import type { InputProps, InputState } from '@zag-js/pin-input'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePinInputContext } from './use-pin-input-context.ts'

export interface PinInputInputState extends InputState {}

export interface PinInputInputBaseProps extends InputProps, PolymorphicProps<PinInputInputState> {}
export interface PinInputInputProps extends HTMLProps<'input'>, PinInputInputBaseProps {}

const splitInputProps = createSplitProps<InputProps>()

export const PinInputInput = forwardRef<HTMLInputElement, PinInputInputProps>((props, ref) => {
  const [inputProps, localProps] = splitInputProps(props, ['index'])
  const pinInput = usePinInputContext()
  const mergedProps = mergeProps(pinInput.getInputProps(inputProps), localProps)

  return <ark.input {...mergedProps} ref={ref} state={pinInput.getInputState(inputProps)} />
})

PinInputInput.displayName = 'PinInputInput'
