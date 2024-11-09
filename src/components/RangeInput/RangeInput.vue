<template>
  <div class="range-input">
    <label class="range-input__title">{{ props.titleText }}</label>

    <div class="range-input__row">
      <ui-input
        :model-value="modelValue.from"
        :type="props.type"
        :view="props.view"
        :label="resolvedLabels.from"
        :range="props.range"
        right-text
        stack-label
        label-static
      />

      <ui-input
        :model-value="modelValue.to"
        :type="props.type"
        :view="props.view"
        :label="resolvedLabels.to"
        :range="props.range"
        right-text
        stack-label
        label-static
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UiInput from '@/components/common/UiInput/UiInput.vue';
import type { IRangeInput, IRangeInputValue } from '@/components/RangeInput/range-input.model';
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<IRangeInput>(), {
  type: 'number',
  view: 'primary',
});

const modelValue = ref<IRangeInputValue>({
  from: null,
  to: null,
});

const resolvedLabels = computed(() => {
  switch (props.type) {
    case 'date': {
      return {
        from: 'с',
        to: 'по',
      };
    }
    default: {
      return {
        from: 'от',
        to: 'до',
      };
    }
  }
});
</script>

<style scoped lang="scss">
.range-input {
  display: flex;
  flex-direction: column;

  &__title {
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 300;
    color: var(--color-blue);
  }

  &__row {
    display: flex;
    gap: 10px;
  }
}
</style>
