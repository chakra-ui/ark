import { render } from '@testing-library/vue'
import ComponentUnderTest from './examples/basic.vue'

describe('Environment', () => {
  it('should have access to the environment values', () => {
    render(ComponentUnderTest)
  })
})
