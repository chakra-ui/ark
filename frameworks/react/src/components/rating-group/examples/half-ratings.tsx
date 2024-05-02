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
                {({ half, highlighted }) => {
                  if (half) return <StarHalfIcon fill="current" />
                  if (highlighted) return <StarIcon fill="current" />
                  return <StarIcon />
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
