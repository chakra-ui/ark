import { Index } from 'solid-js'
import { TagsInput } from '../..'

export const Basic = () => (
  <TagsInput.Root>
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
                    <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
                  </TagsInput.ItemPreview>
                  <TagsInput.ItemInput />
                </TagsInput.Item>
              )}
            </Index>
            <TagsInput.Input placeholder="Add Framework" />
            <TagsInput.ClearTrigger>Clear All</TagsInput.ClearTrigger>
          </TagsInput.Control>
        </>
      )}
    </TagsInput.Context>
    <TagsInput.HiddenInput />
  </TagsInput.Root>
)
