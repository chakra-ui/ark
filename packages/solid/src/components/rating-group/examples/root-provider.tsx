import { RatingGroup, useRatingGroup } from '@ark-ui/solid/rating-group'
import { StarIcon } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/rating-group.module.css'

export const RootProvider = () => {
  const ratingGroup = useRatingGroup({ defaultValue: 3 })

  return (
    <div class="stack">
      <output>value: {ratingGroup().value}</output>
      <RatingGroup.RootProvider class={styles.Root} value={ratingGroup}>
        <RatingGroup.Label class={styles.Label}>Label</RatingGroup.Label>
        <RatingGroup.Control class={styles.Control}>
          <RatingGroup.Context>
            {(context) => (
              <For each={context().items} keyed={false}>
                {(item) => (
                  <RatingGroup.Item class={styles.Item} index={item()}>
                    <RatingGroup.ItemContext>
                      {(itemContext) => (
                        <span
                          class={styles.ItemIndicator}
                          data-highlighted={itemContext().highlighted ? '' : undefined}
                        >
                          <StarIcon data-bg="" />
                          <StarIcon data-fg="" fill="currentColor" />
                        </span>
                      )}
                    </RatingGroup.ItemContext>
                  </RatingGroup.Item>
                )}
              </For>
            )}
          </RatingGroup.Context>
          <RatingGroup.HiddenInput />
        </RatingGroup.Control>
      </RatingGroup.RootProvider>
    </div>
  )
}
