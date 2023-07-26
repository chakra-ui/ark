import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Fragment } from 'react'
import {
  Tag,
  TagDeleteTrigger,
  TagInput,
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputField,
  type TagsInputProps,
} from './'

const ComponentUnderTest = (props: Omit<TagsInputProps, 'children'>) => (
  <TagsInput defaultValue={['react', 'solid', 'vue']} {...props}>
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

describe('TagsInput', () => {
  it('should render', async () => {
    render(<ComponentUnderTest />)
  })

  it('should allow to add a new item', async () => {
    render(<ComponentUnderTest />)
    const input = screen.getByPlaceholderText('Add tag')
    await user.type(input, 'angular')
    await user.keyboard('[Enter]')

    expect(screen.getByText('angular')).toBeInTheDocument()
  })

  it('should allow to add and delete a new item', async () => {
    render(<ComponentUnderTest />)
    const input = screen.getByPlaceholderText('Add tag')
    await user.type(input, 'angular')
    await user.keyboard('[Enter]')

    expect(screen.getByText('angular')).toBeInTheDocument()

    await user.keyboard('[ArrowLeft]')
    await user.keyboard('[Delete]')

    expect(screen.queryByText('angular')).toBeNull()
  })

  it('should allow to modify an added item', async () => {
    render(<ComponentUnderTest />)
    await user.type(screen.getByPlaceholderText('Add tag'), 'angular')
    await user.keyboard('[Enter]')

    expect(screen.getByText('angular')).toBeInTheDocument()

    await user.keyboard('[ArrowLeft]')
    await user.keyboard('[Enter]')
    await user.keyboard('[Backspace]')

    const input = screen.getByLabelText(
      'Editing tag angular. Press enter to save or escape to cancel.',
    )
    await user.clear(input)
    await user.type(input, 'svelte')
    await user.keyboard('[Enter]')

    expect(await screen.findByText('svelte')).toBeInTheDocument()
  })

  it('should clear all item when clear all button is clicked', async () => {
    render(<ComponentUnderTest />)
    expect(screen.getByText('react')).toBeInTheDocument()
    expect(screen.getByText('solid')).toBeInTheDocument()
    expect(screen.getByText('vue')).toBeInTheDocument()
    await user.click(screen.getByText('Clear all'))

    expect(screen.queryByText('react')).toBeNull()
    expect(screen.queryByText('solid')).toBeNull()
    expect(screen.queryByText('vue')).toBeNull()
  })
})
