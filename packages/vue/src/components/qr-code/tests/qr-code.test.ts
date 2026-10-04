import { render, screen } from '@testing-library/vue'
import user from '@testing-library/user-event'
import ComponentUnderTest from './basic.vue'

describe('QrCode', () => {
  it('should emit value changes from context setValue', async () => {
    const { emitted } = render(ComponentUnderTest)

    await user.click(screen.getByRole('button', { name: 'Set value' }))

    expect(emitted('valueChange')).toEqual([[{ value: 'https://example.com' }]])
    expect(emitted('update:modelValue')).toEqual([['https://example.com']])
  })
})
