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
                {({ half, highlighted }) => {
                  if (half) return 'half'
                  if (highlighted) return 'highlighted'
                  return 'empty'
                }}
              </RatingGroup.ItemContext>
            </RatingGroup.Item>
          ))
        }
      </RatingGroup.Context>
      <RatingGroup.HiddenInput />
    </RatingGroup.Control>
  </RatingGroup.Root>
)
