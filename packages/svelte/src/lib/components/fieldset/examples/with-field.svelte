<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { Fieldset } from '@ark-ui/svelte/fieldset'
</script>

<Fieldset.Root>
  <Fieldset.Legend>Personal Information</Fieldset.Legend>

  <Field.Root>
    <Field.Label>First Name</Field.Label>
    <Field.Input placeholder="Enter your first name" />
  </Field.Root>

  <Field.Root>
    <Field.Label>Last Name</Field.Label>
    <Field.Input placeholder="Enter your last name" />
  </Field.Root>

  <Field.Root>
    <Field.Label>Email</Field.Label>
    <Field.Input type="email" placeholder="Enter your email" />
    <Field.HelperText>We'll never share your email</Field.HelperText>
  </Field.Root>

  <Fieldset.HelperText>Please fill out all required fields</Fieldset.HelperText>
</Fieldset.Root>
