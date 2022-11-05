import { TagsInput } from './tags-input'

export const Basic = () => (
  <TagsInput value={['react']}>
    {({ value }) => (
      <>
        {(value ?? []).map((value, index) => (
          <span key={index}>
            {/* <div {...api.getTagProps({ index, value })}> */}
            <span>{value} </span>
            {/* <button {...api.getTagDeleteButtonProps({ index, value })}>&#x2715;</button> */}
            {/* </div> */}
            {/* <input {...api.getTagInputProps({ index, value })} /> */}
          </span>
        ))}
      </>
    )}
  </TagsInput>
)
