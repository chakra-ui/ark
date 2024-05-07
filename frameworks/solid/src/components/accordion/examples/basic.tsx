import { ChevronDownIcon } from 'lucide-solid'
import { Index, createSignal } from 'solid-js'
import { Accordion } from '../..'
import { LocaleProvider } from '../../../providers'

export const Basic = () => {
  const [locale, setLocale] = createSignal('en-US')
  return (
    <div>
      <button type="button" onClick={() => setLocale('ar-BH')}>
        Click me {locale()}
      </button>
      <LocaleProvider locale={locale()}>
        <Accordion.Root value={['React']}>
          <Index each={['React', 'Solid', 'Vue']}>
            {(item) => (
              <Accordion.Item value={item()}>
                <Accordion.ItemTrigger>
                  What is {item()}?
                  <Accordion.ItemIndicator>
                    <ChevronDownIcon />
                  </Accordion.ItemIndicator>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  {item()} is a JavaScript library for building user interfaces.
                </Accordion.ItemContent>
              </Accordion.Item>
            )}
          </Index>
        </Accordion.Root>
      </LocaleProvider>
    </div>
  )
}
