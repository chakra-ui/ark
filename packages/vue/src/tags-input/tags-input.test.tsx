import user from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import { nextTick } from 'vue'
import TagsInputComponentStory from './tags-input.stories.vue'

const ANGULAR_VAL = 'angular'

describe('TagsInput', () => {
  it('should render', () => {
    render(TagsInputComponentStory)
  })

  it('should allow to add a new item', async () => {
    const { getByPlaceholderText, getByText } = render(TagsInputComponentStory)
    const input = getByPlaceholderText('Add tag')
    await user.type(input, ANGULAR_VAL)
    await user.keyboard('[Enter]')

    expect(input).not.toHaveValue(ANGULAR_VAL)
    expect(getByText(ANGULAR_VAL)).toBeInTheDocument()
  })

  it('should allow to add and delete a new item', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(TagsInputComponentStory)
    const input = getByPlaceholderText('Add tag')
    await user.type(input, ANGULAR_VAL)
    await user.keyboard('[Enter]')

    expect(getByText(ANGULAR_VAL)).toBeInTheDocument()

    await user.keyboard('[ArrowLeft]')
    await user.keyboard('[Delete]')

    expect(queryByText(ANGULAR_VAL)).toBeNull()
  })

  it('should allow to modify an added item', async () => {
    const { getByPlaceholderText, getByText, getByLabelText, findByText } =
      render(TagsInputComponentStory)
    await user.type(getByPlaceholderText('Add tag'), ANGULAR_VAL)
    await user.keyboard('[Enter]')

    expect(getByText(ANGULAR_VAL)).toBeInTheDocument()

    await user.keyboard('[ArrowLeft]')
    await user.keyboard('[Enter]')
    await user.keyboard('[Backspace]')

    const input = getByLabelText('Editing tag angular. Press enter to save or escape to cancel.')
    await user.clear(input)
    await user.type(input, 'svelte')
    await user.keyboard('[Enter]')

    expect(await findByText('svelte')).toBeInTheDocument()
  })

  it('should clear all item when clear all button is clicked', async () => {
    const { getByText, queryByText } = render(TagsInputComponentStory)
    await nextTick()
    expect(getByText('react')).toBeInTheDocument()
    expect(getByText('solid')).toBeInTheDocument()
    expect(getByText('vue')).toBeInTheDocument()
    await user.click(getByText('Clear all'))

    expect(queryByText('react')).toBeNull()
    expect(queryByText('solid')).toBeNull()
    expect(queryByText('vue')).toBeNull()
  })
})
