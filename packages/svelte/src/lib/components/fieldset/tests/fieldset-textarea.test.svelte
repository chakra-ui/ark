<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { Fieldset } from '@ark-ui/svelte/fieldset'

  let { onRender }: { onRender: () => void } = $props()

  const track = (fieldset: unknown) => {
    void fieldset
    onRender()
    return ''
  }
</script>

<Fieldset.Root>
  <Fieldset.Legend>Legend</Fieldset.Legend>
  <Field.Root>
    <Field.Label>Summary</Field.Label>
    <Field.Textarea value="hello" />
  </Field.Root>
  <Fieldset.Context>
    {#snippet render(fieldset)}
      {track(fieldset())}
    {/snippet}
  </Fieldset.Context>
</Fieldset.Root>
