import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioControlProps = HTMLArkProps<'div'>

export const RadioControl = forwardRef<'div'>((props, ref) => {
  const { getRadioControlProps } = useRadioGroupContext()
  const context = useRadioContext()
  const mergedProps = mergeProps(getRadioControlProps(context), props)

  return <ark.div {...mergedProps} ref={ref} />
})
