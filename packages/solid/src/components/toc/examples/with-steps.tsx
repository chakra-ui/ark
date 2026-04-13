import { Steps } from '@ark-ui/solid/steps'
import { Toc, type TocActiveChangeDetails } from '@ark-ui/solid/toc'
import { createSignal, For } from 'solid-js'
import button from 'styles/button.module.css'
import stepsStyles from 'styles/steps.module.css'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const p = loremIpsum({ count: 6, units: 'paragraphs' })

const items = [
  { value: 'setup', depth: 2, label: 'Setup' },
  { value: 'configuration', depth: 2, label: 'Configuration' },
  { value: 'deployment', depth: 2, label: 'Deployment' },
  { value: 'monitoring', depth: 2, label: 'Monitoring' },
]

export const WithSteps = () => {
  const [step, setStep] = createSignal(0)

  const handleStepChange = (d: { step: number }) => {
    setStep(d.step)
    document.getElementById(items[d.step]?.value)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleActiveChange = (d: TocActiveChangeDetails) => {
    const index = items.findIndex((item) => item.value === d.activeIds[0])
    if (index >= 0) setStep(index)
  }

  return (
    <Toc.Root class={styles.Root} items={items} onActiveChange={handleActiveChange}>
      <Toc.Content class={styles.Content}>
        <For each={items}>
          {(item) => (
            <section>
              <h2 id={item.value}>{item.label}</h2>
              <p>{p}</p>
            </section>
          )}
        </For>
      </Toc.Content>

      <Toc.Nav class={styles.Nav}>
        <Steps.Root class={stepsStyles.Root} count={items.length} step={step()} onStepChange={handleStepChange}>
          <Steps.List class={stepsStyles.List}>
            <For each={items}>
              {(item, index) => (
                <Steps.Item class={stepsStyles.Item} index={index()}>
                  <Steps.Trigger class={stepsStyles.Trigger}>
                    <Steps.Indicator class={stepsStyles.Indicator}>{index() + 1}</Steps.Indicator>
                    <span>{item.label}</span>
                  </Steps.Trigger>
                  <Steps.Separator class={stepsStyles.Separator} />
                </Steps.Item>
              )}
            </For>
          </Steps.List>
          <div class={stepsStyles.Actions}>
            <Steps.PrevTrigger class={button.Root}>← Back</Steps.PrevTrigger>
            <Steps.NextTrigger class={button.Root} data-variant="solid">
              Next →
            </Steps.NextTrigger>
          </div>
        </Steps.Root>
      </Toc.Nav>
    </Toc.Root>
  )
}
