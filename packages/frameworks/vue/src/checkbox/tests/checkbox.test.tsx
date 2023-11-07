import { checkboxAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import { Fragment, defineComponent, ref } from 'vue'
import { getParts } from '../../setup-test'
import ComponentUnderTest from './checkbox.test.vue'

describe('Checkbox', () => {
  it.each(getParts(checkboxAnatomy))('should render part %s', async (part) => {
    render(ComponentUnderTest)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it('should render', async () => {
    render(ComponentUnderTest)
  })

  it('should handle check and unchecked', async () => {
    const onCheckedChange = vi.fn()
    const { getByRole } = render(ComponentUnderTest, { props: { onCheckedChange } })

    const checkbox = getByRole('checkbox')

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('should allow controlled usage', async () => {
    const ControlledComponentUnderTest = defineComponent({
      setup() {
        const checked = ref(false)

        return () => (
          <Fragment>
            <button onClick={() => (checked.value = true)}>set checked</button>
            <ComponentUnderTest checked={checked.value} />
          </Fragment>
        )
      },
    })

    const { getByRole, getByText } = render(ControlledComponentUnderTest)

    expect(getByRole('checkbox')).not.toBeChecked()
    await user.click(getByText('set checked'))
    expect(getByRole('checkbox')).toBeChecked()
  })

  it('should handle indeterminate state from example', async () => {
    const { getByTestId } = render(ComponentUnderTest, { props: { modelValue: 'indeterminate' } })
    expect(getByTestId('control')).toHaveAttribute('data-state', 'indeterminate')
  })
})
