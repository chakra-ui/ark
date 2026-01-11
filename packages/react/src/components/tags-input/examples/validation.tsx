import { TagsInput } from '@ark-ui/react/tags-input'
import { XIcon } from 'lucide-react'
import styles from 'styles/tags-input.module.css'

const TAG_PATTERN = /^[a-zA-Z0-9-]+$/

const validateTag = ({ value, inputValue }: { value: string[]; inputValue: string }) =>
  !!inputValue?.trim() && !value.includes(inputValue) && inputValue.length >= 3 && TAG_PATTERN.test(inputValue)

export const Validation = () => {
  return (
    <TagsInput.Root className={styles.Root} validate={validateTag}>
      <TagsInput.Context>
        {(tagsInput) => (
          <>
            <TagsInput.Label className={styles.Label}>Frameworks (Min 3 chars, alphanumeric)</TagsInput.Label>
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
  )
}
