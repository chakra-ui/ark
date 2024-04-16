import { Index } from 'solid-js'
import { TagsInput } from '../..'

export const BlurBehavior = () => {
  return (
    <TagsInput.Root blurBehavior="add">
      <TagsInput.Context>
        {(api) => (
          <>
            <TagsInput.Label>Frameworks</TagsInput.Label>
            <TagsInput.Control>
              <Index each={api().value}>
                {(value, index) => (
                  <TagsInput.Item index={index} value={value()}>
                    <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                    <TagsInput.ItemInput />
                    <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
                  </TagsInput.Item>
                )}
              </Index>
            </TagsInput.Control>
            <TagsInput.Input placeholder="Add Framework" />
            <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
          </>
        )}
      </TagsInput.Context>
    </TagsInput.Root>
  )
}
