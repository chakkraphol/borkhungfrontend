<template>
  <div>
    <div class="row mt-5 text-center">
      <h1>วันที่ {{ $convertDate($route.query.round_date) }}</h1>
    </div>
    <div class="row mt-4">
      <div class="col-md-12 d-flex justify-content-center">
        <table id="table" style="width: 60%">
          <tr>
            <th style="width: 10px">ลำดับ</th>
            <th style="width: 200px">รอบ</th>
            <th>คู่</th>
            <th>คี่</th>
          </tr>
          <client-only v-for="(data, key) in round" :key="key">
            <tr>
              <td>{{ key + 1 }}</td>
              <td>{{ data.name }}</td>
              <td>
                <span v-if="data.bet_result == 2">{{ data.weight }}</span>
              </td>
              <td>
                <span v-if="data.bet_result == 1">{{ data.weight }}</span>
              </td>
            </tr>
          </client-only>
        </table>
      </div>
    </div>
    <div class="mt-4 text-center">
      <span onclick="window.print()" style="cursor: pointer">
        <img src="~/assets/images/print.svg" width="50" />
      </span>
    </div>
  </div>
</template>
<script>
import Menu from "~/components/Menu.vue";
export default {
  components: {
    Menu,
  },
  data() {
    return {
      round: [],
    };
  },
  methods: {
    getData() {
      this.$axios
        .$post(
          "/api/roundgetbydate",
          {
            date: this.$route.query.round_date,
          },
          this.$setHeaders(sessionStorage.getItem("token"))
        )
        .then((result) => {
          if (result.result.data.length) {
            this.round = result.result.data;
          }
        });
    },
  },

  mounted() {
    this.getData();
  },
};
</script>
