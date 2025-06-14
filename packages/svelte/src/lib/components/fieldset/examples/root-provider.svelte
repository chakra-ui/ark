<script lang="ts">
  import { Fieldset, useFieldset } from '@ark-ui/svelte/fieldset'

  const fieldset = useFieldset({ disabled: true })
</script>

<Fieldset.RootProvider value={fieldset}>
  <Fieldset.Legend>External State Management</Fieldset.Legend>
  <input type="text" placeholder="This input inherits disabled state" />
  <Fieldset.HelperText>Managed by external fieldset state</Fieldset.HelperText>
</Fieldset.RootProvider>

<Fieldset.Context>
  {#snippet render(fieldset)}
    <div style="margin-top: 1rem;">
      <p>Fieldset disabled: {fieldset().disabled}</p>
      <p>Fieldset invalid: {fieldset().invalid}</p>
    </div>
  {/snippet}
</Fieldset.Context>
