<template>
  <div>
    <div class="row"><Menu active="ReportRound" /></div>
    <div class="container mt-5">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <div class="card px-5 py-5 form" id="form1">
            <div class="form-data">
              <div class="forms-inputs mb-4">
                <span>วันที่</span>
                <date-picker
                  placeholder="DD/MM/YYYY"
                  format="dd/MM/yyyy"
                  inputClass="form-control"
                  :class="validate_date ? 'is-invalids' : ''"
                  v-model="date"
                />
              </div>
              <div class="forms-inputs mb-4">
                <span>รอบ</span>
                <v-select
                  :options="round"
                  style="background: #fff"
                  v-model="round_id"
                ></v-select>
              </div>
              <div class="mb-3">
                <button
                  v-on:click.stop.prevent="submit"
                  class="btn btn-login w-100"
                >
                  ตกลง
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: null,
      validate_date: false,
      round: [],
      round_id: null,
    };
  },
  watch: {
    date() {
      this.getround();
    },
  },
  methods: {
    submit() {
      if (!this.date) {
        this.validate_date = true;
        return;
      }
      let round = this.round_id ? this.round_id.code : "";
      let round_date = new Date(this.date)
        .toLocaleString("sv")
        .substring(0, 10);

      window.open(
        "bet/round?round_date=" +
          round_date +
          "&token=" +
          sessionStorage.getItem("token") +
          "&round_id=" +
          round
      );
    },
    getround() {
      this.validate_date = false;
      this.$axios
        .$post(
          "/api/roundgetbydate",
          {
            date: new Date(this.date).toISOString().substring(0, 10),
          },
          this.$setHeaders(sessionStorage.getItem("token"))
        )
        .then((result) => {
          let memberarray = [];
          if (result.result.data.length) {
            for (let member in result.result.data) {
              memberarray.push({
                code: result.result.data[member].id,
                label: result.result.data[member].name,
              });
            }
          }
          this.round = memberarray;
        });
    },
  },
};
</script>

<style>
.form {
  font-family: "prompt";
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  font-weight: normal;
  font-size: 15px;
}
.btn-login {
  background-color: #4caf50;
  color: #ffffff;
}
</style>
