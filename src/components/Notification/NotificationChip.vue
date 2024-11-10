<template>
  <div
    :class="`notification-chip--${props.type}`"
    class="notification-chip"
  >
    {{ props.text }}
  </div>
</template>

<script setup lang="ts">
import type { INotificationChip } from './notification-chip.model';

const props = defineProps<INotificationChip>();
</script>

<style scoped lang="scss">
.notification-chip {
  position: fixed;
  top: auto;
  right: 50px;
  left: auto;
  bottom: 50px;
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  z-index: 10;

  &--success {
    background-color: var(--color-success);
  }

  &--error {
    background-color: var(--color-error);
  }
}
</style>
