<template>
  <div
    :class="[
      `ui-input--${props.view}`,
      props.labelStatic ? 'ui-input--label-static' : '',
      props.error?.length ? 'ui-input--novalid' : '',
    ]"
    class="ui-input"
  >
    <div class="ui-input__container">
      <input
        v-bind="$attrs"
        :value="inputValue"
        :type="props.type"
        :placeholder="props.stackLabel ? '' : props.placeholder"
        :readonly="props.readonly"
        :disabled="props.disable"
        :max="props.range?.max"
        :min="props.range?.min"
        @input="changeInputValue"
      />

      <label v-if="props.stackLabel">{{ props.label }}</label>

      <slot
        name="icon"
        class="ui-input__icon"
      />
    </div>

    <transition-group
      name="error"
      tag="ul"
      class="ui-input__errors"
    >
      <li
        class="ui-input__errors-item"
        v-for="error in errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </li>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IUiInput } from '@/components/common/UiInput/ui-input.model';

const props = withDefaults(defineProps<IUiInput>(), {
  type: 'text',
  view: 'primary',
  placeholder: 'Введите текст',
});

const errors = computed(() => props.error);
const inputValue = computed(() => props.modelValue);

const changeInputValue = (e: Event) => {
  if (props.type === 'tel') {
    const regExp = /\D/g;
    const value = (e.target as HTMLInputElement).value.replace(regExp, '');
    emits('update:modelValue', value);
  } else {
    emits('update:modelValue', (e.target as HTMLInputElement).value);
  }
};

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
  flex-direction: column;
  min-width: 300px;

  &__container {
    position: relative;
    display: flex;
  }

  & input {
    height: 64px;
    width: 100%;
    padding: v-bind('props.rightText ? "10px 20px 10px 40px" : "10px 20px"');
    border-radius: 5px;
    font-size: 18px;
    transition:
      border-color var(--base-transition),
      background-color var(--base-transition);
    text-align: v-bind('props.rightText ? "right" : "left"');

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
    font-weight: 300;
    color: var(--color-blue);
    transition:
      font-size var(--base-transition),
      transform var(--base-transition);
  }

  &__icon {
    position: absolute;
  }

  &__errors {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 5px;

    &-item {
      padding-left: 10px;
      padding-right: 10px;
      font-size: 12px;
      color: var(--color-error);
    }
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

  &--novalid {
    input {
      border-color: var(--color-error);

      &:focus {
        border-color: var(--color-error);
      }
    }
    label {
      color: var(--color-error);
    }
  }

  &--label-static {
    label {
      transform: translateY(-50%);
      font-size: 16px;
    }
    & input {
      &:placeholder-shown + label {
        transform: translateY(-50%);
        font-size: 16px;
      }

      &:focus + label {
        transform: translateY(-50%);
        font-size: 16px;
      }
    }
  }
}

:slotted(svg) {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  transition: transform var(--base-transition);
}

.error-enter-active,
.error-leave-active {
  transition: opacity var(--base-transition);
}

.error-enter-from,
.error-leave-to {
  opacity: 0;
}
</style>
