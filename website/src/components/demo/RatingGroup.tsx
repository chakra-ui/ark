import { ratingGroup } from '@/panda/recipes'
import { Rating, RatingGroup, RatingGroupControl } from '@ark-ui/react'

export const DemoRatingGroup = () => (
  <RatingGroup max={5} defaultValue={2.5} allowHalf className={ratingGroup()}>
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
        <stop offset="50%" stopColor="var(--stop-color-active)" />
        <stop offset="50%" stopColor="var(--stop-color-inactive)" />
      </linearGradient>
    </defs>
    <polygon
      fill={props.isHalf ? 'url(#half)' : 'inherit'}
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
    />
  </svg>
)
