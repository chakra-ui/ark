import { StarIcon } from 'lucide-react'
import { RatingGroup } from '../..'

export const InitialValue = () => (
  <RatingGroup.Root count={5} defaultValue={2} readOnly>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context>
        {({ items }) =>
          items.map((item) => (
            <RatingGroup.Item key={item} index={item}>
              <RatingGroup.ItemContext>
                {({ isHighlighted }) =>
                  isHighlighted ? <StarIcon fill="current" /> : <StarIcon />
                }
              </RatingGroup.ItemContext>
            </RatingGroup.Item>
          ))
        }
      </RatingGroup.Context>
    </RatingGroup.Control>
  </RatingGroup.Root>
)
