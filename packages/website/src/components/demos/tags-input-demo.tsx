import { TagsInput } from '~/components/ui/tags-input'

export const TagsInputDemo = () => {
  return (
    <TagsInput.Root defaultValue={['React', 'Solid', 'Vue']}>
      {(api) => (
        <>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            {(api.value ?? []).map((value, index) => (
              <TagsInput.Item key={index} index={index} value={value}>
                <TagsInput.ItemInput />
                <TagsInput.ItemText>{value}</TagsInput.ItemText>
                <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
              </TagsInput.Item>
            ))}
          </TagsInput.Control>
          <TagsInput.Input placeholder="Add tag" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </>
      )}
    </TagsInput.Root>
  )
}
