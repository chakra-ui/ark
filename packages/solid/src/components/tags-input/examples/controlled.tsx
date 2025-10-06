import { TagsInput } from '@ark-ui/solid/tags-input'
import { XIcon } from 'lucide-solid'
import { Index, createSignal } from 'solid-js'

export const Controlled = () => {
  const [value, setValue] = createSignal<string[]>(['vue', 'react'])

  return (
    <>
      <p>Values: {value().join(', ')}</p>
      <TagsInput.Root value={value()} onValueChange={(details) => setValue(details.value)}>
        <TagsInput.Context>
          {(api) => (
            <>
              <TagsInput.Label>Frameworks</TagsInput.Label>
              <TagsInput.Control>
                <Index each={api().value}>
                  {(value, index) => (
                    <TagsInput.Item index={index} value={value()}>
                      <TagsInput.ItemPreview>
                        <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                        <TagsInput.ItemDeleteTrigger>
                          <XIcon />
                        </TagsInput.ItemDeleteTrigger>
                      </TagsInput.ItemPreview>
                      <TagsInput.ItemInput />
                    </TagsInput.Item>
                  )}
                </Index>
                <TagsInput.Input placeholder="Add Framework" />
                <TagsInput.ClearTrigger>
                  <XIcon />
                </TagsInput.ClearTrigger>
              </TagsInput.Control>
            </>
          )}
        </TagsInput.Context>
        <TagsInput.HiddenInput />
      </TagsInput.Root>
    </>
  )
}
