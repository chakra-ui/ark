import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { usePinInputContext } from './pin-input-context'

export type PinInputControlProps = HTMLArkProps<'div'>

export const PinInputControl = forwardRef<'div', PinInputControlProps>((props, ref) => {
  const { controlProps, hiddenInputProps } = usePinInputContext()
  const mergedProps = mergeProps(controlProps, props)

  return (
    <ark.div {...mergedProps} ref={ref}>
      <input {...hiddenInputProps} />
      {props.children}
    </ark.div>
  )
})
