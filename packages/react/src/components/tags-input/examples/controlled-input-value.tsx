import { TagsInput } from '@ark-ui/react/tags-input'
import { useState } from 'react'
import { XIcon } from 'lucide-react'

export const ControlledInputValue = () => {
  const [inputValue, setInputValue] = useState('')

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button type="button" onClick={() => setInputValue('React')}>
          Set to "React"
        </button>
        <button type="button" onClick={() => setInputValue('')}>
          Clear Input
        </button>
        <span style={{ fontSize: '14px', marginLeft: '8px' }}>Current input: "{inputValue}"</span>
      </div>

      <TagsInput.Root inputValue={inputValue} onInputValueChange={(details) => setInputValue(details.inputValue)}>
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
    </div>
  )
}
