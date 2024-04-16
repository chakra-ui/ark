import { TagsInput } from '../..'

export const DisabledEditing = () => {
  return (
    <TagsInput.Root allowEditTag={false}>
      <TagsInput.Context>
        {(tagsInput) => (
          <>
            <TagsInput.Label>Frameworks</TagsInput.Label>
            <TagsInput.Control>
              {tagsInput.value.map((value, index) => (
                <TagsInput.Item key={index} index={index} value={value}>
                  <TagsInput.ItemInput />
                  <TagsInput.ItemText>{value}</TagsInput.ItemText>
                  <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
                </TagsInput.Item>
              ))}
            </TagsInput.Control>
            <TagsInput.Input placeholder="Add Framework" />
            <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
          </>
        )}
      </TagsInput.Context>
    </TagsInput.Root>
  )
}
