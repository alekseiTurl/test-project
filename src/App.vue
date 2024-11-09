<template>
  <main class="main">
    <ui-button
      view="primary"
      text="Стать резидентом"
      @click="open"
    />
  </main>
  <ModalsContainer />
</template>

<script setup lang="ts">
import UiButton from '@/components/common/UiButton/UiButton.vue';
import { ModalsContainer, useModal } from 'vue-final-modal';
import BidModal from '@/components/BidModal/BidModal.vue';

const { open, close } = useModal({
  component: BidModal,
  attrs: {
    onConfirm() {
      close();
    },
  },
});
</script>

<style scoped lang="scss">
.main {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
