<script lang="ts">
  import { Fieldset } from '@ark-ui/svelte/fieldset'
</script>

<Fieldset.Root invalid>
  <Fieldset.Legend>Invalid Fieldset</Fieldset.Legend>
  <input type="email" value="invalid-email" />
  <Fieldset.ErrorText>Please provide a valid email address</Fieldset.ErrorText>
</Fieldset.Root>
