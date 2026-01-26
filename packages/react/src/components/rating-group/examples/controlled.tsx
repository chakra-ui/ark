import { RatingGroup } from '@ark-ui/react/rating-group'
import { StarIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/rating-group.module.css'

export const Controlled = () => {
  const [value, setValue] = useState(0)

  return (
    <RatingGroup.Root className={styles.Root} value={value} onValueChange={(details) => setValue(details.value)}>
      <RatingGroup.Label className={styles.Label}>Label</RatingGroup.Label>
      <RatingGroup.Control className={styles.Control}>
        <RatingGroup.Context>
          {({ items }) =>
            items.map((item) => (
              <RatingGroup.Item className={styles.Item} key={item} index={item}>
                <RatingGroup.ItemContext>
                  {({ half, highlighted }) => (
                    <span
                      className={styles.ItemIndicator}
                      data-half={half ? '' : undefined}
                      data-highlighted={highlighted ? '' : undefined}
                    >
                      <StarIcon data-bg="" />
                      <StarIcon data-fg="" fill="currentColor" />
                    </span>
                  )}
                </RatingGroup.ItemContext>
              </RatingGroup.Item>
            ))
          }
        </RatingGroup.Context>
        <RatingGroup.HiddenInput />
      </RatingGroup.Control>
    </RatingGroup.Root>
  )
}
