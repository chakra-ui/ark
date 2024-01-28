import { Index } from 'solid-js'
import { RatingGroup, type RatingGroupRootProps } from '../'

export const ComponentUnderTest = (props: RatingGroupRootProps) => (
  <RatingGroup.Root {...props}>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      {(api) => (
        <Index each={api().items}>
          {(index) => (
            <RatingGroup.Item index={index()}>
              {(api) => {
                if (api().isHalf) return 'half'
                if (api().isHighlighted) return 'highlighted'
                return 'empty'
              }}
            </RatingGroup.Item>
          )}
        </Index>
      )}
    </RatingGroup.Control>
  </RatingGroup.Root>
)
