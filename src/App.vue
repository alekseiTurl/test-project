<template>
  <main class="main">
    <!--    <ui-button text="Стать резидентом" />-->
    <!--    <ui-input-->
    <!--      stack-label-->
    <!--      label="label"-->
    <!--      :model-value="input"-->
    <!--      type="tel"-->
    <!--      v-mask="'+7 (###) ###-##-##'"-->
    <!--    />-->
    <ui-icon
      name="mdi-light:home"
      :width="100"
    />
  </main>
</template>

<script setup lang="ts">
import UiButton from '@/components/common/UiButton/UiButton.vue';
import UiInput from '@/components/common/UiInput/UiInput.vue';
import UiIcon from '@/components/common/UiIcon/UiIcon.vue';
import { ref } from 'vue';

const input = ref(null);
</script>

<style scoped lang="scss">
.main {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
