import user from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import { defineComponent } from 'vue'
import { ChakraToastProvider } from './stories/chakra-toast.provider'
import { useToast } from './toast-provider'

const ComponentUnderTest = defineComponent({
  setup() {
    const toast = useToast()

    return () => (
      <button
        onClick={() =>
          toast.value.create({
            title: 'Toast title',
            description: 'Toast description',
            removeDelay: 0,
          })
        }
      >
        Add toast
      </button>
    )
  },
})

const RenderedToastComponent = defineComponent({
  setup() {
    return () => (
      <ChakraToastProvider>
        <ComponentUnderTest />
      </ChakraToastProvider>
    )
  },
})

const renderToastComponent = () => render(RenderedToastComponent)

describe('Toast', () => {
  it('should render', async () => {
    renderToastComponent()
  })

  it('should show a toast message', async () => {
    const { getByText } = renderToastComponent()
    await user.click(getByText('Add toast'))
    expect(getByText('Toast title')).toBeInTheDocument()
    expect(getByText('Toast description')).toBeInTheDocument()
  })

  it('should hide a toast message after close button is clicked', async () => {
    const { getByText, queryByText } = renderToastComponent()
    await user.click(getByText('Add toast'))

    expect(getByText('Toast title')).toBeInTheDocument()
    expect(getByText('Toast description')).toBeInTheDocument()

    await user.click(getByText('Close'))

    expect(queryByText('Toast title')).toBeNull()
    expect(queryByText('Toast description')).toBeNull()
  })
})
