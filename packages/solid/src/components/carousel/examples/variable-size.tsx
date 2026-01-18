import { Carousel } from '@ark-ui/solid/carousel'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/carousel.module.css'

const items = [
  { id: '1', width: '120px', label: 'Small' },
  { id: '2', width: '200px', label: 'Medium Size' },
  { id: '3', width: '80px', label: 'XS' },
  { id: '4', width: '250px', label: 'Large Content Here' },
  { id: '5', width: '150px', label: 'Regular' },
]

export const VariableSize = () => {
  return (
    <Carousel.Root class={styles.Root} slideCount={items.length} autoSize spacing="8px">
      <Carousel.Control class={styles.Control}>
        <Carousel.PrevTrigger class={styles.Trigger}>
          <ArrowLeftIcon />
        </Carousel.PrevTrigger>
        <Carousel.NextTrigger class={styles.Trigger}>
          <ArrowRightIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.ItemGroup class={styles.ItemGroup}>
        <For each={items}>
          {(item, index) => (
            <Carousel.Item index={index()} snapAlign="center">
              <div class={styles.Slide} style={{ width: item.width, height: '6rem' }}>
                {item.label}
              </div>
            </Carousel.Item>
          )}
        </For>
      </Carousel.ItemGroup>
      <Carousel.Context>
        {(api) => (
          <Carousel.IndicatorGroup class={styles.IndicatorGroup}>
            <For each={api().pageSnapPoints}>
              {(_, index) => <Carousel.Indicator class={styles.Indicator} index={index()} />}
            </For>
          </Carousel.IndicatorGroup>
        )}
      </Carousel.Context>
    </Carousel.Root>
  )
}
