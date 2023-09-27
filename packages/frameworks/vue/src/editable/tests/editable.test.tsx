import user from '@testing-library/user-event'
import { fireEvent, render, waitFor } from '@testing-library/vue'
import CustomControlStory from './editable.test.vue'

describe('Editable', () => {
  it('should render', () => {
    render(CustomControlStory)
  })

  it.skip('should be possible to dbl click the placeholder to enter a value', async () => {
    const { getByTestId, findByText, container } = render(CustomControlStory)

    const input = getByTestId('edit-input')
    const preview = container.querySelector('[data-part="preview"]')

    if (preview) {
      await user.dblClick(preview)
    }
    expect(input).toBeVisible()

    await user.type(input, 'React')

    expect(input).toHaveValue('React')

    await fireEvent.click(window)

    await waitFor(() => expect(findByText('React')).toBeInTheDocument())
  })

  it('should be possible to edit a value', async () => {
    const { getByRole, findByText, getByText } = render(CustomControlStory, {
      props: { modelValue: 'React' },
    })

    await user.dblClick(getByText('React'))

    const input = getByRole('textbox')
    await user.clear(input)
    await user.type(input, 'Solid')
    await user.click(getByText('Save'))

    expect(await findByText('Solid')).toBeInTheDocument()
  })
})
