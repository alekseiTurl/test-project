<template>
  <VueFinalModal
    class="bid-modal"
    content-class="bid-modal__content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div class="bid-modal__title">Заполните заявку, чтобы стать резидентом</div>

    <form
      @submit.prevent="onSubmit"
      class="bid-modal__form"
    >
      <ui-input
        v-model:model-value="v.name.$model"
        :error="v.name.$errors"
        label="Наименование организации / ИП"
        name="name_organization"
        stack-label
      />

      <ui-input
        v-model:model-value="v.phone.$model"
        :error="v.phone.$errors"
        label="Контактный телефон"
        stack-label
        type="tel"
        v-mask="'+7 (###) ###-##-##'"
      />

      <ui-select
        :options="typeOfRoomOptions"
        v-model:model-value="v.type_of_room.$model"
        :error="v.type_of_room.$errors"
        multiply
        label="Тип помещения"
      />

      <ui-input
        v-model:model-value="v.address.$model"
        :error="v.address.$errors"
        label="Адрес"
        stack-label
      />

      <range-input
        title-text="Площадь помещения (м2)"
        :model-value="v.area.$model"
        :error="v.area.$errors"
        :range="areaRange"
      />

      <range-input
        title-text="Дата начала аренды"
        :model-value="v.date.$model"
        :error="v.date.$errors"
        :range="dateRange"
        type="date"
      />

      <ui-button
        type="submit"
        text="Отправить"
      />
    </form>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import UiInput from '@/components/common/UiInput/UiInput.vue';
import UiSelect from '@/components/common/UiSelect/UiSelect.vue';
import UiButton from '@/components/common/UiButton/UiButton.vue';
import RangeInput from '@/components/RangeInput/RangeInput.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers, minLength, minValue, maxValue, between } from '@vuelidate/validators';
import type { IBidData } from '@/components/BidModal/bid-modal.model';
import type { IUiSelectOptions } from '@/components/common/UiSelect/ui-select.model';
import axios from 'axios';

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

const areaRange = { max: 100, min: 1 };
const dateRange = { max: '2026-01-01', min: '2024-01-01' };

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Обязательное поле', required),
  },
  phone: {
    required: helpers.withMessage('Обязательное поле', required),
    minLength: helpers.withMessage('Не верный формат', minLength(11)),
  },
  address: {
    required: helpers.withMessage('Обязательное поле', required),
  },
  type_of_room: {
    required: helpers.withMessage('Обязательное поле', required),
  },
  area: {
    from: {
      required: helpers.withMessage('Введите начальное значение', required),
      range: helpers.withMessage(
        `Значение должно быть от ${areaRange.min} до ${areaRange.max}`,
        between(areaRange.min, areaRange.max),
      ),
      maxValue: helpers.withMessage(
        'Не верное значение',
        maxValue(formData.value.area.to ?? areaRange.max),
      ),
    },
    to: {
      required: helpers.withMessage('Введите конечное значение', required),
      range: helpers.withMessage(
        `Значение должно быть от ${areaRange.min} до ${areaRange.max}`,
        between(areaRange.min, areaRange.max),
      ),
      minValue: helpers.withMessage(
        'Не верное значение',
        minValue(formData.value.area.from ?? areaRange.min),
      ),
    },
  },
  date: {
    from: {
      required: helpers.withMessage('Введите начальную дату', required),
      minDate: helpers.withMessage(
        'Не верная дата',
        maxValue(formData.value.date.to ?? dateRange.max),
      ),
    },
    to: {
      required: helpers.withMessage('Введите конечную дату', required),
      maxDate: helpers.withMessage(
        'Не верная дата',
        minValue(formData.value.date.from ?? dateRange.max),
      ),
    },
  },
}));

const v = useVuelidate(rules, formData);

const onSubmit = () => {
  v.value.$validate();
  let isValid = !v.value.$invalid;

  if (isValid) {
    axios
      .post('https://jsonplaceholder.typicode.com/posts', formData.value)
      .then(() => emit('confirm', { message: 'Ваша заявка принята', isCatch: false }))
      .catch((error) => emit('confirm', { message: error.message, isCatch: true }));
  }
};

const emit = defineEmits<{
  (e: 'confirm', v: { message: string; isCatch: boolean }): void;
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

    @include md-screen {
      margin-bottom: 20px;
      font-size: 16px;
    }
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
  padding: 40px;
  background: var(--color-background);
  max-width: 70vw;
  max-height: 90%;
  overflow: auto;
}

@media (max-width: 1024px) {
  .bid-modal__content {
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .bid-modal__content {
    max-width: 90vw;
    max-height: 90%;
  }
}
</style>
