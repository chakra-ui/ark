import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderLabelProps extends HTMLArkProps<'label'> {}

export const SliderLabel = (props: SliderLabelProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
