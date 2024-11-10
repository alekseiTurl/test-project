<template>
  <div class="ui-select">
    <ui-input
      :label="props.label"
      v-model:model-value="inputValue"
      :error="props.error"
      :view="props.view"
      :disable="props.disable"
      @click="showOptions = !showOptions"
      @blur="showOptions = false"
      readonly
      stack-label
      type="text"
    >
      <template #icon>
        <ui-icon
          name="ic:sharp-expand-more"
          width="24"
          :style="`transform: translateY(-50%) ${showOptions ? 'rotate(180deg)' : 'rotate(0)'}`"
          @click="showOptions = !showOptions"
        />
        <ui-icon
          v-if="selectedValues?.length"
          name="ic:round-close"
          width="22"
          style="right: 40px"
          @click="clearSelectedValue"
        />
      </template>
    </ui-input>

    <transition>
      <ul
        v-show="showOptions"
        class="ui-select__options"
      >
        <li
          v-for="(opt, index) in props.options"
          :key="index"
          @click="setSelectedValue(opt)"
          :class="{ selected: selectedValues?.find((option) => option.value === opt.value) }"
        >
          {{ opt.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UiInput from '@/components/common/UiInput/UiInput.vue';
import UiIcon from '@/components/common/UiIcon/UiIcon.vue';
import type { IUiSelect, IUiSelectOptions } from '@/components/common/UiSelect/ui-select.model';

const props = withDefaults(defineProps<IUiSelect>(), {
  view: 'primary',
});

const showOptions = ref(false);

const inputValue = ref<string | number | null>(null);
const selectedValues = ref<IUiSelectOptions[] | null>([]);

const setSelectedValue = (opt: IUiSelectOptions) => {
  if (props.multiply && Array.isArray(selectedValues.value)) {
    if (!selectedValues.value?.includes(opt)) {
      selectedValues.value.push(opt);
    } else {
      selectedValues.value = selectedValues.value.filter((option) => option.value !== opt.value);
    }

    inputValue.value = selectedValues.value.map((option) => option.label).join(', ');
  } else {
    selectedValues.value = [opt];
    inputValue.value = opt.label;
  }

  emits('update:modelValue', selectedValues.value);
};

const clearSelectedValue = () => {
  selectedValues.value = [];
  inputValue.value = null;
  emits('update:modelValue', null);
};

const emits = defineEmits<{
  (e: 'update:modelValue', v: IUiSelectOptions[] | IUiSelectOptions | null): void;
}>();
</script>

<style scoped lang="scss">
.ui-select {
  position: relative;
  cursor: pointer;

  &__options {
    position: absolute;
    width: 100%;
    max-width: 100%;
    background-color: var(--color-light-grey);
    border-radius: 6px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    z-index: 2;

    li {
      padding: 15px;
      max-width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      transition: background-color var(--base-transition);

      @include on-hover {
        background-color: var(--color-light-blue);
      }
    }
  }
}

:deep(.ui-input) {
  & input {
    padding: v-bind('!!selectedValues ? `10px 55px 10px 20px` : `10px 20px`');
    cursor: pointer;
    text-overflow: ellipsis;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity var(--base-transition);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.selected {
  background-color: var(--color-light-blue);
}
</style>
