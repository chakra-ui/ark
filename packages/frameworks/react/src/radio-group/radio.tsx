import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { RadioProvider, type RadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioProps = Assign<HTMLArkProps<'label'>, RadioContext>

export const Radio = forwardRef<HTMLLabelElement, RadioProps>((props, ref) => {
  const [radioProps, localProps] = createSplitProps<RadioContext>()(props, [
    'value',
    'disabled',
    'invalid',
  ])
  const api = useRadioGroupContext()
  const mergedProps = mergeProps(api.getRadioProps(radioProps), localProps)

  return (
    <RadioProvider value={props}>
      <ark.label {...mergedProps} ref={ref} />
      <input {...api.getRadioHiddenInputProps(radioProps)} />
    </RadioProvider>
  )
})

Radio.displayName = 'Radio'
