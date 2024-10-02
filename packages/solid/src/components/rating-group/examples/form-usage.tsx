import { RatingGroup } from '@ark-ui/solid/rating-group'
import { StarIcon } from 'lucide-solid'
import { Index, Show } from 'solid-js'

export const FormUsage = () => (
  <RatingGroup.Root name="my-rating" count={5} value={3}>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context>
        {(context) => (
          <Index each={context().items}>
            {(index) => (
              <RatingGroup.Item index={index()}>
                <RatingGroup.ItemContext>
                  {(context) => (
                    <Show when={context().highlighted} fallback={<StarIcon />}>
                      <StarIcon fill="current" />
                    </Show>
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
