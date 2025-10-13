import { TagsInput } from '@ark-ui/solid/tags-input'
import { XIcon } from 'lucide-solid'
import { Index } from 'solid-js'

export const Readonly = () => (
  <TagsInput.Root defaultValue={['React', 'Solid', 'Vue']} readOnly>
    <TagsInput.Context>
      {(api) => (
        <>
          <TagsInput.Label>Frameworks (Read-only)</TagsInput.Label>
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
            <TagsInput.Input placeholder="Cannot add tags in read-only mode" />
            <TagsInput.ClearTrigger>
              <XIcon />
            </TagsInput.ClearTrigger>
          </TagsInput.Control>
        </>
      )}
    </TagsInput.Context>
    <TagsInput.HiddenInput />
  </TagsInput.Root>
)
