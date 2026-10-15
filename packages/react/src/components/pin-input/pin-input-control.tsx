'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFieldContext } from '../field/use-field-context.ts'
import { usePinInputContext } from './use-pin-input-context.ts'

export interface PinInputControlBaseProps extends PolymorphicProps {}
export interface PinInputControlProps extends HTMLProps<'div'>, PinInputControlBaseProps {}

export const PinInputControl = forwardRef<HTMLDivElement, PinInputControlProps>((props, ref) => {
  const pinInput = usePinInputContext()
  const mergedProps = mergeProps(pinInput.getControlProps(), props)
  const field = useFieldContext()

  return (
    <ark.div
      role="group"
      aria-labelledby={field?.ids.label}
      aria-describedby={field?.ariaDescribedby}
      {...mergedProps}
      ref={ref}
    />
  )
})

PinInputControl.displayName = 'PinInputControl'
