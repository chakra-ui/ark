import { mergeProps } from '@zag-js/solid'
import { children } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export interface SliderValueTextProps extends HTMLArkProps<'div'> {}

export const SliderValueText = (props: SliderValueTextProps) => {
  const api = useSliderContext()
  const mergedProps = mergeProps(() => api().valueTextProps, props)
  // @ts-expect-error TODO fix
  const getChildren = children(() => props.children)

  return <ark.div {...mergedProps}>{getChildren() || api().value.join(',')}</ark.div>
}
