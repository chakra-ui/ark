import {
  RatingGroup as ArkRatingGroup,
  type RatingGroupRootProps,
} from '@ark-ui/react/rating-group'
import { forwardRef, type ReactNode } from 'react'
import { css, cx } from 'styled-system/css'
import { splitCssProps } from 'styled-system/jsx'
import { ratingGroup, type RatingGroupVariantProps } from 'styled-system/recipes'
import type { Assign, JsxStyleProps } from 'styled-system/types'

export interface RatingGroupProps
  extends Assign<JsxStyleProps, RatingGroupRootProps>,
    RatingGroupVariantProps {
  children?: ReactNode
}

export const RatingGroup = forwardRef<HTMLDivElement, RatingGroupProps>((props, ref) => {
  const [variantProps, ratingGroupProps] = ratingGroup.splitVariantProps(props)
  const [cssProps, localProps] = splitCssProps(ratingGroupProps)
  const { children, className, ...rootProps } = localProps
  const styles = ratingGroup(variantProps)

  return (
    <ArkRatingGroup.Root
      ref={ref}
      className={cx(styles.root, css(cssProps), className)}
      {...rootProps}
    >
      {children && <ArkRatingGroup.Label className={styles.label}>{children}</ArkRatingGroup.Label>}
      <ArkRatingGroup.Control className={styles.control}>
        <ArkRatingGroup.Context>
          {({ items }) =>
            items.map((index) => (
              <ArkRatingGroup.Item className={styles.item} key={index} index={index}>
                <ArkRatingGroup.ItemContext>
                  {({ isHalf }) => <StarIcon isHalf={isHalf} />}
                </ArkRatingGroup.ItemContext>
              </ArkRatingGroup.Item>
            ))
          }
        </ArkRatingGroup.Context>
      </ArkRatingGroup.Control>
    </ArkRatingGroup.Root>
  )
})

RatingGroup.displayName = 'RatingGroup'

type IconProps = {
  isHalf: boolean
}

const StarIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="inherit"
    stroke="inherit"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <title>Star Icon</title>
    <defs>
      <linearGradient id="half">
        <stop offset="50%" stopColor="var(--colors-color-palette-default)" />
        <stop offset="50%" stopColor="var(--colors-bg-emphasized)" />
      </linearGradient>
    </defs>
    <polygon
      fill={props.isHalf ? 'url(#half)' : 'inherit'}
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
    />
  </svg>
)
