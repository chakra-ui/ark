import type { Meta } from '@storybook/react'
import { Fragment, useState } from 'react'
import {
  Tag,
  TagDeleteTrigger,
  TagInput,
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputField,
} from './'
import './tags-input.css'

type TagsInputType = typeof TagsInput

const meta: Meta<TagsInputType> = {
  title: 'TagsInput',
  component: TagsInput,
}

export default meta

export const Basic = () => {
  const [value, setValue] = useState<string[]>(['react', 'solid', 'vue'])
  return (
    <TagsInput.Root value={value} onChange={(e) => setValue(e.values)}>
      {({ value }) => (
        <>
          <TagsInput.Label>Label</TagsInput.Label>
          <TagsInput.Control>
            {(value ?? []).map((value, index) => (
              <Fragment key={index}>
                <TagsInput.Tag index={index} value={value}>
                  <span>{value}</span>
                  <TagsInput.TagDeleteTrigger index={index} value={value}>
                    &#x2715;
                  </TagsInput.TagDeleteTrigger>
                </TagsInput.Tag>
                <TagsInput.TagInput index={index} value={value} />
              </Fragment>
            ))}
            <TagsInput.Field placeholder="Add tag" />
            <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
          </TagsInput.Control>
        </>
      )}
    </TagsInput.Root>
  )
}

export const WithDefaultValue = () => (
  <TagsInput defaultValue={['react', 'solid', 'vue']}>
    {({ value }) => (
      <TagsInputControl>
        {(value ?? []).map((value, index) => (
          <Fragment key={index}>
            <Tag index={index} value={value}>
              <span>{value}</span>
              <TagDeleteTrigger index={index} value={value}>
                &#x2715;
              </TagDeleteTrigger>
            </Tag>
            <TagInput index={index} value={value} />
          </Fragment>
        ))}
        <TagsInputField placeholder="Add tag" />
        <TagsInputClearTrigger>Clear all</TagsInputClearTrigger>
      </TagsInputControl>
    )}
  </TagsInput>
)
