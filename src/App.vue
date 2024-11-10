<template>
  <main class="main">
    <ui-button
      view="primary"
      text="Стать резидентом"
      @click="open"
    />
  </main>

  <transition>
    <notification-chip
      v-if="visibleNotice"
      :text="notificationText"
      :type="notificationType"
    />
  </transition>

  <ModalsContainer />
</template>

<script setup lang="ts">
import UiButton from '@/components/common/UiButton/UiButton.vue';
import { ModalsContainer, useModal } from 'vue-final-modal';
import BidModal from '@/components/BidModal/BidModal.vue';
import NotificationChip from '@/components/Notification/NotificationChip.vue';
import type { TNotificationType } from '@/components/Notification/notification-chip.model';
import { ref } from 'vue';

const { open, close } = useModal({
  component: BidModal,
  attrs: {
    onConfirm(data: { message: string; isCatch: boolean }) {
      notificationType.value = !data.isCatch ? 'success' : 'error';
      notificationText.value = data.message;
      hideNoticeOnTimeout();
      close();
    },
  },
});

const visibleNotice = ref<boolean>(false);
const notificationType = ref<TNotificationType>('success');
const notificationText = ref<string>('');

const hideNoticeOnTimeout = () => {
  visibleNotice.value = true;
  setTimeout(() => {
    visibleNotice.value = false;
  }, 2000);
};
</script>

<style scoped lang="scss">
.main {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-enter-active,
.v-leave-active {
  transition:
    opacity var(--base-transition),
    transform var(--base-transition);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
