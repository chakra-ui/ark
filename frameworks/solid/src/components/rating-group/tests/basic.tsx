import { Index } from 'solid-js'
import { RatingGroup, type RatingGroupRootProps } from '../'

export const ComponentUnderTest = (props: RatingGroupRootProps) => (
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
    </RatingGroup.Control>
  </RatingGroup.Root>
)
