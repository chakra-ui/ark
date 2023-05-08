import { For } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import {
  Tag,
  TagDeleteTrigger,
  TagInput,
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputField,
  TagsInputLabel,
} from './'
import './tags-input.css'

const meta: Meta = {
  title: 'TagsInput',
}

export default meta

export const Basic = () => (
  <TagsInput value={['react', 'solid', 'vue']}>
    {(api) => (
      <>
        <TagsInputLabel>Label</TagsInputLabel>
        <TagsInputControl>
          <For each={api().value}>
            {(val, index) => (
              <>
                <Tag index={index()} value={val}>
                  <span>{val}</span>
                  <TagDeleteTrigger index={index()} value={val}>
                    <button>&#x2715;</button>
                  </TagDeleteTrigger>
                </Tag>
                <TagInput index={index()} value={val} />
              </>
            )}
          </For>

          <TagsInputField placeholder="Add tag" />
          <TagsInputClearTrigger asChild>
            <button>clear all</button>
          </TagsInputClearTrigger>
        </TagsInputControl>
      </>
    )}
  </TagsInput>
)
