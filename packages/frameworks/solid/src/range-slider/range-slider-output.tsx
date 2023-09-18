import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useRangeSliderContext } from './range-slider-context'
import { type UseRangeSliderReturn } from './use-range-slider'

export type RangeSliderOutputProps = Assign<
  HTMLArkProps<'output'>,
  {
    children?: JSX.Element | ((api: UseRangeSliderReturn) => JSX.Element)
  }
>

export const RangeSliderOutput = (props: RangeSliderOutputProps) => {
  const api = useRangeSliderContext()
  const getChildren = () => runIfFn(props.children, api)
  const outputProps = mergeProps(() => api().outputProps, props)
  return <ark.output {...outputProps}>{getChildren()}</ark.output>
}
