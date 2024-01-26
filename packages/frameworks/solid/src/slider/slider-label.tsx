import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export interface SliderLabelProps extends HTMLArkProps<'label'> {}

export const SliderLabel: ArkComponent<'label'> = (props) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.label {...mergedProps} />
}
