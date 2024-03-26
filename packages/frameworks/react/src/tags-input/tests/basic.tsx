import { TagsInput, type TagsInputRootProps } from '../'

export const ComponentUnderTest = (props: TagsInputRootProps) => {
  return (
    <TagsInput.Root defaultValue={['react', 'solid', 'vue']} {...props}>
      <TagsInput.Context>
        {(context) => (
          <>
            <TagsInput.Label>Frameworks</TagsInput.Label>
            <TagsInput.Control>
              {context.value.map((value, index) => (
                <TagsInput.Item key={index} index={index} value={value}>
                  <TagsInput.ItemPreview>
                    <TagsInput.ItemText>{value}</TagsInput.ItemText>
                    <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
                  </TagsInput.ItemPreview>
                  <TagsInput.ItemInput />
                </TagsInput.Item>
              ))}
            </TagsInput.Control>
            <TagsInput.Input placeholder="Add tag" />
            <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
          </>
        )}
      </TagsInput.Context>
    </TagsInput.Root>
  )
}
