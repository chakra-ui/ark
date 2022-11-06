import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioControlProps = HTMLArkProps<'div'>

export const RadioControl = forwardRef<'div', RadioControlProps>((props, ref) => {
  const { getItemControlProps } = useRadioGroupContext()
  const context = useRadioContext()
  const mergedProps = mergeProps(getItemControlProps(context), props)

  return <ark.div {...mergedProps} ref={ref} />
})
