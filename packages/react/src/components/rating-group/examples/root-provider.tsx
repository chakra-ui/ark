import { RatingGroup, useRatingGroup } from '@ark-ui/react/rating-group'
import { StarIcon } from 'lucide-react'
import styles from 'styles/rating-group.module.css'

export const RootProvider = () => {
  const ratingGroup = useRatingGroup({ count: 5, defaultValue: 3 })

  return (
    <div className="stack">
      <output>value: {ratingGroup.value}</output>
      <RatingGroup.RootProvider className={styles.Root} value={ratingGroup}>
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
      </RatingGroup.RootProvider>
    </div>
  )
}
