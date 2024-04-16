import { StarIcon } from 'lucide-react'
import { RatingGroup } from '../..'

export const ReadOnly = () => (
  <RatingGroup.Root count={5} defaultValue={3} readOnly>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context>
        {({ items }) =>
          items.map((item) => (
            <RatingGroup.Item key={item} index={item}>
              <RatingGroup.ItemContext>
                {({ isHighlighted }) =>
                  isHighlighted ? <StarIcon fill="currrent" /> : <StarIcon />
                }
              </RatingGroup.ItemContext>
            </RatingGroup.Item>
          ))
        }
      </RatingGroup.Context>
    </RatingGroup.Control>
  </RatingGroup.Root>
)
