import { Steps } from '@ark-ui/react/steps'
import { css } from 'styled-system/css'
import { HStack } from 'styled-system/jsx'
import { circle, flex, hstack, stack } from 'styled-system/patterns'
import { button } from 'styled-system/recipes'

const items = [
  { value: 'first', title: 'First', description: 'Contact Info' },
  { value: 'second', title: 'Second', description: 'Date & Time' },
  { value: 'third', title: 'Third', description: 'Select Rooms' },
]

export const Demo = () => {
  return (
    <Steps.Root count={items.length} className={stack({ gap: '4', w: 'full' })}>
      <Steps.List className={flex({ gap: '2', flex: '1', w: 'full' })}>
        {items.map((item, index) => (
          <Steps.Item
            key={index}
            data-last={index === items.length - 1 ? '' : undefined}
            index={index}
            className={hstack({ flex: '1', '&[data-last]': { flex: '0' } })}
          >
            <Steps.Trigger className={hstack()}>
              <Steps.Indicator
                className={circle({
                  size: '8',
                  bg: 'bg.emphasized',
                  textStyle: 'sm',
                  fontWeight: 'medium',
                  _current: {
                    bg: 'color-palette.default',
                    color: 'color-palette.fg',
                  },
                  '&[data-complete]': {
                    bg: 'color-palette.default',
                    color: 'color-palette.fg',
                  },
                })}
              >
                {index + 1}
              </Steps.Indicator>
              <span>{item.title}</span>
            </Steps.Trigger>
            <Steps.Separator
              hidden={index === items.length - 1}
              className={css({
                h: '1px',
                bg: 'border.default',
                flex: '1',
              })}
            />
          </Steps.Item>
        ))}
      </Steps.List>

      {items.map((item, index) => (
        <Steps.Content key={index} index={index}>
          {item.title} - {item.description}
        </Steps.Content>
      ))}

      <Steps.CompletedContent>
        Steps Complete - Thank you for filling out the form!
      </Steps.CompletedContent>

      <HStack>
        <Steps.PrevTrigger className={button({ variant: 'outline' })}>Back</Steps.PrevTrigger>
        <Steps.NextTrigger className={button({ variant: 'outline' })}>Next</Steps.NextTrigger>
      </HStack>
    </Steps.Root>
  )
}
