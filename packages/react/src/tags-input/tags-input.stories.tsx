import type { Meta } from '@storybook/react'
import { Fragment, useState } from 'react'
import {
  Tag,
  TagDeleteTrigger,
  TagInput,
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputLabel,
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
    <TagsInput value={value} onChange={(e) => setValue(e.values)}>
      {({ value }) => (
        <>
          <TagsInputLabel>Label</TagsInputLabel>
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
            <TagsInputInput placeholder="Add tag" />
            <TagsInputClearTrigger>Clear all</TagsInputClearTrigger>
          </TagsInputControl>
        </>
      )}
    </TagsInput>
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
        <TagsInputInput placeholder="Add tag" />
        <TagsInputClearTrigger>Clear all</TagsInputClearTrigger>
      </TagsInputControl>
    )}
  </TagsInput>
)
