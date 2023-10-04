<template>
  <div v-if="bookingSubmitted">
    <p>Thank you {{ username }} for your booking</p>
  </div>
  <div v-else-if="loading">
    <!-- Simple Loader -->
    <p>Loading...</p>
  </div>
  <div v-else-if="vehicle">
    <h2>Book Hire for {{ vehicle.make }} {{ vehicle.model }}</h2>
    <p>Start Date: {{ startDate }}</p>
    <p>End Date: {{ endDate }}</p>
    <p>Total Price: £{{ price }}</p>

    <!-- Form Section -->
    <form @submit.prevent="submitBooking">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" disabled />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" disabled />
      </div>
      <div>
        <label for="telephone">Telephone:</label>
        <input type="tel" id="telephone" v-model="telephone" disabled />
      </div>
      <button type="submit">Submit Booking</button>
    </form>
  </div>
  <div v-else>
    <p>Vehicle information is not available.</p>
  </div>
</template>

<script>
import { mockVehicles } from "@/data/mockData";

export default {
  data() {
    return {
      vehicle: null,
      startDate: '',
      endDate: '',
      price: null,
      username: 'John Smith',
      email: 'john@example.com',
      telephone: '1234567890',
      bookingSubmitted: false,
      loading: false,
    };
  },
  props: {
    registrationNumber: {
      type: String,
      default: ''
    },
    startDateProp: {
      type: String,
      default: ''
    },
    endDateProp: {
      type: String,
      default: ''
    }
  },
  created() {
    this.initializeComponentData();
  },
  methods: {
    initializeComponentData() {
      this.vehicle = this.findVehicleByRegistration(this.registrationNumber);
      this.startDate = this.startDateProp;
      this.endDate = this.endDateProp;
      if (this.vehicle) {
        this.calculatePrice();
      } else {
        this.$router.push({ name: 'vehicle-list' });
      }
    },
    calculatePrice() {
      const prices = {
        "Small car": 25,
        "Estate car": 35,
        "Van": 50
      };
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      const days = (end - start) / (1000 * 60 * 60 * 24) + 1;
      this.price = days * prices[this.vehicle.category];
    },
    findVehicleByRegistration(registrationNumber) {
      return mockVehicles.find(v => v.registrationNumber === registrationNumber) || null;
    },
    submitBooking() {
      // Set loading to true to show the loader
      this.loading = true;

      // Simulating API call delay with setTimeout
      setTimeout(() => {
        // Update the UI to show the thank you message
        this.bookingSubmitted = true;
        this.loading = false;  // Set loading to false once the "API call" is done
      }, 2000);
    }
  }
}
</script>
