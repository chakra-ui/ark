import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import ComponentUnderTest from './presence.test.vue'

describe('Presence', () => {
  it('should control presence when not lazy mounting and not unmounting on exit', async () => {
    render(ComponentUnderTest)
    expect(screen.queryByTestId('box')).not.toBeVisible()

    await user.click(screen.getByRole('button'))
    expect(screen.queryByTestId('box')).toBeVisible()

    await user.click(screen.getByRole('button'))
    expect(screen.queryByTestId('box')).not.toBeVisible()
  })

  it('should control presence when lazy mounting and not unmounting on exit', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true } })
    expect(screen.queryByTestId('box')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    expect(screen.queryByTestId('box')).toBeVisible()

    await user.click(screen.getByRole('button'))
    expect(screen.queryByTestId('box')).not.toBeVisible()
  })

  it('should control presence when not lazy mounting and unmounting on exit ', async () => {
    render(ComponentUnderTest, { props: { unmountOnExit: true } })
    expect(screen.queryByTestId('box')).not.toBeVisible()

    await user.click(screen.getByRole('button'))
    expect(screen.queryByTestId('box')).toBeVisible()

    await user.click(screen.getByRole('button'))
    expect(screen.queryByTestId('box')).not.toBeInTheDocument()
  })

  it('should control presence when lazy mounting and unmounting on exit', async () => {
    render(ComponentUnderTest, { props: { unmountOnExit: true, lazyMount: true } })

    expect(screen.queryByTestId('box')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    expect(screen.queryByTestId('box')).toBeVisible()

    await user.click(screen.getByRole('button'))
    expect(screen.queryByTestId('box')).not.toBeInTheDocument()
  })
})
