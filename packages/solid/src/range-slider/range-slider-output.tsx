import type { Assign } from '@polymorphic-factory/solid'
import type { JSX } from 'solid-js'
import { children } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { useRangeSliderContext } from './range-slider-context'
import type { UseRangeSliderReturn } from './use-range-slider'

export type RangeSliderOutputProps = Assign<
  HTMLArkProps<'output'>,
  {
    children?: JSX.Element | ((api: ReturnType<UseRangeSliderReturn>) => JSX.Element)
  }
>

export const RangeSliderOutput = (props: RangeSliderOutputProps) => {
  const slider = useRangeSliderContext()
  const view = () => children(() => runIfFn(props.children, slider()))

  return (
    <ark.output {...slider().outputProps} {...props}>
      {view()}
    </ark.output>
  )
}
