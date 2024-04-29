import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Accordion } from '../..'
import { LocaleProvider } from '../../../providers'

export const Basic = () => {
  const [locale, setLocale] = useState('ar-AE')

  return (
    <div>
      <button type="button" onClick={() => setLocale('en-US')}>
        Change Locale
      </button>
      <LocaleProvider locale={locale}>
        <Accordion.Root>
          {['React', 'Solid', 'Vue'].map((item) => (
            <Accordion.Item key={item} value={item}>
              <Accordion.ItemTrigger>
                What is {item}?
                <Accordion.ItemIndicator>
                  <ChevronDownIcon />
                </Accordion.ItemIndicator>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                {item} is a JavaScript library for building user interfaces.
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </LocaleProvider>
    </div>
  )
}
