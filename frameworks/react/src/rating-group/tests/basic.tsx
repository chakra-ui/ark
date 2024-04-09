import { RatingGroup, type RatingGroupRootProps } from '../'

export const ComponentUnderTest = (props: RatingGroupRootProps) => (
  <RatingGroup.Root {...props}>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context>
        {({ items }) =>
          items.map((item) => (
            <RatingGroup.Item key={item} index={item}>
              <RatingGroup.ItemContext>
                {({ isHalf, isHighlighted }) => {
                  if (isHalf) return 'half'
                  if (isHighlighted) return 'highlighted'
                  return 'empty'
                }}
              </RatingGroup.ItemContext>
            </RatingGroup.Item>
          ))
        }
      </RatingGroup.Context>
    </RatingGroup.Control>
  </RatingGroup.Root>
)
