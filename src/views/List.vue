<template>
  <div class="list">
    <div v-if="isLoading">loading...</div>
    <div v-if="hasError">error</div>
    <div v-if="!isLoading && !hasError">
      <div v-for="bank in getBankList" :key="bank._id">
        <span>Bank name - {{ bank.name }}</span> <br />
        <span>Interest rate - {{ bank.rate }}</span> <br />
        <span>Maximum loan - {{ bank.credit }}</span> <br />
        <span>Minimum down payment - {{ bank.payment }}</span
        ><br />
        <span>Loan term - {{ bank.term }}</span>
        <div class="btn">
          <button @click="onDelete(bank._id)">Delete</button>
        </div>
        <button @click="onEdit(bank._id)">edit</button>

        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "List",
  computed: {
    ...mapGetters("banks", ["getBankList", "isLoading", "hasError"]),
  },
  methods: {
    ...mapActions("banks", ["loadBank", "deleteBankCart"]),
    onDelete(id) {
      this.deleteBankCart(id);
    },
    onEdit(id) {
      this.$router.push({ name: "Create", params: { id } });
    },
  },
  mounted() {
    this.loadBank();
  },
};
</script>
<style>
.btn {
  margin: 5px;
}
.list {
  background: url(https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Money-2180330_1920.jpg/1200px-Money-2180330_1920.jpg);
  background-size: 100%;
  text-shadow: #f8f8f7 1px 1px 1px;
  color: #000000;
}
</style>
