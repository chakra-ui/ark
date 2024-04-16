import { StarIcon } from 'lucide-solid'
import { Index, Show } from 'solid-js'
import { RatingGroup } from '../..'

export const Disabled = () => (
  <RatingGroup.Root count={5} value={3} disabled>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context>
        {(context) => (
          <Index each={context().items}>
            {(index) => (
              <RatingGroup.Item index={index()}>
                <RatingGroup.ItemContext>
                  {(context) => (
                    <Show when={context().isHighlighted} fallback={<StarIcon />}>
                      <StarIcon fill="current" />
                    </Show>
                  )}
                </RatingGroup.ItemContext>
              </RatingGroup.Item>
            )}
          </Index>
        )}
      </RatingGroup.Context>
    </RatingGroup.Control>
  </RatingGroup.Root>
)
