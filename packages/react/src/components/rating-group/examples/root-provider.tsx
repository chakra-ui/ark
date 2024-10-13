import { RatingGroup, useRatingGroup } from '@ark-ui/react/rating-group'
import { StarIcon } from 'lucide-react'

export const RootProvider = () => {
  const ratingGroup = useRatingGroup({ count: 5, defaultValue: 3 })

  return (
    <>
      <button onClick={() => ratingGroup.clearValue()}>Clear</button>

      <RatingGroup.RootProvider value={ratingGroup}>
        <RatingGroup.Label>Label</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroup.Context>
            {({ items }) =>
              items.map((item) => (
                <RatingGroup.Item key={item} index={item}>
                  <RatingGroup.ItemContext>
                    {({ highlighted }) =>
                      highlighted ? <StarIcon fill="current" /> : <StarIcon />
                    }
                  </RatingGroup.ItemContext>
                </RatingGroup.Item>
              ))
            }
          </RatingGroup.Context>
          <RatingGroup.HiddenInput />
        </RatingGroup.Control>
      </RatingGroup.RootProvider>
    </>
  )
}
