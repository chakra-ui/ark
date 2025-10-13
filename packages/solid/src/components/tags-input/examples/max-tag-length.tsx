import { TagsInput } from '@ark-ui/solid/tags-input'
import { XIcon } from 'lucide-solid'
import { Index } from 'solid-js'

export const MaxTagLength = () => (
  <TagsInput.Root maxLength={10}>
    <TagsInput.Context>
      {(api) => (
        <>
          <TagsInput.Label>Frameworks (max 10 characters per tag)</TagsInput.Label>
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
            <TagsInput.Input placeholder="Max 10 characters" />
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
