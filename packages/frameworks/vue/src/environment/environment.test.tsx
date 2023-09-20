import { render } from '@testing-library/vue'
import { Environment } from './environment'
import PrintEnvironment from './stories/print-environment.vue'

describe('Environment', () => {
  it('should have access to the environment values', () => {
    const { getByLabelText } = render({
      components: { Environment, PrintEnvironment },
      template: `
        <Environment :value='document'>
          <PrintEnvironment />
        </Environment>
      `,
    })

    expect(getByLabelText('environment values').innerHTML).not.toBe('""')
  })
})
