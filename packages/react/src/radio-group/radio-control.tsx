import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioControlProps = ComponentPropsWithoutRef<typeof ark.div>

export const RadioControl = forwardRef<HTMLDivElement, RadioControlProps>((props, ref) => {
  const api = useRadioGroupContext()
  const radioProps = useRadioContext()
  const mergedProps = mergeProps(api.getRadioControlProps(radioProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

RadioControl.displayName = 'RadioControl'
