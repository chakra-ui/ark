import { Meta } from '@storybook/react'
import { Rating } from './rating'
import { RatingLabel } from './rating-label'
import { RatingItemGroup } from './rating-item-group'

export default {
  title: 'React/Rating',
} as Meta

export const basic = () => (
  <Rating max={5} defaultValue={3} allowHalf>
    <RatingLabel>Rating label</RatingLabel>
    <RatingItemGroup
      style={{ fontSize: '2em' }}
      iconFull={iconFull}
      iconEmpty={iconEmpty}
      iconHalf={iconHalf}
    />
  </Rating>
)

export const detailed = () => (
  <Rating max={5} defaultValue={3} allowHalf>
    <RatingLabel>Rating label</RatingLabel>
    <RatingItemGroup
      style={{ fontSize: '2em' }}
      renderIcon={({ isHighlighted, isHalf }) => (
        <svg
          viewBox="0 0 273 260"
          data-part="star"
          style={{
            width: '1em',
            color: isHalf ? '#ffe94f' : isHighlighted ? '#ffb400' : '#bdbdbd',
          }}
        >
          <path
            d="M136.5 0L177.83 86.614L272.977 99.1561L203.374 165.229L220.847 259.594L136.5 213.815L52.1528 259.594L69.6265 165.229L0.0233917 99.1561L95.1699 86.614L136.5 0Z"
            fill="currentColor"
          ></path>
        </svg>
      )}
    />
  </Rating>
)

const iconHalf = (
  <svg
    viewBox="0 0 273 260"
    data-part="star"
    style={{
      width: '1em',
      color: '#ffb400',
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M135.977 214.086L52.1294 259.594L69.6031 165.229L0 99.1561L95.1465 86.614L135.977 1.04785V214.086Z"
      fill="currentColor"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M135.977 213.039L219.826 258.546L202.352 164.181L271.957 98.1082L176.808 85.5661L135.977 0V213.039Z"
      fill="#bdbdbd"
    ></path>
  </svg>
)

const iconEmpty = (
  <svg
    viewBox="0 0 273 260"
    data-part="star"
    style={{
      width: '1em',
      color: '#bdbdbd',
    }}
  >
    <path
      d="M136.5 0L177.83 86.614L272.977 99.1561L203.374 165.229L220.847 259.594L136.5 213.815L52.1528 259.594L69.6265 165.229L0.0233917 99.1561L95.1699 86.614L136.5 0Z"
      fill="currentColor"
    ></path>
  </svg>
)

const iconFull = (
  <svg
    viewBox="0 0 273 260"
    data-part="star"
    style={{
      width: '1em',
      color: '#ffb400',
    }}
  >
    <path
      d="M136.5 0L177.83 86.614L272.977 99.1561L203.374 165.229L220.847 259.594L136.5 213.815L52.1528 259.594L69.6265 165.229L0.0233917 99.1561L95.1699 86.614L136.5 0Z"
      fill="currentColor"
    ></path>
  </svg>
)
