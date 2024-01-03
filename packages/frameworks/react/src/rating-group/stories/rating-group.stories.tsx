import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { RatingGroup } from '../'

type RatingGroupType = typeof RatingGroup

const meta: Meta<RatingGroupType> = {
  title: 'RatingGroup',
  component: RatingGroup,
}

export default meta

export const Basic = () => (
  <RatingGroup.Root count={5} defaultValue={3}>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      {({ items }) =>
        items.map((item) => (
          <RatingGroup.Item key={item} index={item}>
            {({ isHighlighted }) => {
              if (isHighlighted) return <IconFull />
              return <IconEmpty />
            }}
          </RatingGroup.Item>
        ))
      }
    </RatingGroup.Control>
  </RatingGroup.Root>
)

export const HalfRatings = () => (
  <RatingGroup.Root count={5} defaultValue={3} allowHalf>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      {({ items }) =>
        items.map((item) => (
          <RatingGroup.Item key={item} index={item}>
            {({ isHalf, isHighlighted }) => {
              if (isHalf) return <IconHalf />
              if (isHighlighted) return <IconFull />
              return <IconEmpty />
            }}
          </RatingGroup.Item>
        ))
      }
    </RatingGroup.Control>
  </RatingGroup.Root>
)

export const InitialValue = () => (
  <RatingGroup.Root count={5} defaultValue={2} readOnly>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      {({ items }) =>
        items.map((item) => (
          <RatingGroup.Item key={item} index={item}>
            {({ isHighlighted }) => {
              if (isHighlighted) return <IconFull />
              return <IconEmpty />
            }}
          </RatingGroup.Item>
        ))
      }
    </RatingGroup.Control>
  </RatingGroup.Root>
)

export const Controlled = () => {
  const [value, setValue] = useState(0)

  return (
    <RatingGroup.Root
      count={5}
      value={value}
      onValueChange={(details) => setValue(details.value)}
      allowHalf
    >
      <RatingGroup.Label>Label</RatingGroup.Label>
      <RatingGroup.Control>
        {({ items }) =>
          items.map((item) => (
            <RatingGroup.Item key={item} index={item}>
              {({ isHalf, isHighlighted }) => {
                if (isHalf) return <IconHalf />
                if (isHighlighted) return <IconFull />
                return <IconEmpty />
              }}
            </RatingGroup.Item>
          ))
        }
      </RatingGroup.Control>
    </RatingGroup.Root>
  )
}

export const Disabled = () => (
  <RatingGroup.Root count={5} defaultValue={3} disabled>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      {({ items }) =>
        items.map((item) => (
          <RatingGroup.Item key={item} index={item}>
            {({ isHighlighted }) => {
              if (isHighlighted) return <IconFull />
              return <IconEmpty />
            }}
          </RatingGroup.Item>
        ))
      }
    </RatingGroup.Control>
  </RatingGroup.Root>
)

export const ReadOnly = () => (
  <RatingGroup.Root count={5} defaultValue={3} readOnly>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      {({ items }) =>
        items.map((item) => (
          <RatingGroup.Item key={item} index={item}>
            {({ isHighlighted }) => {
              if (isHighlighted) return <IconFull />
              return <IconEmpty />
            }}
          </RatingGroup.Item>
        ))
      }
    </RatingGroup.Control>
  </RatingGroup.Root>
)

export const FormUsage = () => (
  <RatingGroup.Root name="my-rating" count={5} defaultValue={3}>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      {({ items }) =>
        items.map((item) => (
          <RatingGroup.Item key={item} index={item}>
            {({ isHighlighted }) => {
              if (isHighlighted) return <IconFull />
              return <IconEmpty />
            }}
          </RatingGroup.Item>
        ))
      }
    </RatingGroup.Control>
  </RatingGroup.Root>
)

const IconHalf = () => (
  <svg
    viewBox="0 0 273 260"
    data-part="star"
    style={{
      width: '1.25rem',
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

const IconEmpty = () => (
  <svg
    viewBox="0 0 273 260"
    data-part="star"
    style={{
      width: '1.25rem',
      color: '#bdbdbd',
    }}
  >
    <path
      d="M136.5 0L177.83 86.614L272.977 99.1561L203.374 165.229L220.847 259.594L136.5 213.815L52.1528 259.594L69.6265 165.229L0.0233917 99.1561L95.1699 86.614L136.5 0Z"
      fill="currentColor"
    ></path>
  </svg>
)

const IconFull = () => (
  <svg
    viewBox="0 0 273 260"
    data-part="star"
    style={{
      width: '1.25rem',
      color: '#ffb400',
    }}
  >
    <path
      d="M136.5 0L177.83 86.614L272.977 99.1561L203.374 165.229L220.847 259.594L136.5 213.815L52.1528 259.594L69.6265 165.229L0.0233917 99.1561L95.1699 86.614L136.5 0Z"
      fill="currentColor"
    ></path>
  </svg>
)
