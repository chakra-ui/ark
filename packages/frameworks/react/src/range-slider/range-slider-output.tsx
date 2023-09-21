import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { useRangeSliderContext } from './range-slider-context'
import { type UseRangeSliderReturn } from './use-range-slider'

export interface RangeSliderOutputProps
  extends Assign<
    HTMLArkProps<'output'>,
    { children?: ((api: UseRangeSliderReturn) => ReactNode) | ReactNode }
  > {}

export const RangeSliderOutput = forwardRef<HTMLOutputElement, RangeSliderOutputProps>(
  (props, ref) => {
    const { children, ...rest } = props
    const api = useRangeSliderContext()
    const mergedProps = mergeProps(api.outputProps, rest)

    const view = runIfFn(children, api)

    return (
      <ark.output {...mergedProps} ref={ref}>
        {view}
      </ark.output>
    )
  },
)

RangeSliderOutput.displayName = 'RangeSliderOutput'
