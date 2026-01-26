import { Field } from '@ark-ui/solid/field'
import { Index } from 'solid-js'
import { RatingGroup } from '../'

export const ComponentUnderTest = (props: RatingGroup.RootProps) => (
  <RatingGroup.Root {...props}>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context>
        {(api) => (
          <Index each={api().items}>
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
          </Index>
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
            <Index each={api().items}>
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
            </Index>
          )}
        </RatingGroup.Context>
        <RatingGroup.HiddenInput />
      </RatingGroup.Control>
    </RatingGroup.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
)
