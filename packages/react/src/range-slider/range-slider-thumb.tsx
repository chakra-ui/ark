import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { type Assign } from '../types'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderThumbProps = Assign<
  ComponentPropsWithoutRef<typeof ark.div>,
  { index: number }
>

export const RangeSliderThumb = forwardRef<HTMLDivElement, RangeSliderThumbProps>((props, ref) => {
  const { index, ...localProps } = props
  const api = useRangeSliderContext()
  const mergedProps = mergeProps(api.getThumbProps(index), localProps)

  return (
    <>
      <ark.div {...mergedProps} ref={ref} />
      <input {...api.getHiddenInputProps(index)} />
    </>
  )
})

RangeSliderThumb.displayName = 'RangeSliderThumb'
