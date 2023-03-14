import { render } from '@testing-library/vue'
import { defineComponent } from 'vue'
import { Environment } from './environment'
import PrintEnvironment from './stories/print-environment.vue'

const ComponentUnderTest = defineComponent({
  setup() {
    return () => (
      <Environment value={document}>
        <PrintEnvironment />
      </Environment>
    )
  },
})

describe('Environment', () => {
  it('should have access to the environment values', () => {
    const { getByLabelText } = render(ComponentUnderTest)

    expect(getByLabelText('environment values').innerHTML).not.toBe('""')
  })
})
