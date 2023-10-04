import { mount } from "@vue/test-utils";
import VehicleList from "@/components/VehicleList";
import { mockVehicles } from "@/data/mockData";

// Basic test

jest.mock("@/data/mockData", () => ({
  mockVehicles: [
    {
      registrationNumber: "123XYZ",
      category: "Small car",
      make: "Toyota",
      model: "Yaris",
      fuelType: "Petrol",
    },
  ],
}));

describe("VehicleList.vue", () => {
  it("renders vehicle information when passed", async () => {
    const wrapper = mount(VehicleList);

    wrapper.setData({
      vehicles: mockVehicles,
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".vehicle-info").exists()).toBe(true);
    // additional assertions for vehicle info
  });

  // Write additional test cases
});
