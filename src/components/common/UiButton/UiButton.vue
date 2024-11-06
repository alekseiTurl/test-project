<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    :class="`ui-button--${props.view}`"
    class="ui-button"
  >
    {{ props.text }}
  </button>
</template>

<script setup lang="ts">
import type { IUiButton } from './ui-button.model';

const props = withDefaults(defineProps<IUiButton>(), {
  text: 'Ок',
  type: 'button',
  disabled: false,
  view: 'primary',
});
</script>

<style scoped lang="scss">
.ui-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 40px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: opacity var(--base-transition);

  @include on-hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 1;
  }

  &--primary {
    background: var(--color-primary);
    color: var(--color-text-white);
    border-radius: 20px;
  }
}
</style>
