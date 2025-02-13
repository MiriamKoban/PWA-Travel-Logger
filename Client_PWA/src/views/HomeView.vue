<template>
  <div class="row justify-center q-pa-md q-mt-md">
    <div class="col-12 row justify-center">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h4 text-center">
            Welcome to <span class="text-h3" style="font-family: Pacifico">TravelLogger</span>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 row justify-center q-mt-md" v-if="visits">
      <q-card class="my-card q-pa-md q-ma-md" v-for="visit in visits" :key="visit.id">
        <q-card-section>
          <div class="text-h6">{{ visit.title }}</div>
          <div class="text-subtitle2">Date: {{ visit.date }}</div>
          <div>Rating: <q-rating v-model="visit.rating" size="1.5em" icon="star" readonly /></div>
          <div class="text-subtitle2">Comment: {{ visit.comment }}</div>
          <div class="text-subtitle2">
            Location:
            <q-chip icon="place" color="primary" outline>
              Latitude: {{ visit.latitude }}, Longitude: {{ visit.longitude }}
            </q-chip>
          </div>
          <q-btn
            @click="store.deleteVisit(visit.id)"
            label="Delete"
            color="negative"
            class="q-mt-md"
          />
        </q-card-section>
      </q-card>
    </div>
    <div v-else class="col-12 row justify-center q-mt-md">
      <q-card class="my-card q-pa-md q-ma-md">
        <q-card-section>
          <div class="text-h6">No visits found.</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useVisitStore } from '../stores/myStore';
import { onMounted } from 'vue';

const store = useVisitStore();
const { visits } = storeToRefs(store);

onMounted(() => {
  store.fetchData();
});
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}
</style>
