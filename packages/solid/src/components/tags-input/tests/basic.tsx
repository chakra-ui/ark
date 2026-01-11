import { Index } from 'solid-js'
import { Field } from '../../field'
import { TagsInput } from '../'

export const ComponentUnderTest = (props: TagsInput.RootProps) => {
  return (
    <TagsInput.Root defaultValue={['react', 'solid', 'vue']} {...props}>
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
                      <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
                    </TagsInput.ItemPreview>
                    <TagsInput.ItemInput />
                  </TagsInput.Item>
                )}
              </Index>
            </TagsInput.Control>
            <TagsInput.Input placeholder="Add tag" />
            <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
          </>
        )}
      </TagsInput.Context>
      <TagsInput.HiddenInput />
    </TagsInput.Root>
  )
}

export const TagsInputWithField = (props: Field.RootProps) => {
  return (
    <Field.Root {...props}>
      <TagsInput.Root>
        <TagsInput.Context>
          {(api) => (
            <>
              <TagsInput.Label>Label</TagsInput.Label>
              <TagsInput.Control>
                <Index each={api().value}>
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
              </TagsInput.Control>
              <TagsInput.Input placeholder="Add tag" />
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
