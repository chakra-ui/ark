import { Index } from 'solid-js'
import { TagsInput } from '../'

export const ComponentUnderTest = (props: TagsInput.RootProps) => {
  return (
    <TagsInput.Root value={['react', 'solid', 'vue']} {...props}>
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
            </TagsInput.Control>
            <TagsInput.Input placeholder="Add tag" />
            <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
          </>
        )}
      </TagsInput.Context>
      <TagsInput.HiddenInput />
    </TagsInput.Root>
  )
}
