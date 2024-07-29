'use client'
import { type ReactNode, forwardRef } from 'react'
import * as ArkSlider from './primitives/slider'

export interface SliderProps extends ArkSlider.RootProps {
  children?: ReactNode
  marks?: {
    value: number
    label?: ReactNode
  }[]
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const { children, marks, ...rootProps } = props

  return (
    <ArkSlider.Root ref={ref} {...rootProps}>
      <ArkSlider.Context>
        {(api) => (
          <>
            {children && <ArkSlider.Label>{children}</ArkSlider.Label>}
            <ArkSlider.Control>
              <ArkSlider.Track>
                <ArkSlider.Range />
              </ArkSlider.Track>
              {api.value.map((_, index) => (
                <ArkSlider.Thumb key={index} index={index}>
                  <ArkSlider.HiddenInput />
                </ArkSlider.Thumb>
              ))}
            </ArkSlider.Control>
            {props.marks && (
              <ArkSlider.MarkerGroup>
                {props.marks.map((mark) => (
                  <ArkSlider.Marker key={mark.value} value={mark.value}>
                    {mark.label}
                  </ArkSlider.Marker>
                ))}
              </ArkSlider.MarkerGroup>
            )}
          </>
        )}
      </ArkSlider.Context>
    </ArkSlider.Root>
  )
})

Slider.displayName = 'Slider'
