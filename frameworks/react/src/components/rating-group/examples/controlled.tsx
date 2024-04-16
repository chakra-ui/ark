import { StarIcon } from 'lucide-react'
import { useState } from 'react'
import { RatingGroup } from '../..'

export const Controlled = () => {
  const [value, setValue] = useState(0)

  return (
    <RatingGroup.Root
      count={5}
      value={value}
      onValueChange={(details) => setValue(details.value)}
      allowHalf
    >
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
}
