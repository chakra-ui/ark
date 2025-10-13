import { TagsInput, useTagsInput } from '@ark-ui/react/tags-input'
import { XIcon } from 'lucide-react'

export const ProgrammaticControl = () => {
  const tagsInput = useTagsInput()

  return (
    <>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button type="button" onClick={() => tagsInput.addValue('React')}>
          Add React
        </button>
        <button type="button" onClick={() => tagsInput.addValue('Solid')}>
          Add Solid
        </button>
        <button type="button" onClick={() => tagsInput.setValue(['Vue', 'Svelte'])}>
          Set to Vue & Svelte
        </button>
        <button type="button" onClick={() => tagsInput.clearValue()}>
          Clear All
        </button>
      </div>

      <TagsInput.RootProvider value={tagsInput}>
        <TagsInput.Context>
          {(api) => (
            <>
              <TagsInput.Label>Frameworks (Programmatic Control)</TagsInput.Label>
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
              </TagsInput.Control>
              <TagsInput.Input placeholder="Add Framework" />
              <TagsInput.ClearTrigger>
                <XIcon />
              </TagsInput.ClearTrigger>
            </>
          )}
        </TagsInput.Context>
        <TagsInput.HiddenInput />
      </TagsInput.RootProvider>
    </>
  )
}
