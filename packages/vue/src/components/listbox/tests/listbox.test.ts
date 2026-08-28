import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import ComponentUnderTest from './listbox.test.vue'

describe('Listbox', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(ComponentUnderTest)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should render all available options', async () => {
    render(ComponentUnderTest)
    await screen.findByRole('option', { name: 'React' })
    await screen.findByRole('option', { name: 'Solid' })
    await screen.findByRole('option', { name: 'Vue' })
  })

  it('should render disabled items with appropriate attributes', async () => {
    render(ComponentUnderTest)

    const svelte = await screen.findByRole('option', { name: 'Svelte' })
    expect(svelte).toHaveAttribute('aria-disabled', 'true')
  })

  it('should invoke valueChange event when an option is selected', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, {
      props: { onValueChange },
    })

    await user.click(await screen.findByRole('option', { name: 'React' }))

    expect(onValueChange).toHaveBeenNthCalledWith(1, {
      items: [{ label: 'React', value: 'react' }],
      value: ['react'],
    })
  })

  it('should invoke select event when an option is selected', async () => {
    const onSelect = vi.fn()
    render(ComponentUnderTest, {
      props: { onSelect },
    })

    await user.click(await screen.findByRole('option', { name: 'React' }))

    expect(onSelect).toHaveBeenCalledWith({ value: 'react' })
  })

  it('should mark the default selected option with aria-selected attribute', async () => {
    render(ComponentUnderTest, {
      props: { defaultValue: ['react'] },
    })
    const option = await screen.findByRole('option', { name: 'React' })

    expect(option).toHaveAttribute('aria-selected', 'true')
  })

  it('should allow multiple selections when selectionMode is multiple', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, {
      props: {
        defaultValue: ['react'],
        onValueChange,
        selectionMode: 'multiple',
      },
    })

    await user.click(await screen.findByRole('option', { name: 'Solid' }))

    expect(onValueChange).toHaveBeenNthCalledWith(1, {
      items: [
        { label: 'React', value: 'react' },
        { label: 'Solid', value: 'solid' },
      ],
      value: ['react', 'solid'],
    })
  })

  it('should update v-model when an option is selected', async () => {
    const onUpdateModelValue = vi.fn()
    render(ComponentUnderTest, {
      props: {
        modelValue: [],
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    await user.click(await screen.findByRole('option', { name: 'React' }))

    expect(onUpdateModelValue).toHaveBeenCalledWith(['react'])
  })
})
