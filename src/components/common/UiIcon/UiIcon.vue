<template>
  <Icon
    :icon="props.name"
    :width="props.width"
    :color="props.color"
  />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { IUiIcon } from '@/components/common/UiIcon/ui-icon.model';

const props = withDefaults(defineProps<IUiIcon>(), {
  width: 32,
});
</script>
