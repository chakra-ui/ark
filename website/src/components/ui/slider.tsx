import { Slider as ArkSlider, type SliderRootProps } from '@ark-ui/react/slider'
import { type ReactNode, forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { splitCssProps } from 'styled-system/jsx'
import { type SliderVariantProps, slider } from 'styled-system/recipes'
import type { Assign, JsxStyleProps } from 'styled-system/types'

export interface SliderProps extends Assign<JsxStyleProps, SliderRootProps>, SliderVariantProps {
  children?: ReactNode
  marks?: {
    value: number
    label?: ReactNode
  }[]
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const [variantProps, sliderProps] = slider.splitVariantProps(props)
  const [cssProps, localProps] = splitCssProps(sliderProps)
  const { children, className, ...rootProps } = localProps
  const styles = slider(variantProps)

  return (
    <ArkSlider.Root ref={ref} className={cx(styles.root, css(cssProps), className)} {...rootProps}>
      <ArkSlider.Context>
        {(api) => (
          <>
            {children && <ArkSlider.Label className={styles.label}>{children}</ArkSlider.Label>}
            <ArkSlider.Control className={styles.control}>
              <ArkSlider.Track className={styles.track}>
                <ArkSlider.Range className={styles.range} />
              </ArkSlider.Track>
              {api.value.map((_, index) => (
                <ArkSlider.Thumb key={index} index={index} className={styles.thumb} />
              ))}
            </ArkSlider.Control>
            {props.marks && (
              <ArkSlider.MarkerGroup className={styles.markerGroup}>
                {props.marks.map((mark) => (
                  <ArkSlider.Marker key={mark.value} value={mark.value} className={styles.marker}>
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
