import { mergeProps } from '@zag-js/solid'
import { splitProps } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { usePinInputContext } from './pin-input-context'

export type PinInputControlProps = HTMLArkProps<'div'>

export const PinInputControl = (props: PinInputControlProps) => {
  const api = usePinInputContext()

  const [childrenProps, restProps] = splitProps(props, ['children'])
  const controlProps = mergeProps(() => api().controlProps, restProps)

  return (
    <ark.div {...controlProps}>
      {childrenProps.children}
      <input {...api().hiddenInputProps} />
    </ark.div>
  )
}
