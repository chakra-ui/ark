import { TagsInput } from '@ark-ui/react/tags-input'
import { useState } from 'react'
import { XIcon } from 'lucide-react'

export const Controlled = () => {
  const [value, setValue] = useState<string[]>(['vue', 'react'])

  return (
    <>
      <p>Values: {value.join(', ')}</p>
      <TagsInput.Root value={value} onValueChange={(details) => setValue(details.value)}>
        <TagsInput.Context>
          {(api) => (
            <>
              <TagsInput.Label>Frameworks</TagsInput.Label>
              <TagsInput.Control>
                {api.value.map((value, index) => (
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
                <TagsInput.Input placeholder="Add Framework" />
                <TagsInput.ClearTrigger>
                  <XIcon />
                </TagsInput.ClearTrigger>
              </TagsInput.Control>
            </>
          )}
        </TagsInput.Context>
        <TagsInput.HiddenInput />
      </TagsInput.Root>
    </>
  )
}
