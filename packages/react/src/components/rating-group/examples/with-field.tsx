import { Field } from '@ark-ui/react/field'
import { RatingGroup } from '@ark-ui/react/rating-group'
import { StarIcon } from 'lucide-react'
import field from 'styles/field.module.css'
import styles from 'styles/rating-group.module.css'

export const WithField = () => (
  <Field.Root className={field.Root}>
    <RatingGroup.Root className={styles.Root} count={5} defaultValue={3}>
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
    <Field.HelperText className={field.HelperText}>Additional Info</Field.HelperText>
    <Field.ErrorText className={field.ErrorText}>Error Info</Field.ErrorText>
  </Field.Root>
)
