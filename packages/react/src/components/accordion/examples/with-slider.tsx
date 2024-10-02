import { Accordion } from '@ark-ui/react/accordion'
import { Slider } from '@ark-ui/react/slider'

export const WithSlider = () => {
  return (
    <Accordion.Root defaultValue={['React']}>
      {['React', 'Solid', 'Vue'].map((item) => (
        <Accordion.Item key={item} value={item}>
          <Accordion.ItemTrigger>What is {item}?</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            {item} is a JavaScript library for building user interfaces.
            <Slider.Root style={{ marginBlock: '20px' }}>
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumb index={0} />
              </Slider.Control>
            </Slider.Root>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
