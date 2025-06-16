<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
</script>

<Field.Root>
  <Field.Label>Country</Field.Label>
  <Field.Select>
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="uk">United Kingdom</option>
    <option value="de">Germany</option>
  </Field.Select>
  <Field.HelperText>Please select your country of residence</Field.HelperText>
</Field.Root>
