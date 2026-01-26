import { Carousel } from '@ark-ui/react/carousel'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
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
    <Carousel.Root className={styles.Root} slideCount={items.length} autoSize spacing="8px">
      <Carousel.Control className={styles.Control}>
        <Carousel.PrevTrigger className={styles.Trigger}>
          <ArrowLeftIcon />
        </Carousel.PrevTrigger>
        <Carousel.NextTrigger className={styles.Trigger}>
          <ArrowRightIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.ItemGroup className={styles.ItemGroup}>
        {items.map((item, index) => (
          <Carousel.Item key={item.id} index={index} snapAlign="center">
            <div className={styles.Slide} style={{ width: item.width, height: '6rem' }}>
              {item.label}
            </div>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Context>
        {(api) => (
          <Carousel.IndicatorGroup className={styles.IndicatorGroup}>
            {api.pageSnapPoints.map((_, index) => (
              <Carousel.Indicator className={styles.Indicator} key={index} index={index} />
            ))}
          </Carousel.IndicatorGroup>
        )}
      </Carousel.Context>
    </Carousel.Root>
  )
}
