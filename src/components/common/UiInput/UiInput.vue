<template>
  <div
    :class="`ui-input--${props.view}`"
    class="ui-input"
  >
    <input
      v-bind="$attrs"
      v-model="inputValue"
      :type="props.type"
      :placeholder="props.stackLabel ? '' : props.placeholder"
    />
    <label v-if="props.stackLabel">{{ props.label }}</label>
  </div>
</template>

<script setup lang="ts">
import type { IUiInput } from '@/components/common/UiInput/ui-input.model';
import { computed } from 'vue';

const props = withDefaults(defineProps<IUiInput>(), {
  type: 'text',
  view: 'primary',
  placeholder: 'Введите текст',
});

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(v: string | number | null) {
    emits('update:modelValue', v);
  },
});

const emits = defineEmits<{
  (e: 'update:modelValue', v: string | number | null): void;
}>();

defineOptions({
  inheritAttrs: false,
});
</script>

<style scoped lang="scss">
.ui-input {
  position: relative;
  display: flex;
  min-height: 64px;

  & input {
    width: 100%;
    min-height: 100%;
    padding: 10px 20px;

    border-radius: 5px;
    font-size: 18px;

    transition: border-color var(--base-transition);

    &::placeholder {
      color: var(--color-blue);
      font-size: 16px;
    }

    &:placeholder-shown + label {
      transform: translateY(-50%);
      font-size: 16px;
    }
    &:focus + label {
      transform: translateY(-200%);
      font-size: 12px;
    }
  }

  & label {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-200%);
    font-size: 12px;
    color: var(--color-blue);
    transition:
      font-size var(--base-transition),
      transform var(--base-transition);
  }

  &--primary {
    input {
      border: 1px solid var(--color-light-grey);
      color: var(--color-blue);

      &:focus {
        outline: none;
        border-color: var(--color-blue);
      }
    }
  }
}
</style>
