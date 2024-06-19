import type { InputProps } from '@zag-js/pin-input'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

export interface PinInputInputBaseProps extends InputProps, PolymorphicProps {}
export interface PinInputInputProps extends HTMLProps<'input'>, PinInputInputBaseProps {}

export const PinInputInput = forwardRef<HTMLInputElement, PinInputInputProps>((props, ref) => {
  const [inputProps, localProps] = createSplitProps<InputProps>()(props, ['index'])
  const pinInput = usePinInputContext()
  const mergedProps = mergeProps(pinInput.getInputProps(inputProps), localProps)

  return <ark.input {...mergedProps} ref={ref} />
})

PinInputInput.displayName = 'PinInputInput'
