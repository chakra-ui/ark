import { Index, Show, createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { RatingGroup } from '../'

const meta: Meta = {
  title: 'Components / Rating Group',
}

export default meta

export const Basic = () => (
  <RatingGroup.Root count={5} value={3}>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context>
        {(context) => (
          <Index each={context().items}>
            {(index) => (
              <RatingGroup.Item index={index()}>
                <RatingGroup.ItemContext>
                  {(context) => (
                    <Show when={context().isHighlighted} fallback={<StarOutlineIcon />}>
                      <StarIcon />
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

export const HalfRatings = () => (
  <RatingGroup.Root count={5} value={3} allowHalf>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context>
        {(context) => (
          <Index each={context().items}>
            {(index) => (
              <RatingGroup.Item index={index()}>
                <RatingGroup.ItemContext>
                  {(context) => (
                    <Show when={context().isHighlighted} fallback={<StarOutlineIcon />}>
                      <StarIcon />
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
                    <Show when={context().isHighlighted} fallback={<StarOutlineIcon />}>
                      <StarIcon />
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

export const Controlled = () => {
  const [value, setValue] = createSignal(0)

  return (
    <RatingGroup.Root
      count={5}
      value={value()}
      onValueChange={(details) => setValue(details.value)}
      allowHalf
    >
      <RatingGroup.Label>Label</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroup.Context>
          {(context) => (
            <Index each={context().items}>
              {(index) => (
                <RatingGroup.Item index={index()}>
                  <RatingGroup.ItemContext>
                    {(context) =>
                      context().isHalf ? (
                        <StarHalfIcon />
                      ) : context().isHighlighted ? (
                        <StarIcon />
                      ) : (
                        <StarOutlineIcon />
                      )
                    }
                  </RatingGroup.ItemContext>
                </RatingGroup.Item>
              )}
            </Index>
          )}
        </RatingGroup.Context>
      </RatingGroup.Control>
    </RatingGroup.Root>
  )
}

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
                    <Show when={context().isHighlighted} fallback={<StarOutlineIcon />}>
                      <StarIcon />
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

export const ReadOnly = () => (
  <RatingGroup.Root count={5} value={3} readOnly>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context>
        {(context) => (
          <Index each={context().items}>
            {(index) => (
              <RatingGroup.Item index={index()}>
                <RatingGroup.ItemContext>
                  {(context) => (
                    <Show when={context().isHighlighted} fallback={<StarOutlineIcon />}>
                      <StarIcon />
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
                    <Show when={context().isHighlighted} fallback={<StarOutlineIcon />}>
                      <StarIcon />
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

const StarHalfIcon = () => (
  <svg
    viewBox="0 0 273 260"
    data-part="star"
    style={{
      width: '1.25rem',
      color: '#ffb400',
    }}
  >
    <title>Star Half Icon</title>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M135.977 214.086L52.1294 259.594L69.6031 165.229L0 99.1561L95.1465 86.614L135.977 1.04785V214.086Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M135.977 213.039L219.826 258.546L202.352 164.181L271.957 98.1082L176.808 85.5661L135.977 0V213.039Z"
      fill="#bdbdbd"
    />
  </svg>
)

const StarOutlineIcon = () => (
  <svg
    viewBox="0 0 273 260"
    data-part="star"
    style={{
      width: '1.25rem',
      color: '#bdbdbd',
    }}
  >
    <title>Star Outline Icon</title>
    <path
      d="M136.5 0L177.83 86.614L272.977 99.1561L203.374 165.229L220.847 259.594L136.5 213.815L52.1528 259.594L69.6265 165.229L0.0233917 99.1561L95.1699 86.614L136.5 0Z"
      fill="currentColor"
    />
  </svg>
)

const StarIcon = () => (
  <svg
    viewBox="0 0 273 260"
    data-part="star"
    style={{
      width: '1.25rem',
      color: '#ffb400',
    }}
  >
    <title>Star Icon</title>
    <path
      d="M136.5 0L177.83 86.614L272.977 99.1561L203.374 165.229L220.847 259.594L136.5 213.815L52.1528 259.594L69.6265 165.229L0.0233917 99.1561L95.1699 86.614L136.5 0Z"
      fill="currentColor"
    />
  </svg>
)
