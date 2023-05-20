import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useSliderContext } from './slider-context'
import { type UseSliderReturn } from './use-slider'

export type SliderOutputProps = Assign<
  HTMLArkProps<'output'>,
  {
    children?: ((pages: UseSliderReturn) => JSX.Element) | JSX.Element
  }
>

export const SliderOutput = (props: SliderOutputProps) => {
  const slider = useSliderContext()

  const getChildren = () => runIfFn(props.children, slider)
  const outputProps = mergeProps(() => slider().outputProps, props)

  return <ark.output {...outputProps}>{getChildren()}</ark.output>
}
