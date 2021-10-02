import Vue from "vue";
import Vuex from "vuex";

import banks from "../store/modules/banks";
import auth from "../store/modules/auth";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    banks,
    auth,
  },
});

export default store;
