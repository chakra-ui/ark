import { TagsInput } from '@ark-ui/solid/tags-input'
import { XIcon } from 'lucide-solid'
import { Index } from 'solid-js'

const DELIMITER_PATTERN = /[,;\s]/

export const Delimiter = () => (
  <TagsInput.Root delimiter={DELIMITER_PATTERN}>
    <TagsInput.Context>
      {(api) => (
        <>
          <TagsInput.Label>Frameworks (separate with comma, semicolon, or space)</TagsInput.Label>
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
            <TagsInput.Input placeholder="Type and use comma, semicolon, or space" />
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
