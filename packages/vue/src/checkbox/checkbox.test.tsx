import user from '@testing-library/user-event'
import { render, waitFor } from '@testing-library/vue'
import { Fragment, defineComponent, ref } from 'vue'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel, type CheckboxProps } from '.'
import BasicComponentStory from './stories/basic.stories.vue'
import IndeterminateComponentStory from './stories/indeterminate.stories.vue'

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
    const { getByRole } = render(ComponentUnderTest, { props: { onChange } })

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
    await waitFor(() => expect(getByRole('checkbox')).toBeChecked())
  })

  it('should handle indeterminate state from example', async () => {
    const { getByTestId, getByText } = render(IndeterminateComponentStory)

    const parentControl = getByTestId('parent-control')
    expect(parentControl).not.toHaveAttribute('data-indeterminate')

    const childOneChecbox = getByText('Child One Checkbox')
    await user.click(childOneChecbox)
    expect(getByTestId('child-one-input')).toBeChecked()

    expect(parentControl).toHaveAttribute('data-indeterminate')

    const childTwoChecbox = getByText('Child Two Checkbox')
    await user.click(childTwoChecbox)
    expect(getByTestId('child-two-input')).toBeChecked()

    expect(parentControl).not.toHaveAttribute('data-indeterminate')
    expect(parentControl).toHaveAttribute('data-checked')

    await user.click(parentControl)
    expect(parentControl).not.toHaveAttribute('data-checked')
    expect(parentControl).not.toHaveAttribute('data-indeterminate')
    expect(getByTestId('child-one-input')).not.toBeChecked()
    expect(getByTestId('child-two-input')).not.toBeChecked()
  })
})
