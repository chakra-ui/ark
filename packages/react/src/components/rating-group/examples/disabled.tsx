import { RatingGroup } from '@ark-ui/react/rating-group'
import { StarIcon } from 'lucide-react'

export const Disabled = () => (
  <RatingGroup.Root count={5} defaultValue={3} disabled>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context>
        {({ items }) =>
          items.map((item) => (
            <RatingGroup.Item key={item} index={item}>
              <RatingGroup.ItemContext>
                {({ highlighted }) => (highlighted ? <StarIcon fill="current" /> : <StarIcon />)}
              </RatingGroup.ItemContext>
            </RatingGroup.Item>
          ))
        }
      </RatingGroup.Context>
      <RatingGroup.HiddenInput />
    </RatingGroup.Control>
  </RatingGroup.Root>
)
