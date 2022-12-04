import type { Assign } from '@polymorphic-factory/solid'
import type { JSX } from 'solid-js'
import { children } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderOutputProps = Assign<
  HTMLArkProps<'output'>,
  {
    children: JSX.Element | (({ value }: { value: number[] }) => JSX.Element)
  }
>

export const RangeSliderOutput = (props: RangeSliderOutputProps) => {
  const slider = useRangeSliderContext()
  const view = () => children(() => runIfFn(props.children, { value: slider().values }))

  return (
    <ark.output {...slider().outputProps} {...props}>
      {view()}
    </ark.output>
  )
}
