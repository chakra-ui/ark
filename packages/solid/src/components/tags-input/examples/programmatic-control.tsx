import { TagsInput, useTagsInput } from '@ark-ui/solid/tags-input'
import { XIcon } from 'lucide-solid'
import { Index } from 'solid-js'

export const ProgrammaticControl = () => {
  const tagsInput = useTagsInput()

  return (
    <>
      <div style={{ display: 'flex', gap: '8px', 'margin-bottom': '12px' }}>
        <button type="button" onClick={() => tagsInput().addValue('React')}>
          Add React
        </button>
        <button type="button" onClick={() => tagsInput().addValue('Solid')}>
          Add Solid
        </button>
        <button type="button" onClick={() => tagsInput().setValue(['Vue', 'Svelte'])}>
          Set to Vue & Svelte
        </button>
        <button type="button" onClick={() => tagsInput().clearValue()}>
          Clear All
        </button>
      </div>

      <TagsInput.RootProvider value={tagsInput}>
        <TagsInput.Context>
          {(api) => (
            <>
              <TagsInput.Label>Frameworks (Programmatic Control)</TagsInput.Label>
              <TagsInput.Control>
                <Index each={api().value}>
                  {(value, index) => (
                    <TagsInput.Item index={index} value={value()}>
                      <TagsInput.ItemPreview>
                        <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                        <TagsInput.ItemDeleteTrigger>
                          <XIcon />
                        </TagsInput.ItemDeleteTrigger>
                      </TagsInput.ItemPreview>
                      <TagsInput.ItemInput />
                    </TagsInput.Item>
                  )}
                </Index>
                <TagsInput.Input placeholder="Add Framework" />
                <TagsInput.ClearTrigger>
                  <XIcon />
                </TagsInput.ClearTrigger>
              </TagsInput.Control>
            </>
          )}
        </TagsInput.Context>
        <TagsInput.HiddenInput />
      </TagsInput.RootProvider>
    </>
  )
}
