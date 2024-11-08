<template>
  <main class="main">
    <ui-button text="Стать резидентом" />

    <ui-input
      :model-value="input"
      stack-label
      label="label"
      type="text"
    />

    <ui-icon
      name="mdi-light:home"
      :width="100"
    />
    <ui-select
      :model-value="input"
      :options="opt"
      label="label"
    />
  </main>
</template>

<script setup lang="ts">
import UiButton from '@/components/common/UiButton/UiButton.vue';
import UiInput from '@/components/common/UiInput/UiInput.vue';
import UiIcon from '@/components/common/UiIcon/UiIcon.vue';
import UiSelect from '@/components/common/UiSelect/UiSelect.vue';
import { ref } from 'vue';

const input = ref(null);

const opt = [
  { label: 'test1', value: 'test 1' },
  { label: 'test2', value: 'test 2' },
];
</script>

<style scoped lang="scss">
.main {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
