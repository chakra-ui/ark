import { TagsInput, useTagsInput } from '@ark-ui/react/tags-input'

export const RootProvider = () => {
  const tagsInput = useTagsInput()

  return (
    <>
      <button onClick={() => tagsInput.focus()}>Focus</button>

      <TagsInput.RootProvider value={tagsInput}>
        <TagsInput.Context>
          {(tagsInput) => (
            <>
              <TagsInput.Label>Frameworks</TagsInput.Label>
              <TagsInput.Control>
                {tagsInput.value.map((value, index) => (
                  <TagsInput.Item key={index} index={index} value={value}>
                    <TagsInput.ItemPreview>
                      <TagsInput.ItemText>{value}</TagsInput.ItemText>
                      <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
                    </TagsInput.ItemPreview>
                    <TagsInput.ItemInput />
                  </TagsInput.Item>
                ))}
              </TagsInput.Control>
              <TagsInput.Input placeholder="Add Framework" />
              <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
            </>
          )}
        </TagsInput.Context>
        <TagsInput.HiddenInput />
      </TagsInput.RootProvider>
    </>
  )
}
