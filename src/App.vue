<template>
  <div id="app">
    <!-- Навігаційна панель -->
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="https://www.kindpng.com/picc/m/325-3256817_financial-management-logo-png-transparent-png.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/' }"
          >List</b-navbar-item
        >

        <b-navbar-item tag="router-link" :to="{ path: '/create/' }"
          >Create</b-navbar-item
        >
        <b-navbar-item tag="router-link" :to="{ path: '/calculator/' }"
          >Calculator</b-navbar-item
        >
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <!-- <b-icon pack="fas" icon="shopping-cart" size="is-small"></b-icon> -->
          <!-- <b-tag type="is-info is-rounded">{{ getProductsCountInCart }}</b-tag> -->
          <div class="buttons">
            <router-link
              v-if="!isAuthenticated()"
              to="/signup"
              class="button is-rounded is-primary is-small"
            >
              <strong>Sign up</strong>
            </router-link>
            <router-link
              v-if="!isAuthenticated()"
              to="/login"
              class="button is-rounded  is-primary is-small"
            >
              <strong>Log in</strong>
            </router-link>

            <button v-if="isAuthenticated()" @click="onLogout">Log out</button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <!-- Місце вставки сторінок -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",

  computed: {
    ...mapGetters("cart", ["getProductsCountInCart"]),
    ...mapGetters("auth", ["isAuthenticated"]),
    cartLenght() {
      return this.getProductsCountInCart();
    },
  },

  methods: {
    ...mapActions("auth", ["logout"]),
    onLogout() {
      this.logout();
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f8f8f8;
  margin-top: 60px;
}
</style>
