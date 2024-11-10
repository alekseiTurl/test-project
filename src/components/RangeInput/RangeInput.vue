<template>
  <div class="range-input">
    <label class="range-input__title">{{ props.titleText }}</label>

    <div class="range-input__row">
      <ui-input
        v-model:model-value="fromValue"
        :error="errorFrom"
        :type="props.type"
        :view="props.view"
        :label="resolvedLabels.from"
        :range="props.range"
        @update:model-value="modelValue.from = updateValue($event)"
        right-text
        stack-label
        label-static
      />

      <ui-input
        v-model:model-value="toValue"
        :error="errorTo"
        :type="props.type"
        :view="props.view"
        :label="resolvedLabels.to"
        :range="props.range"
        @update:model-value="modelValue.to = updateValue($event)"
        right-text
        stack-label
        label-static
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UiInput from '@/components/common/UiInput/UiInput.vue';
import type { IRangeInput } from '@/components/RangeInput/range-input.model';
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<IRangeInput>(), {
  type: 'number',
  view: 'primary',
});

const fromValue = ref(props.modelValue.from);
const toValue = ref(props.modelValue.to);

const errorFrom = computed(() => props.error?.filter((item) => item.$property === 'from'));
const errorTo = computed(() => props.error?.filter((item) => item.$property === 'to'));

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

const updateValue = (val: string | number | null) => {
  if (props.type === 'date' && typeof val === 'string') {
    return Date.parse(val);
  } else return val;
};
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
    justify-content: space-between;
    gap: 10px;

    @include md-screen {
      flex-wrap: wrap;
    }

    & .ui-input {
      width: 100%;
    }
  }
}
</style>
