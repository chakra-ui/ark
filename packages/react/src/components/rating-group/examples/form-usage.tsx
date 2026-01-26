import { RatingGroup } from '@ark-ui/react/rating-group'
import { StarIcon } from 'lucide-react'
import styles from 'styles/rating-group.module.css'
import button from 'styles/button.module.css'

export const FormUsage = () => (
  <form
    className="stack"
    onSubmit={(e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      alert(`Rating value: ${formData.get('review')}`)
    }}
  >
    <RatingGroup.Root className={styles.Root} name="review" defaultValue={3}>
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
    <button type="submit" className={button.Root}>
      Submit
    </button>
  </form>
)
