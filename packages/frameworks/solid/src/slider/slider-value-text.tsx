import { mergeProps } from '@zag-js/solid'
import { children } from 'solid-js'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export interface SliderValueTextProps extends HTMLArkProps<'div'> {}

export const SliderValueText: ArkComponent<'div'> = (props) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().valueTextProps, props)
  const getChildren = children(() => props.children)

  return <ark.div {...mergedProps}>{getChildren() || api().value.join(',')}</ark.div>
}
