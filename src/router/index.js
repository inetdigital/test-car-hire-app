import { createRouter, createWebHistory } from "vue-router";
import VehicleList from "@/components/VehicleList";

const routes = [
  {
    path: "/",
    name: "vehicle-list",
    component: VehicleList,
    props: true,
  },
  {
    path: "/book-hire/:registrationNumber/:startDateProp/:endDateProp",
    name: "book-hire",
    component: () => import("@/components/BookHireVehicle.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
