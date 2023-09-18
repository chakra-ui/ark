import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioLabelProps = HTMLArkProps<'span'>

export const RadioLabel = (props: RadioLabelProps) => {
  const api = useRadioGroupContext()
  const radioParams = useRadioContext()
  const labelProps = mergeProps(() => api().getRadioLabelProps(radioParams), props)
  return <ark.span {...labelProps} />
}
