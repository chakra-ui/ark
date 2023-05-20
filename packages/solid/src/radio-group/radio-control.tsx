import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioControlProps = HTMLArkProps<'div'>

export const RadioControl = (props: RadioControlProps) => {
  const api = useRadioGroupContext()

  const radioParams = useRadioContext()
  const controlProps = mergeProps(() => api().getRadioControlProps(radioParams), props)

  return <ark.div {...controlProps} />
}
