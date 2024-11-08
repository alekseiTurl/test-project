<template>
  <div class="ui-select">
    <ui-input
      :label="props.label"
      :model-value="inputValue"
      :view="props.view"
      :disable="props.disable"
      stack-label
      type="text"
    >
      <template #icon>
        <ui-icon
          name="ic:sharp-expand-more"
          width="24"
        />
      </template>
    </ui-input>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiInput from '@/components/common/UiInput/UiInput.vue';
import UiIcon from '@/components/common/UiIcon/UiIcon.vue';
import type { IUiSelect } from '@/components/common/UiSelect/ui-select.model';

const props = withDefaults(defineProps<IUiSelect>(), {
  view: 'primary',
});

const inputValue = computed(() => props.modelValue?.label || null);
</script>

<style scoped lang="scss">
.ui-select {
  cursor: pointer;
}
</style>
