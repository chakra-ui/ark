import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export interface NumberInputLabelProps extends HTMLArkProps<'label'> {}

export const NumberInputLabel: ArkComponent<'label'> = (props: NumberInputLabelProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.label {...mergedProps} />
}
