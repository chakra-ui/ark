import { type RatingGroupVariantProps } from 'styled-system/recipes'
import { Rating, RatingGroup, RatingGroupControl } from '~/components/ui/rating-group'

export const RatingGroupDemo = (props: RatingGroupVariantProps) => {
  return (
    <RatingGroup {...props} max={5} defaultValue={3} allowHalf={false}>
      <RatingGroupControl>
        {({ sizeArray }) =>
          sizeArray.map((index) => (
            <Rating key={index} index={index}>
              {({ isHalf }) => <Icon isHalf={isHalf} />}
            </Rating>
          ))
        }
      </RatingGroupControl>
    </RatingGroup>
  )
}

type IconProps = {
  isHalf: boolean
}

const Icon = (props: IconProps) => (
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
    <defs>
      <linearGradient id="half">
        <stop offset="50%" stopColor="var(--color-accent-default)" />
        <stop offset="50%" stopColor="var(--color-bg-emphasized)" />
      </linearGradient>
    </defs>
    <polygon
      fill={props.isHalf ? 'url(#half)' : 'inherit'}
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
    />
  </svg>
)
