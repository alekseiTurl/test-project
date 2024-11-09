<template>
  <VueFinalModal
    class="bid-modal"
    content-class="bid-modal__content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div class="bid-modal__title">Заполните заявку, чтобы стать резидентом</div>

    <form class="bid-modal__form">
      <ui-input
        :model-value="formData.name"
        label="Наименование организации / ИП"
        stack-label
      />

      <ui-input
        :model-value="formData.phone"
        label="Контактный телефон"
        stack-label
        type="tel"
        v-mask="'+7 (###) ###-##-##'"
      />

      <ui-select
        :options="typeOfRoomOptions"
        :model-value="formData.type_of_room"
        label="Тип помещения"
      />

      <ui-input
        :model-value="formData.address"
        label="Адрес"
        stack-label
      />

      <range-input
        title-text="Площадь помещения (м2)"
        :model-value="formData.area"
        :range="{ max: 100, min: 1 }"
      />

      <range-input
        title-text="Дата начала аренды"
        :model-value="formData.date"
        :range="{ max: '2026-01-01', min: '2024-01-01' }"
        type="date"
      />

      <ui-button
        text="Отправить"
        @click="emit('confirm')"
      />
    </form>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import UiInput from '@/components/common/UiInput/UiInput.vue';
import UiSelect from '@/components/common/UiSelect/UiSelect.vue';
import UiButton from '@/components/common/UiButton/UiButton.vue';
import type { IBidData } from '@/components/BidModal/bid-modal.model';
import type { IUiSelectOptions } from '@/components/common/UiSelect/ui-select.model';
import RangeInput from '@/components/RangeInput/RangeInput.vue';

const formData = ref<IBidData>({
  name: null,
  phone: null,
  type_of_room: null,
  address: null,
  area: {
    from: null,
    to: null,
  },
  date: {
    from: null,
    to: null,
  },
});

const typeOfRoomOptions: IUiSelectOptions[] = [
  {
    label: 'Производственная площадь',
    value: 'Производственная площадь',
  },
  {
    label: 'тип 2',
    value: 'тип 2',
  },
  {
    label: 'тип 3',
    value: 'тип 3',
  },
];

const emit = defineEmits<{
  (e: 'confirm'): void;
}>();
</script>

<style scoped lang="scss">
.bid-modal {
  display: flex;
  justify-content: center;
  align-items: center;

  &__title {
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: 600;
    color: var(--color-deep-blue);
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    align-items: center;

    & > *:not(.ui-button) {
      width: 100%;
    }
  }
}
</style>

<style>
.bid-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bid-modal__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: var(--color-background);
  max-width: 70vw;
  max-height: 90%;
}
</style>
