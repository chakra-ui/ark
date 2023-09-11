import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioControlProps = HTMLArkProps<'div'>

export const RadioControl = forwardRef<HTMLDivElement, RadioControlProps>((props, ref) => {
  const api = useRadioGroupContext()
  const radioProps = useRadioContext()
  const mergedProps = mergeProps(api.getRadioControlProps(radioProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

RadioControl.displayName = 'RadioControl'
