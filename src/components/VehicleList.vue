<template>
  <div class="vehicle-list">
    <h2>All Vehicles</h2>
    <p>Welcome John Smith</p>
    <p>Select the dates you require a vehicle</p>

    <div class="date-picker">
      <div class="date-field">
        <label for="start-date">Start Date: </label>
        <input type="date" id="start-date" v-model="startDate" :min="today">
      </div>
      
      <div class="date-field">
        <label for="end-date">End Date: </label>
        <input type="date" id="end-date" v-model="endDate" :min="startDate">
      </div>
    </div>

    <StandardButton v-if="showFindButton" @click="fetchAvailableVehicles" data-test="update-button">Update Available Vehicles</StandardButton>

    <ul>
      <li v-for="vehicle in filteredVehicles" :key="vehicle.registrationNumber" class="vehicle-card">
        <div class="vehicle-info">
          <h3>{{ vehicle.make }} {{ vehicle.model }}</h3>
          <p>Category: {{ vehicle.category }}</p>
          <p>Fuel Type: {{ vehicle.fuelType }}</p>
        </div>
        <StandardButton v-if="showHireButton" @click="hireVehicle(vehicle)" data-test="hire-button">Hire this vehicle</StandardButton>
      </li>
    </ul>
  </div>
</template>

<script>
import { mockVehicles } from '@/data/mockData';
import StandardButton from '@/components/ui/StandardButton';

export default {
  name: 'VehicleList',
  data() {
    return {
      vehicles: [],
      startDate: this.getCurrentDate(),
      endDate: this.getCurrentDate(),
      availableVehicles: [],
      showFindButton: false,
      showHireButton: true,
    };
  },
  components: {
    StandardButton
  },
  computed: {
    filteredVehicles() {
      if (this.availableVehicles.length === 0) return this.vehicles;

      return this.vehicles.filter((vehicle) =>
        this.availableVehicles.includes(vehicle.registrationNumber)
      );
    },
    today() {
      return this.getCurrentDate();
    }
  },
  watch: {
    startDate: 'updateShowFindButton',
    endDate: 'updateShowFindButton',
  },
  mounted() {
    this.getVehicles()
      .then((data) => {
        this.vehicles = data;
      })
      .catch((error) => {
        console.error("There was an error fetching vehicle data!", error);
      });
  },
  methods: {
    getCurrentDate() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      return yyyy + '-' + mm + '-' + dd;
    },
    getVehicles() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockVehicles);
        }, 300);
      });
    },
    hireVehicle(vehicle) {
      this.$router.push({
        name: 'book-hire',
        params: {
          registrationNumber: vehicle.registrationNumber,
          startDateProp: this.startDate,
          endDateProp: this.endDate,
        }
      }).catch((err) => {
        console.error('Router navigation failed:', err);
      });
    },
    fetchAvailableVehicles() {
      if (!this.startDate || !this.endDate) return;
      this.mockApiCall(this.startDate, this.endDate)
        .then((availableVehicles) => {
          this.availableVehicles = availableVehicles;
        })
        .catch((error) => {
          console.error("API error:", error);
        });
      this.showHireButton = true; 
      this.showFindButton = false;
    },
    updateShowFindButton() {
      this.showFindButton = true;
      this.showHireButton = false;
    },
    mockApiCall(startDate, endDate) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const shuffledVehicles = mockVehicles.sort(() => 0.5 - Math.random());
          const availableVehiclesRegistrationNumbers = shuffledVehicles.slice(0, 2).map(v => v.registrationNumber);
          resolve(availableVehiclesRegistrationNumbers);
        }, 0);
      });
    },
  },
};
</script>

<style scoped>
    .vehicle-list ul {
        list-style-type: none;
        padding: 0;
        display: flex;
        flex-direction: column;
    }
    .vehicle-card {
        border: 1px solid var(--secondary-color);
        padding: 15px;
        margin-bottom: 8px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .vehicle-info {
        text-align: left;
    }
    .vehicle-info h3 {
        margin: 0;
    }
    .vehicle-info p {
        margin: 5px 0;
    }
    button {
        padding: 10px 15px;
        background-color: var(--primary-color);
        border: none;
        color: white;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 5px;
    }
    .date-picker {
        margin-bottom: 15px;
    }

    .date-field {
        margin-bottom: 8px;
    }
</style>
