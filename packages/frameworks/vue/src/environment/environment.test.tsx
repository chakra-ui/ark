import { render, screen } from '@testing-library/vue'
import { Environment } from './environment'
import PrintEnvironment from './stories/print-environment.vue'

describe('Environment', () => {
  it('should have access to the environment values', () => {
    render({
      components: { Environment, PrintEnvironment },
      template: `
        <Environment :value='document'>
          <PrintEnvironment />
        </Environment>
      `,
    })

    expect(screen.getByLabelText('environment values').innerHTML).not.toBe('""')
  })
})
