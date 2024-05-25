import type { Assign } from '@ark-ui/react'
import { type HTMLArkProps, ark } from '@ark-ui/react/factory'
import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { splitCssProps } from 'styled-system/jsx'
import { type IconVariantProps, icon } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'

export interface IconProps extends Assign<JsxStyleProps, HTMLArkProps<'svg'>>, IconVariantProps {}

export const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const [variantProps, iconProps] = icon.splitVariantProps(props)
  const [cssProps, localProps] = splitCssProps(iconProps)
  const { className, ...otherProps } = localProps
  const styles = icon(variantProps)

  return (
    <ark.svg ref={ref} asChild className={cx(styles, css(cssProps), className)} {...otherProps} />
  )
})
