import { TagsInput } from '@ark-ui/solid/tags-input'
import { XIcon } from 'lucide-solid'
import { Index, createSignal } from 'solid-js'

export const ControlledInputValue = () => {
  const [inputValue, setInputValue] = createSignal('')

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', 'margin-bottom': '12px' }}>
        <button type="button" onClick={() => setInputValue('React')}>
          Set to "React"
        </button>
        <button type="button" onClick={() => setInputValue('')}>
          Clear Input
        </button>
        <span style={{ 'font-size': '14px', 'margin-left': '8px' }}>Current input: "{inputValue()}"</span>
      </div>

      <TagsInput.Root inputValue={inputValue()} onInputValueChange={(details) => setInputValue(details.inputValue)}>
        <TagsInput.Context>
          {(api) => (
            <>
              <TagsInput.Label>Frameworks</TagsInput.Label>
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
      </TagsInput.Root>
    </div>
  )
}
