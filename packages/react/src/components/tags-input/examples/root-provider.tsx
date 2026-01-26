import { TagsInput, useTagsInput } from '@ark-ui/react/tags-input'
import { XIcon } from 'lucide-react'
import styles from 'styles/tags-input.module.css'

export const RootProvider = () => {
  const tagsInput = useTagsInput()
  return (
    <div className="stack">
      <TagsInput.RootProvider className={styles.Root} value={tagsInput}>
        <TagsInput.Context>
          {(api) => (
            <>
              <TagsInput.Label className={styles.Label}>Frameworks</TagsInput.Label>
              <TagsInput.Control className={styles.Control}>
                {api.value.map((value, index) => (
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
      </TagsInput.RootProvider>

      <output>values: {JSON.stringify(tagsInput.value)}</output>
    </div>
  )
}
