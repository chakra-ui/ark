'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePinInputContext } from './use-pin-input-context.ts'
import type { RootState } from '@zag-js/pin-input'

export interface PinInputLabelState extends RootState {}

export interface PinInputLabelBaseProps extends PolymorphicProps<PinInputLabelState> {}
export interface PinInputLabelProps extends HTMLProps<'label'>, PinInputLabelBaseProps {}

export const PinInputLabel = forwardRef<HTMLLabelElement, PinInputLabelProps>((props, ref) => {
  const pinInput = usePinInputContext()
  const mergedProps = mergeProps(pinInput.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} state={pinInput.getRootState()} />
})

PinInputLabel.displayName = 'PinInputLabel'
