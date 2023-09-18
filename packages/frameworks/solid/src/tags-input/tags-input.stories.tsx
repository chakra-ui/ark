import { For } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { TagsInput } from './'
import './tags-input.css'

const meta: Meta = {
  title: 'TagsInput',
}

export default meta

export const Basic = () => (
  <TagsInput.Root value={['react', 'solid', 'vue']}>
    {(api) => (
      <>
        <TagsInput.Label>Label</TagsInput.Label>
        <TagsInput.Control>
          <For each={api().value}>
            {(val, index) => (
              <>
                <TagsInput.Tag index={index()} value={val}>
                  <span>{val}</span>
                  <TagsInput.TagDeleteTrigger index={index()} value={val}>
                    &#x2715;
                  </TagsInput.TagDeleteTrigger>
                </TagsInput.Tag>
                <TagsInput.TagInput index={index()} value={val} />
              </>
            )}
          </For>
          <TagsInput.Input placeholder="Add tag" />
          <TagsInput.ClearTrigger asChild>Clear All</TagsInput.ClearTrigger>
        </TagsInput.Control>
      </>
    )}
  </TagsInput.Root>
)
