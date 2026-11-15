import { Field } from '@ark-ui/solid/field'
import { RatingGroup } from '@ark-ui/solid/rating-group'
import { For } from 'solid-js'

export const ComponentUnderTest = (props: RatingGroup.RootProps) => (
  <RatingGroup.Root {...props}>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context>
        {(api) => (
          <For each={api().items} keyed={false}>
            {(index) => (
              <RatingGroup.Item index={index()}>
                <RatingGroup.ItemContext>
                  {(api) => {
                    if (api().half) return 'half'
                    if (api().highlighted) return 'highlighted'
                    return 'empty'
                  }}
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

export const RatingGroupWithField = (props: Field.RootProps) => (
  <Field.Root {...props}>
    <RatingGroup.Root defaultValue={3}>
      <RatingGroup.Label>Label</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroup.Context>
          {(api) => (
            <For each={api().items} keyed={false}>
              {(index) => (
                <RatingGroup.Item index={index()}>
                  <RatingGroup.ItemContext>
                    {(api) => {
                      if (api().half) return 'half'
                      if (api().highlighted) return 'highlighted'
                      return 'empty'
                    }}
                  </RatingGroup.ItemContext>
                </RatingGroup.Item>
              )}
            </For>
          )}
        </RatingGroup.Context>
        <RatingGroup.HiddenInput />
      </RatingGroup.Control>
    </RatingGroup.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
)
