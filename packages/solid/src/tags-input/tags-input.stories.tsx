import { For } from 'solid-js'
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

export const Basic = () => (
  <TagsInput value={['react', 'solid', 'vue']}>
    {({ value }) => (
      <>
        <TagsInputLabel>Label</TagsInputLabel>
        <TagsInputControl>
          <For each={value}>
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
          <TagsInputClearTrigger>
            <button>clear all</button>
          </TagsInputClearTrigger>
        </TagsInputControl>
      </>
    )}
  </TagsInput>
)
