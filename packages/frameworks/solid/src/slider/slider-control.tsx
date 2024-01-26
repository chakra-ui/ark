import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export interface SliderControlProps extends HTMLArkProps<'div'> {}

export const SliderControl: ArkComponent<'div'> = (props: SliderControlProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  return <ark.div {...mergedProps} />
}
