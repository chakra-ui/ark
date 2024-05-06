import type { HTMLArkProps } from '@ark-ui/react'
import React from 'react'
import { css, cx } from 'styled-system/css'
import { splitCssProps } from 'styled-system/jsx'
import { type TextVariantProps, text } from 'styled-system/recipes'
import type { Assign, JsxStyleProps } from 'styled-system/types'

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref']

type AsProp<C extends React.ElementType> = {
  as?: C
}

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

type PolymorphicComponentProp<C extends React.ElementType, Props = {}> = React.PropsWithChildren<
  Props & AsProp<C>
> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {},
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> }

export type TextProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  Assign<JsxStyleProps, HTMLArkProps<'p'>> & TextVariantProps
>

type PolymorphicComponent = <C extends React.ElementType = 'p'>(
  props: TextProps<C>,
) => React.ReactNode | null

export const Text: PolymorphicComponent = React.forwardRef(
  <C extends React.ElementType = 'p'>(props: TextProps<C>, ref?: PolymorphicRef<C>) => {
    const [variantProps, textProps] = text.splitVariantProps(props)
    const [cssProps, localProps] = splitCssProps(textProps)
    const { className, as, ...otherProps } = localProps
    const styles = text(variantProps)
    const Component = props.as || 'p'

    return <Component ref={ref} className={cx(styles, css(cssProps), className)} {...otherProps} />
  },
)
