<script lang="ts">
  import { useFocusVisible } from '@ark-ui/svelte/interaction'

  const isFocusVisible = useFocusVisible({ isTextInput: true })
  let focusedField = $state<string | null>(null)
</script>

<div class="container">
  <p class="status">Focus visible: {String(isFocusVisible())}</p>
  <div class="field">
    <label class="label" for="first-name">First Name</label>
    <input
      id="first-name"
      type="text"
      class="input"
      data-focus-visible={focusedField === 'first' && isFocusVisible() ? '' : undefined}
      onfocus={() => (focusedField = 'first')}
      onblur={() => (focusedField = null)}
    />
  </div>
  <div class="field">
    <label class="label" for="last-name">Last Name</label>
    <input
      id="last-name"
      type="text"
      class="input"
      data-focus-visible={focusedField === 'last' && isFocusVisible() ? '' : undefined}
      onfocus={() => (focusedField = 'last')}
      onblur={() => (focusedField = null)}
    />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    font-family: system-ui, sans-serif;
  }

  .status {
    font-size: 14px;
    color: #666;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .label {
    font-size: 14px;
    font-weight: 500;
  }

  .input {
    padding: 6px 10px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
  }

  .input[data-focus-visible] {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
</style>
