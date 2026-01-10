import { Field } from '@ark-ui/react/field'
import { TagsInput } from '@ark-ui/react/tags-input'
import { XIcon } from 'lucide-react'
import field from 'styles/field.module.css'
import styles from 'styles/tags-input.module.css'

export const WithField = () => {
  return (
    <Field.Root className={field.Root}>
      <TagsInput.Root className={styles.Root}>
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
      <Field.HelperText className={field.HelperText}>Additional Info</Field.HelperText>
      <Field.ErrorText className={field.ErrorText}>Error Info</Field.ErrorText>
    </Field.Root>
  )
}
