<script setup>
import { ref, onMounted } from 'vue';
import { useVisitStore } from '../stores/myStore';

import { useRouter } from 'vue-router';

const router = useRouter();

const title = ref('');
const date = ref('');
const rating = ref(0);
const comment = ref('');
const latitude = ref(null);
const longitude = ref(null);
const loading = ref(false);

const store = useVisitStore();

onMounted(() => {
  const today = new Date().toISOString().substr(0, 10);
  date.value = today;
});

const getLocation = () => {
  loading.value = true;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
        loading.value = false;
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Failed to get location.');
        loading.value = false;
      },
    );
  } else {
    alert('Geolocation is not supported by this browser.');
    loading.value = false;
  }
};

const submitVisit = async () => {
  const newVisit = {
    title: title.value,
    date: date.value,
    rating: rating.value,
    comment: comment.value,
    latitude: latitude.value,
    longitude: longitude.value,
  };

  try {
    await store.addVisit(newVisit);
    alert('Visit added successfully!');
    // Reset form fields
    title.value = '';
    date.value = new Date().toISOString().substr(0, 10);
    rating.value = 0;
    comment.value = '';
    latitude.value = null;
    longitude.value = null;

    router.push('/');
  } catch (error) {
    console.error('Error adding visit:', error);
    alert('Failed to add visit.');
  }
};
</script>

<template>
  <div class="q-pa-md q-mt-md row justify-center">
    <q-card class="col-sm-5 col-12">
      <q-card-section>
        <q-form @submit.prevent="submitVisit">
          <q-input v-model="title" label="Title" outlined filled required />
          <q-input
            v-model="date"
            label="Date"
            type="date"
            outlined
            filled
            required
            class="q-mt-md"
          />
          <div class="q-my-md">
            <p>Rating:</p>
            <q-rating v-model="rating" label="Rating" required size="lg" />
          </div>
          <q-input v-model="comment" label="Comment" type="textarea" outlined filled required />
          <q-spinner v-if="loading" color="primary" size="2em" class="q-mt-md" />
          <div v-if="latitude && longitude" class="q-mt-md">
            <q-chip icon="place" color="primary" outline>
              Latitude: {{ latitude }}, Longitude: {{ longitude }}
            </q-chip>
          </div>
          <br />
          <q-btn @click="getLocation" label="Get Location" color= "blue" class="q-mt-md" />
          <q-btn type="submit" label="Submit" color="green" class="q-mt-md q-ml-md" />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped></style>
