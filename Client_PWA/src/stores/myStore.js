import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useVisitStore = defineStore('VisitStore', () => {
  const visits = ref([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/visits');
      visits.value = data;
    } catch (error) {
      console.error('Error fetching visits:', error);
    }
  };

  const addVisit = async (visit) => {
    try {
      const { data } = await axios.post('http://localhost:3000/visits', visit);
      visits.value.push(data);
    } catch (error) {
      console.error('Error adding visit:', error);
    }
  };

  const deleteVisit = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/visits/${id}`);
      visits.value = visits.value.filter((visit) => visit.id !== id);
    } catch (error) {
      console.error('Error deleting visit:', error);
    }
  };

  return {
    visits,
    fetchData,
    addVisit,
    deleteVisit,
  };
});



