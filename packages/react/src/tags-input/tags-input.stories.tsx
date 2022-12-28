import { Fragment, useState } from 'react'
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
                  {/* <TagDeleteTrigger index={index} value={value}>
                    <button>&#x2715;</button>
                  </TagDeleteTrigger> */}
                </Tag>
                <TagInput index={index} value={value} />
              </Fragment>
            ))}
            <TagsInputField placeholder="Add tag" />
            <TagsInputClearTrigger>
              <button>Clear all</button>
            </TagsInputClearTrigger>
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
                <button>&#x2715;</button>
              </TagDeleteTrigger>
            </Tag>
            <TagInput index={index} value={value} />
          </Fragment>
        ))}
        <TagsInputField placeholder="Add tag" />
        <TagsInputClearTrigger>
          <button>Clear all</button>
        </TagsInputClearTrigger>
      </TagsInputControl>
    )}
  </TagsInput>
)
