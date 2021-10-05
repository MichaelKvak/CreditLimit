<template>
  <div class="create">
    <div v-if="isLoading">loading...</div>
    <div v-if="hasError">error</div>
    <div class="CreateList">
      <label class="field">
        Bank name
        <input type="text" v-model="bankName" />
      </label>
      <br />
      <label class="field">
        Interest rate
        <input type="number" v-model.number="bankRate" />
      </label>
      <br />
      <label class="field">
        Maximum loan
        <input type="number" v-model.number="bankCredit" />
      </label>
      <br />
      <label class="field">
        Minimum down payment
        <input type="number" v-model.number="bankPayment" />
      </label>
      <br />
      <label class="field">
        Loan term
        <input type="number" v-model.number="bankTerm" />
      </label>
      <div>
        <b-button
          type="is-success is-light"
          @click="onSave"
          rounded
          :disabled="!isDataValid"
          >{{ saveBtn }}</b-button
        >
      </div>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "About",
  data() {
    return {
      bankName: null,
      bankRate: null,
      bankCredit: null,
      bankPayment: null,
      bankTerm: null,
      errorMessage: null,
    };
  },
  computed: {
    ...mapGetters("banks", ["isLoading", "hasError"]),
    isDataValid() {
      return (
        this.bankName &&
        this.bankRate &&
        this.bankCredit &&
        this.bankPayment &&
        this.bankTerm
      );
    },
    isEditing() {
      return !!this.$route.params.id;
    },
    saveBtn() {
      return this.isEditing ? "save" : "create";
    },
  },
  methods: {
    ...mapActions("banks", ["createBank", "getBankById", "updateBank"]),
    async onSave() {
      this.errorMessage = "";
      try {
        if (this.isEditing) {
          await this.updateBank({
            bankName: this.bankName,
            bankRate: this.bankRate,
            bankCredit: this.bankCredit,
            bankPayment: this.bankPayment,
            bankTerm: this.bankTerm,
          });
        } else {
          await this.createBank({
            bankName: this.bankName,
            bankRate: this.bankRate,
            bankCredit: this.bankCredit,
            bankPayment: this.bankPayment,
            bankTerm: this.bankTerm,
          });
        }
        this.$router.push({ name: "List" });
      } catch {
        this.errorMessage = "Saving error";
      }
    },
  },
  async mounted() {
    if (this.isEditing) {
      try {
        const editedObj = await this.getBankById(this.$route.params.id);
        this.bankName = editedObj.name;
        this.bankRate = editedObj.rate;
        this.bankCredit = editedObj.credit;
        this.bankPayment = editedObj.payment;
        this.bankTerm = editedObj.term;
      } catch {
        this.errorMessage = "edited error";
      }
    }
  },
};
</script>
<style scoped>
.create {
  background: url(https://media.istockphoto.com/photos/business-development-to-success-and-growing-growth-concept-pointing-picture-id1145631842?k=20&m=1145631842&s=612x612&w=0&h=fkLeeD7b0fV5KJgDRuDOA3vmTyNB8n5f5gLlmk785OQ=);
  color: cornsilk;
  text-shadow: #190af1 1px 1px 1px;
}
.CreateList {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
