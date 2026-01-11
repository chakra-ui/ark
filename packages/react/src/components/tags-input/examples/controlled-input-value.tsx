import { TagsInput } from '@ark-ui/react/tags-input'
import { XIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/tags-input.module.css'

export const ControlledInputValue = () => {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="stack">
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button className={button.Root} type="button" onClick={() => setInputValue('React')}>
          Set to "React"
        </button>
        <button className={button.Root} type="button" onClick={() => setInputValue('')}>
          Clear Input
        </button>
        <span style={{ fontSize: '14px' }}>Current: "{inputValue}"</span>
      </div>

      <TagsInput.Root
        className={styles.Root}
        inputValue={inputValue}
        onInputValueChange={(details) => setInputValue(details.inputValue)}
      >
        <TagsInput.Context>
          {(tagsInput) => (
            <>
              <TagsInput.Label className={styles.Label}>Frameworks</TagsInput.Label>
              <TagsInput.Control className={styles.Control}>
                {tagsInput.value.map((value, index) => (
                  <TagsInput.Item key={index} index={index} value={value} className={styles.Item}>
                    <TagsInput.ItemPreview className={styles.ItemPreview}>
                      <TagsInput.ItemText className={styles.ItemText}>{value}</TagsInput.ItemText>
                      <TagsInput.ItemDeleteTrigger className={styles.ItemDeleteTrigger}>
                        <XIcon />
                      </TagsInput.ItemDeleteTrigger>
                    </TagsInput.ItemPreview>
                    <TagsInput.ItemInput className={styles.ItemInput} />
                  </TagsInput.Item>
                ))}
                <TagsInput.Input placeholder="Add Framework" className={styles.Input} />
                <TagsInput.ClearTrigger className={styles.ClearTrigger}>
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
