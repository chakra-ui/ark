'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UsePinInputProps, usePinInput } from './use-pin-input.ts'
import { PinInputProvider } from './use-pin-input-context.ts'

export interface PinInputRootBaseProps extends UsePinInputProps, PolymorphicProps {}
export interface PinInputRootProps extends Assign<HTMLProps<'div'>, PinInputRootBaseProps> {}

const splitRootProps = createSplitProps<UsePinInputProps>()

export const PinInputRoot = forwardRef<HTMLDivElement, PinInputRootProps>((props, ref) => {
  const [usePinInputProps, localProps] = splitRootProps(props, [
    'autoFocus',
    'autoSubmit',
    'blurOnComplete',
    'count',
    'defaultValue',
    'disabled',
    'form',
    'id',
    'ids',
    'invalid',
    'mask',
    'name',
    'onValueChange',
    'onValueComplete',
    'onValueInvalid',
    'otp',
    'pattern',
    'placeholder',
    'readOnly',
    'required',
    'sanitizeValue',
    'selectOnFocus',
    'translations',
    'type',
    'value',
  ])
  const pinInput = usePinInput(usePinInputProps)
  const mergedProps = mergeProps(pinInput.getRootProps(), localProps)

  return (
    <PinInputProvider value={pinInput}>
      <ark.div {...mergedProps} ref={ref} />
    </PinInputProvider>
  )
})

PinInputRoot.displayName = 'PinInputRoot'
