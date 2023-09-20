import type { Meta } from '@storybook/react'
import { TagsInput } from './'
import './tags-input.css'

type TagsInputType = typeof TagsInput

const meta: Meta<TagsInputType> = {
  title: 'TagsInput',
  component: TagsInput,
}

export default meta

export const Basic = () => {
  return (
    <TagsInput.Root>
      {(api) => (
        <>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            {api.value.map((value, index) => (
              <TagsInput.Item key={index} index={index} value={value}>
                <TagsInput.ItemInput />
                <TagsInput.ItemText>{value}</TagsInput.ItemText>
                <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
              </TagsInput.Item>
            ))}
          </TagsInput.Control>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </>
      )}
    </TagsInput.Root>
  )
}

export const InitialValue = () => {
  return (
    <TagsInput.Root defaultValue={['React', 'Solid', 'Vue']}>
      {(api) => (
        <>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            {api.value.map((value, index) => (
              <TagsInput.Item key={index} index={index} value={value}>
                <TagsInput.ItemInput />
                <TagsInput.ItemText>{value}</TagsInput.ItemText>
                <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
              </TagsInput.Item>
            ))}
          </TagsInput.Control>
          <TagsInput.Input placeholder="Add tag" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </>
      )}
    </TagsInput.Root>
  )
}
