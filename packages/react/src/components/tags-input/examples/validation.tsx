import { TagsInput } from '@ark-ui/react/tags-input'
import { XIcon } from 'lucide-react'

const TAG_PATTERN = /^[a-zA-Z0-9-]+$/

const validateTag = (details: { value: string[]; inputValue: string }) => {
  const { value, inputValue } = details

  if (!inputValue || inputValue.trim() === '') {
    return false
  }

  if (value.includes(inputValue)) {
    return false
  }

  if (inputValue.length < 3) {
    return false
  }

  if (!TAG_PATTERN.test(inputValue)) {
    return false
  }

  return true
}

export const Validation = () => {
  return (
    <TagsInput.Root validate={validateTag}>
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
              <TagsInput.Input placeholder="Add Framework (min 3 chars, alphanumeric)" />
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
}
