import { TagsInput } from '@ark-ui/react/tags-input'
import { XIcon } from 'lucide-react'

export const Validated = () => {
  return (
    <TagsInput.Root
      validate={(details) => {
        return !details.value.includes(details.inputValue)
      }}
    >
      <TagsInput.Context>
        {(tagsInput) => (
          <>
            <TagsInput.Label>Frameworks</TagsInput.Label>
            <TagsInput.Control>
              {tagsInput.value.map((value, index) => (
                <TagsInput.Item key={index} index={index} value={value}>
                  <TagsInput.ItemPreview>
                    <TagsInput.ItemText>{value}</TagsInput.ItemText>
                    <TagsInput.ItemDeleteTrigger>
                      <XIcon />
                    </TagsInput.ItemDeleteTrigger>
                  </TagsInput.ItemPreview>
                  <TagsInput.ItemInput />
                </TagsInput.Item>
              ))}
            </TagsInput.Control>
            <TagsInput.Input placeholder="Add Framework" />
            <TagsInput.ClearTrigger>
              <XIcon />
            </TagsInput.ClearTrigger>
          </>
        )}
      </TagsInput.Context>
      <TagsInput.HiddenInput />
    </TagsInput.Root>
  )
}
