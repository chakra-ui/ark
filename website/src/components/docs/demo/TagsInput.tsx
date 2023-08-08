import { tagsInput } from '@/panda/recipes'
import { TagsInput } from '@ark-ui/react'
import { Fragment } from 'react'

export const DemoTagsInput = () => {
  return (
    <TagsInput.Root defaultValue={['React', 'Solid', 'Vue']} className={tagsInput()}>
      {({ value }) => (
        <TagsInput.Control>
          {(value ?? []).map((value, index) => (
            <Fragment key={index}>
              <TagsInput.Tag index={index} value={value}>
                {value}
                <TagsInput.TagDeleteTrigger index={index} value={value}>
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
                </TagsInput.TagDeleteTrigger>
              </TagsInput.Tag>
              <TagsInput.TagInput index={index} value={value} />
            </Fragment>
          ))}
          <TagsInput.Input placeholder="Add tag" />
        </TagsInput.Control>
      )}
    </TagsInput.Root>
  )
}
