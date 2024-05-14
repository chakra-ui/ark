import { StarIcon } from 'lucide-react'
import { RatingGroup } from '../..'

export const FormUsage = () => (
  <RatingGroup.Root name="my-rating" count={5} defaultValue={3}>
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
