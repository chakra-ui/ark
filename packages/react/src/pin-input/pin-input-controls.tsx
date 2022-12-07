import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { usePinInputContext } from './pin-input-context'

export type PinInputControlsProps = HTMLArkProps<'div'>

export const PinInputControls = forwardRef<'div', PinInputControlsProps>((props, ref) => {
  // TODO add controlsProps when available
  const { hiddenInputProps } = usePinInputContext()
  const mergedProps = mergeProps({}, props)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {props.children}
      <input {...hiddenInputProps} />
    </ark.div>
  )
})
