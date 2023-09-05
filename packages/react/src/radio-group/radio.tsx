import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import type { Assign } from '../types'
import { RadioProvider, type RadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioProps = Assign<ComponentPropsWithoutRef<typeof ark.label>, RadioContext>

export const Radio = forwardRef<HTMLLabelElement, RadioProps>((props, ref) => {
  const [radioProps, divProps] = createSplitProps<RadioContext>()(props, [
    'value',
    'disabled',
    'invalid',
  ])
  const api = useRadioGroupContext()
  const mergedProps = mergeProps(api.getRadioProps(radioProps), divProps)

  return (
    <RadioProvider value={props}>
      <ark.label {...mergedProps} ref={ref} />
    </RadioProvider>
  )
})

Radio.displayName = 'Radio'
