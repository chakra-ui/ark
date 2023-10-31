import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useSliderContext } from './slider-context'
import { type UseSliderReturn } from './use-slider'

export type SliderValueTextProps = Assign<
  HTMLArkProps<'div'>,
  {
    children?: ((pages: UseSliderReturn) => JSX.Element) | JSX.Element
  }
>

export const SliderValueText = (props: SliderValueTextProps) => {
  const api = useSliderContext()
  const getChildren = () => runIfFn(props.children, api)
  const mergedProps = mergeProps(() => api().valueTextProps, props)

  return <ark.div {...mergedProps}>{getChildren()}</ark.div>
}
