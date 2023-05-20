import { tagsInput } from '@/panda/recipes'
import {
  Tag,
  TagDeleteTrigger,
  TagInput,
  TagsInput,
  TagsInputControl,
  TagsInputField,
} from '@ark-ui/react'
import { Fragment } from 'react'

export const DemoTagsInput = () => {
  return (
    <TagsInput defaultValue={['React', 'Solid', 'Vue']} className={tagsInput()}>
      {({ value }) => (
        <TagsInputControl>
          {(value ?? []).map((value, index) => (
            <Fragment key={index}>
              <Tag index={index} value={value}>
                {value}
                <TagDeleteTrigger index={index} value={value}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 3L3 9M3 3L9 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </TagDeleteTrigger>
              </Tag>
              <TagInput index={index} value={value} />
            </Fragment>
          ))}
          <TagsInputField placeholder="Add tag" />
        </TagsInputControl>
      )}
    </TagsInput>
  )
}
