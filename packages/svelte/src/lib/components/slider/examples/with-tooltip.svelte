<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Slider } from '@ark-ui/svelte/slider'
  import { Tooltip } from '@ark-ui/svelte/tooltip'
  import styles from 'styles/slider.module.css'
  import tooltip from 'styles/tooltip.module.css'

  const thumbId = $props.id()
  let open = $state(false)
</script>

<Slider.Root class={styles.Root} defaultValue={[40]} ids={{ thumb: () => thumbId }}>
  <Slider.Label class={styles.Label}>Volume</Slider.Label>
  <Slider.Control class={styles.Control}>
    <Slider.Track class={styles.Track}>
      <Slider.Range class={styles.Range} />
    </Slider.Track>
    <Slider.Context>
      {#snippet render(slider)}
        <Tooltip.Root
          ids={{ trigger: thumbId }}
          bind:open={() => open || slider().dragging, (value) => (open = value)}
          openDelay={0}
          closeOnClick={false}
          closeOnPointerDown={false}
          positioning={{ placement: 'top' }}
        >
          <Tooltip.Trigger>
            {#snippet render(props)}
              <Slider.Thumb index={0} {...props({ class: styles.Thumb })}>
                <Slider.HiddenInput />
              </Slider.Thumb>
            {/snippet}
          </Tooltip.Trigger>
          <Portal>
            <Tooltip.Positioner class={tooltip.Positioner}>
              <Tooltip.Content class={tooltip.Content}>{slider().value[0]}</Tooltip.Content>
            </Tooltip.Positioner>
          </Portal>
        </Tooltip.Root>
      {/snippet}
    </Slider.Context>
  </Slider.Control>
</Slider.Root>
