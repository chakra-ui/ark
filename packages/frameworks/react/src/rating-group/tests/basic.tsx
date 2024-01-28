import { RatingGroup, type RatingGroupRootProps } from '../'

export const ComponentUnderTest = (props: RatingGroupRootProps) => (
  <RatingGroup.Root {...props}>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      {({ items }) =>
        items.map((item) => (
          <RatingGroup.Item key={item} index={item}>
            {({ isHalf, isHighlighted }) => {
              if (isHalf) return 'half'
              if (isHighlighted) return 'highlighted'
              return 'empty'
            }}
          </RatingGroup.Item>
        ))
      }
    </RatingGroup.Control>
  </RatingGroup.Root>
)
