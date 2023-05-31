import user from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import { Fragment, defineComponent, ref } from 'vue'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel, type CheckboxProps } from '.'
import BasicComponentStory from './stories/basic.stories.vue'

const ComponentUnderTest = (props: CheckboxProps) => (
  <Checkbox {...props}>
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxInput />
    <CheckboxControl data-testid="control" />
  </Checkbox>
)
describe('Checkbox', () => {
  it('should render', async () => {
    render(BasicComponentStory)
  })

  it('should handle check and unchecked', async () => {
    const onChange = vi.fn()
    const { getByRole } = render(() => <ComponentUnderTest onChange={onChange} />)

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
    const { getByTestId } = render(() => <ComponentUnderTest modelValue={'indeterminate'} />)
    expect(getByTestId('control')).toHaveAttribute('data-indeterminate')
  })
})
