import { TagsInput } from '@ark-ui/react/tags-input'
import { XIcon } from 'lucide-react'
import styles from 'styles/tags-input.module.css'

const DELIMITER_PATTERN = /[,;\s]/

export const Delimiter = () => {
  return (
    <TagsInput.Root className={styles.Root} delimiter={DELIMITER_PATTERN}>
      <TagsInput.Context>
        {(tagsInput) => (
          <>
            <TagsInput.Label className={styles.Label}>Frameworks (add with comma, semicolon, or space)</TagsInput.Label>
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
              <TagsInput.Input placeholder="Add tag" className={styles.Input} />
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
