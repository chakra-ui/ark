import { RatingGroup } from '@ark-ui/solid/rating-group'
import { StarIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import styles from 'styles/rating-group.module.css'

export const FormUsage = () => (
  <RatingGroup.Root class={styles.Root} name="my-rating" defaultValue={3}>
    <RatingGroup.Label class={styles.Label}>Label</RatingGroup.Label>
    <RatingGroup.Control class={styles.Control}>
      <RatingGroup.Context>
        {(context) => (
          <Index each={context().items}>
            {(item) => (
              <RatingGroup.Item class={styles.Item} index={item()}>
                <RatingGroup.ItemContext>
                  {(itemContext) => (
                    <span class={styles.ItemIndicator} data-highlighted={itemContext().highlighted ? '' : undefined}>
                      <StarIcon data-bg="" />
                      <StarIcon data-fg="" fill="currentColor" />
                    </span>
                  )}
                </RatingGroup.ItemContext>
              </RatingGroup.Item>
            )}
          </Index>
        )}
      </RatingGroup.Context>
      <RatingGroup.HiddenInput />
    </RatingGroup.Control>
  </RatingGroup.Root>
)
