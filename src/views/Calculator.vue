<template>
  <div class="calc">
    <div v-if="isLoading">loading...</div>
    <div v-if="hasError">error</div>
    <b-field label="Initial loan" type="is-not-success">
      <b-input
        placeholder="example: $280.000"
        v-model.number="initialLoan"
      ></b-input>
    </b-field>
    <b-field label="Down payment" type="is-not-success">
      <b-input
        placeholder="example: $20.000"
        v-model.number="downPayment"
      ></b-input>
    </b-field>
    <b-field label="Select bank">
      <b-select placeholder="Select bank" v-model="selectedBank">
        <option v-for="item in getBankList" :key="item.id" :value="item._id">
          {{ item.name }}
        </option>
      </b-select>
    </b-field>

    <b-button rounded :disabled="!isDataValid" @click="onCalculate()"
      >Calculate</b-button
    >
    <hr />
    <div v-if="result">
      result -
      {{ result }}
    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Calculator",
  data() {
    return {
      initialLoan: null,
      Monthpayment: null,
      downPayment: null,

      result: null,

      selectedBank: null,
      bankName: null,
      bankRate: null,
      bankCredit: null,
      bankPayment: null,
      bankTerm: null,
      error: null,
    };
  },
  computed: {
    ...mapGetters("banks", ["getBankList", "isLoading", "hasError"]),
    isDataValid() {
      return this.initialLoan && this.downPayment;
    },
  },
  methods: {
    ...mapActions("banks", ["loadBank", "getBankById", "findBankById"]),
    async onCalculate() {
      const resData = await this.getBankById(this.selectedBank);
      this.bankName = resData.name;
      this.bankRate = parseFloat(resData.rate);
      this.bankCredit = parseFloat(resData.credit);
      this.bankPayment = parseFloat(resData.payment);
      this.bankTerm = parseFloat(resData.term);
      let rate = this.bankRate / 100 / 12;
      console.log(this.bankRate, this.bankTerm);
      if (
        this.initialLoan < this.bankCredit &&
        this.downPayment > this.bankPayment
      ) {
        this.result = (
          (this.initialLoan * rate * Math.pow(1 + rate, this.bankTerm)) /
          (Math.pow(1 + rate, this.bankTerm) - 1)
        ).toFixed(2);
      } else this.result = "Please enter values";
    },
  },
  mounted() {
    this.loadBank();
  },
};
</script>

<style scoped>
.calc {
  background: url(https://media.istockphoto.com/photos/business-development-to-success-and-growing-growth-concept-pointing-picture-id1145631842?k=20&m=1145631842&s=612x612&w=0&h=fkLeeD7b0fV5KJgDRuDOA3vmTyNB8n5f5gLlmk785OQ=);
  color: rgb(255, 255, 255);
  text-shadow: #ffffff 1px 1px 1px;
}
</style>
