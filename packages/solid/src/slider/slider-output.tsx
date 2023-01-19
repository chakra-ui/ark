import type { Assign } from '@polymorphic-factory/solid'
import { children, JSX } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { useSliderContext } from './slider-context'
import type { UseSliderReturn } from './use-slider'

export type SliderOutputProps = Assign<
  HTMLArkProps<'output'>,
  {
    children?: ((pages: ReturnType<UseSliderReturn>) => JSX.Element) | JSX.Element
  }
>

export const SliderOutput = (props: SliderOutputProps) => {
  const slider = useSliderContext()
  const view = () => children(() => runIfFn(props.children, slider()))
  return (
    <ark.output {...slider().outputProps} {...props}>
      {view}
    </ark.output>
  )
}
