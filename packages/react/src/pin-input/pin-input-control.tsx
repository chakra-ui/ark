import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { usePinInputContext } from './pin-input-context'

export type PinInputControlProps = HTMLArkProps<'div'>

export const PinInputControl = forwardRef<'div'>((props, ref) => {
  const { controlProps, hiddenInputProps } = usePinInputContext()
  const mergedProps = mergeProps(controlProps, props)

  return (
    <ark.div {...mergedProps} ref={ref}>
      <input {...hiddenInputProps} />
      {props.children}
    </ark.div>
  )
})
