<template>
  <Page>
    <template #title>
      {{ $t('Home.title') }}
    </template>
    <template #header>
      <Button @click="refresh" v-tooltip="$t('Home.updateRate')">
        <i class="pi pi-refresh" style="fontsize: 1.3rem" />
      </Button>
    </template>
  </Page>

  <div class="errorFixer">
    <br />
    vremenno kolom
    <br />
    this part will be realized later
  </div>

  <ProgressSpinner v-if="loading" />

  <div v-else-if="currency.error?.code === 105">
    Need to upgrade fixer.io subscription plan
  </div>

  <div class="row" v-else>
    <div class="col">
      <div class="homeCard">
        <ProgressSpinner v-if="!currency.rates" />
        <home-bill :rates="currency.rates" v-else />
      </div>
    </div>
    <div class="col">
      <div class="homeCard">
        <ProgressSpinner v-if="!currency.rates" />
        <home-currency :rates="currency.rates" :date="currency.date" v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import Page from '@/components/ui/Page';
import ProgressSpinner from 'primevue/progressspinner';
import HomeBill from '@/components/home/HomeBill';
import HomeCurrency from '@/components/home/HomeCurrency';
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const store = useStore();
    const loading = ref(true);
    const currency = ref(null);

    const refresh = async () => {
      loading.value = true;
      await store.dispatch('fetchCurrency');
      currency.value = store.getters['getCurrencies'];
      if (!currency.value) {
        throw new Error(
          store.commit('setMessage', {
            type: 'error',
            value: 'Проблемы с валютным сервером. Попробуйте позднее',
          })
        );
      }
      loading.value = false;
    };

    onBeforeMount(async () => {
      currency.value = store.getters['getCurrencies'];
      if (!currency.value) {
        throw new Error(
          store.commit('setMessage', {
            type: 'error',
            value: 'Обновите курс валют',
          })
        );
      }
      loading.value = false;
    });

    return {
      refresh,
      loading,
      currency,
    };
  },
  components: {
    Page,
    HomeBill,
    HomeCurrency,
    ProgressSpinner,
  },
};
</script>

<style scoped>
.p-button {
  margin-top: 1.2rem;
  height: 3rem;
}
</style>
