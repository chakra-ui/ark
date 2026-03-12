<script lang="ts">
  import { useInteractionModality } from '@ark-ui/svelte/interaction'

  const modality = useInteractionModality()
</script>

<div class="container">
  <span class="badge" data-modality={modality()}>
    {modality() ?? 'none'}
  </span>
  <p class="hint">Try clicking, pressing a key, or using a screen reader.</p>
  <button type="button" class="button">Click or Tab to me</button>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    font-family: system-ui, sans-serif;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 500;
    background: #f0f0f0;
    color: #333;
    width: fit-content;
  }

  .badge[data-modality='keyboard'] {
    background: #dbeafe;
    color: #1d4ed8;
  }

  .badge[data-modality='pointer'] {
    background: #dcfce7;
    color: #15803d;
  }

  .badge[data-modality='virtual'] {
    background: #fef3c7;
    color: #b45309;
  }

  .hint {
    font-size: 14px;
    color: #666;
  }

  .button {
    padding: 8px 16px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: white;
    cursor: pointer;
    font-size: 14px;
    width: fit-content;
  }

  .button:hover {
    background: #f9fafb;
  }
</style>
