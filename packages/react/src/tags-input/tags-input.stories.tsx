import { Fragment, useState } from 'react'
import { Tag } from './tag'
import { TagDeleteButton } from './tag-delete-button'
import { TagInput } from './tag-input'
import { TagsInput } from './tags-input'
import { TagsInputClearButton } from './tags-input-clear-button'
import { TagsInputControl } from './tags-input-control'
import { TagsInputField } from './tags-input-field'
import './tags-input.css'

export const Basic = () => {
  const [value, setValue] = useState<string[]>(['react', 'solid', 'vue'])
  return (
    <TagsInput value={value} onChange={(e) => setValue(e.values)}>
      {({ value }) => (
        <TagsInputControl>
          {(value ?? []).map((value, index) => (
            <Fragment key={index}>
              <Tag index={index} value={value}>
                <span>{value}</span>
                <TagDeleteButton index={index} value={value}>
                  &#x2715;
                </TagDeleteButton>
              </Tag>
              <TagInput index={index} value={value} />
            </Fragment>
          ))}
          <TagsInputField placeholder="Add tag" />
          <TagsInputClearButton>Clear all</TagsInputClearButton>
        </TagsInputControl>
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
              <TagDeleteButton index={index} value={value}>
                &#x2715;
              </TagDeleteButton>
            </Tag>
            <TagInput index={index} value={value} />
          </Fragment>
        ))}
        <TagsInputField placeholder="Add tag" />
        <TagsInputClearButton>Clear all</TagsInputClearButton>
      </TagsInputControl>
    )}
  </TagsInput>
)
