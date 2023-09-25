import { Index } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { TagsInput } from './'
import './tags-input.css'

const meta: Meta = {
  title: 'TagsInput',
}

export default meta

export const Basic = () => (
  <TagsInput.Root>
    {(api) => (
      <>
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <Index each={api().value}>
            {(value, index) => (
              <TagsInput.Item index={index} value={value()}>
                <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                <TagsInput.ItemInput />
                <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
              </TagsInput.Item>
            )}
          </Index>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear All</TagsInput.ClearTrigger>
        </TagsInput.Control>
      </>
    )}
  </TagsInput.Root>
)
