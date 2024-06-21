import { Index } from 'solid-js'
import { Field, TagsInput } from '../..'

export const WithField = (props: Field.RootProps) => {
  return (
    <Field.Root {...props}>
      <TagsInput.Root>
        <TagsInput.Context>
          {(tagsInput) => (
            <>
              <TagsInput.Label>Label</TagsInput.Label>
              <Index each={tagsInput().value}>
                {(value, index) => (
                  <TagsInput.Item index={index} value={value()}>
                    <TagsInput.ItemPreview>
                      <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                      <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
                    </TagsInput.ItemPreview>
                    <TagsInput.ItemInput />
                  </TagsInput.Item>
                )}
              </Index>
              <TagsInput.Input placeholder="Add Framework" />
              <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
            </>
          )}
        </TagsInput.Context>
        <TagsInput.HiddenInput />
      </TagsInput.Root>
      <Field.HelperText>Additional Info</Field.HelperText>
      <Field.ErrorText>Error Info</Field.ErrorText>
    </Field.Root>
  )
}
