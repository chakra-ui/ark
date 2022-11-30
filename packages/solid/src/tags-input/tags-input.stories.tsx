import { Tag } from './tag'
import { TagDeleteButton } from './tag-delete-button'
import { TagInput } from './tag-input'
import { TagsInput } from './tags-input'
import { TagsInputClearButton } from './tags-input-clear-button'
import { TagsInputControl } from './tags-input-control'
import { TagsInputField } from './tags-input-field'
import './tags-input.css'

export const Basic = () => (
  <TagsInput defaultValue={['react', 'solid', 'vue']}>
    {({ value }) => (
      <TagsInputControl>
        {(value ?? []).map((value, index) => (
          <>
            <Tag index={index} value={value}>
              <span>{value}</span>
              <TagDeleteButton index={index} value={value}>
                &#x2715;
              </TagDeleteButton>
            </Tag>
            <TagInput index={index} value={value} />
          </>
        ))}
        <TagsInputField placeholder="Add tag" />
        <TagsInputClearButton>Clear all</TagsInputClearButton>
      </TagsInputControl>
    )}
  </TagsInput>
)
