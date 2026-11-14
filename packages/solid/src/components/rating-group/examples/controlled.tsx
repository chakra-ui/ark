import { RatingGroup } from '@ark-ui/solid/rating-group'
import { StarIcon } from 'lucide-solid'
import { For, createSignal } from 'solid-js'
import styles from 'styles/rating-group.module.css'

export const Controlled = () => {
  const [value, setValue] = createSignal(0)

  return (
    <RatingGroup.Root class={styles.Root} value={value()} onValueChange={(details) => setValue(details.value)}>
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
                        data-half={itemContext().half ? '' : undefined}
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
    </RatingGroup.Root>
  )
}
