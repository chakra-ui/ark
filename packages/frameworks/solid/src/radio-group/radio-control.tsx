import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioControlProps = HTMLArkProps<'div'>

export const RadioControl = (props: RadioControlProps) => {
  const api = useRadioGroupContext()
  const radioProps = useRadioContext()
  const mergedProps = mergeProps(() => api().getRadioControlProps(radioProps), props)

  return <ark.div {...mergedProps} />
}
