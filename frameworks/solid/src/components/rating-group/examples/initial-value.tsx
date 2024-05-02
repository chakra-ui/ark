import { StarIcon } from 'lucide-solid'
import { Index, Show } from 'solid-js'
import { RatingGroup } from '../..'

export const InitialValue = () => (
  <RatingGroup.Root count={5} value={2} readOnly>
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
