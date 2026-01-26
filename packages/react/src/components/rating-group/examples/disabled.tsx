import { RatingGroup } from '@ark-ui/react/rating-group'
import { StarIcon } from 'lucide-react'
import styles from 'styles/rating-group.module.css'

export const Disabled = () => (
  <RatingGroup.Root className={styles.Root} defaultValue={3} disabled>
    <RatingGroup.Label className={styles.Label}>Label</RatingGroup.Label>
    <RatingGroup.Control className={styles.Control}>
      <RatingGroup.Context>
        {({ items }) =>
          items.map((item) => (
            <RatingGroup.Item className={styles.Item} key={item} index={item}>
              <RatingGroup.ItemContext>
                {({ highlighted }) => (
                  <span className={styles.ItemIndicator} data-highlighted={highlighted ? '' : undefined}>
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
