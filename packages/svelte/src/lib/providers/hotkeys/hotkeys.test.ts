import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import BasicExample from './examples/basic.svelte'
import ConflictsExample from './examples/conflicts.svelte'
import FormFieldsExample from './examples/form-fields.svelte'
import KeyStateExample from './examples/key-state.svelte'
import MultipleExample from './examples/multiple.svelte'
import RecorderExample from './examples/recorder.svelte'
import ScopesExample from './examples/scopes.svelte'
import SequenceExample from './examples/sequence.svelte'

describe('useHotkey', () => {
  it('should invoke the action when the hotkey is pressed', async () => {
    render(BasicExample)

    await user.keyboard('{Meta>}k{/Meta}')
    await user.keyboard('{Control>}k{/Control}')

    await waitFor(() => expect(screen.getByText(/^[12]$/)).toBeInTheDocument())
  })

  it('should stop firing after unmount', async () => {
    const { unmount } = render(BasicExample)
    unmount()

    await user.keyboard('{Meta>}k{/Meta}')
    expect(screen.queryByText('1')).not.toBeInTheDocument()
  })
})

describe('useHotkeys', () => {
  it('should register multiple hotkeys', async () => {
    render(MultipleExample)

    await user.keyboard('{Control>}z{/Control}')
    await user.keyboard('{Meta>}z{/Meta}')

    await waitFor(() => expect(document.querySelector('li[data-fired]')).toHaveTextContent('Undo'))
  })

  it('should support sequences', async () => {
    render(SequenceExample)

    await user.keyboard('g')
    await user.keyboard('s')

    await waitFor(() => expect(document.querySelector('li[data-fired]')).toHaveTextContent('Settings'))
  })
})

describe('key state', () => {
  it('should track pressed keys and modifiers', async () => {
    render(KeyStateExample)

    expect(screen.getByText('nothing')).toBeInTheDocument()

    const session = user.setup()
    await session.keyboard('{Shift>}')
    await waitFor(() => expect(screen.getByText('Precision mode')).toBeInTheDocument())

    await session.keyboard('{/Shift}')
    await waitFor(() => expect(screen.getByText('nothing')).toBeInTheDocument())
  })
})

describe('scopes', () => {
  it('should only fire commands within the active scope', async () => {
    render(ScopesExample)

    await user.keyboard('{Meta>}p{/Meta}')
    await user.keyboard('{Control>}p{/Control}')
    expect(document.querySelector('li[data-fired]')).toBeNull()

    await user.keyboard('{Meta>}b{/Meta}')
    await user.keyboard('{Control>}b{/Control}')
    await waitFor(() => expect(document.querySelector('li[data-fired]')).toHaveTextContent('Bold'))
  })
})

describe('enableOnFormTags', () => {
  it('should ignore a single key while typing but still fire modifiers and opt-ins', async () => {
    render(FormFieldsExample)

    const input = screen.getByLabelText('Note')
    await user.click(input)

    await user.keyboard('s')
    expect(input).toHaveValue('s')
    expect(screen.getByText('nothing yet')).toBeInTheDocument()

    await user.keyboard('{Control>}s{/Control}')
    await waitFor(() => expect(screen.getByText('Save (modifier)')).toBeInTheDocument())

    await user.keyboard('p')
    await waitFor(() => expect(screen.getByText('Preview (opted in)')).toBeInTheDocument())
  })
})

describe('conflictBehavior', () => {
  it('should keep both registrations by default', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    render(ConflictsExample)

    await waitFor(() => expect(screen.getByText('First')).toBeInTheDocument())
    expect(screen.getByText('Second')).toBeInTheDocument()

    warn.mockRestore()
  })

  it('should drop the earlier registration when replacing', async () => {
    render(ConflictsExample)

    await user.click(screen.getByRole('button', { name: 'replace' }))

    await waitFor(() => expect(screen.queryByText('First')).not.toBeInTheDocument())
    expect(screen.getByText('Second')).toBeInTheDocument()
  })
})

describe('recorder', () => {
  it('should record, clear and cancel', async () => {
    const session = user.setup()
    render(RecorderExample)

    await session.click(screen.getByRole('button'))
    await session.keyboard('{Control>}k{/Control}')
    await waitFor(() => expect(screen.getByText('recorded')).toBeInTheDocument(), { timeout: 3000 })

    await session.click(screen.getByRole('button'))
    await session.keyboard('{Backspace}')
    await waitFor(() => expect(screen.getByText('cleared')).toBeInTheDocument())

    await session.click(screen.getByRole('button'))
    await session.keyboard('{Escape}')
    await waitFor(() => expect(screen.getByText('cancelled')).toBeInTheDocument())
  })
})
