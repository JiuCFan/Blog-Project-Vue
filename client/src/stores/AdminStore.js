import { defineStore } from "pinia"

export const AdminStore = defineStore("admin", {
  state: () => {
    return {
      id: 0,
      account: "",
      password: ""
    }
  },
  actions: {},
  getter: {}
})