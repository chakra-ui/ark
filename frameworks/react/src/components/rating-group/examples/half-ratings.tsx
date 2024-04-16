import { StarHalfIcon, StarIcon } from 'lucide-react'
import { RatingGroup } from '../..'

export const HalfRatings = () => (
  <RatingGroup.Root count={5} defaultValue={3} allowHalf>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context>
        {({ items }) =>
          items.map((item) => (
            <RatingGroup.Item key={item} index={item}>
              <RatingGroup.ItemContext>
                {({ isHalf, isHighlighted }) => {
                  if (isHalf) return <StarHalfIcon fill="current" />
                  if (isHighlighted) return <StarIcon fill="current" />
                  return <StarIcon />
                }}
              </RatingGroup.ItemContext>
            </RatingGroup.Item>
          ))
        }
      </RatingGroup.Context>
    </RatingGroup.Control>
  </RatingGroup.Root>
)
