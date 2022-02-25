<template>
  <div>
    <div class="row mt-5 text-center">
      <h1>วันที่ {{ $convertDate($route.query.round_date) }}</h1>
    </div>

    <table width="600px" align="center">
      <tr>
        <td
          width="300px"
          v-if="round.slice(0, 20).length"
          style="vertical-align: top"
        >
          <tr>
            <td width="100" bgcolor="#FFD700" align="center">
              <strong>รอบ</strong>
            </td>
            <td width="100" bgcolor="#7FFFD4" align="center">
              <strong>คู่</strong>
            </td>
            <td width="100" bgcolor="#DC143C" align="center">
              <strong>คี่</strong>
            </td>
          </tr>

          <tr v-for="(data, key) in round.slice(0, 20)" :key="key">
            <td bgcolor="#FFD700" align="center">{{ data.name }}</td>
            <td
              align="center"
              :bgcolor="data.bet_result == 2 ? '#7FFFD4' : '#ffffff'"
            >
              <span v-if="data.bet_result == 2">{{ data.weight }}</span>
            </td>
            <td
              align="center"
              :bgcolor="data.bet_result == 1 ? '#DC143C' : '#ffffff'"
            >
              <span v-if="data.bet_result == 1">{{ data.weight }}</span>
            </td>
          </tr>
        </td>
        <td
          width="300px"
          v-if="round.slice(20, 40).length"
          style="vertical-align: top"
        >
          <tr>
            <td width="100" bgcolor="#FFD700" align="center">
              <strong>รอบ</strong>
            </td>
            <td width="100" bgcolor="#7FFFD4" align="center">
              <strong>คู่</strong>
            </td>
            <td width="100" bgcolor="#DC143C" align="center">
              <strong>คี่</strong>
            </td>
          </tr>

          <tr v-for="(data, key) in round.slice(20, 40)" :key="key">
            <td bgcolor="#FFD700" align="center">{{ data.name }}</td>
            <td
              align="center"
              :bgcolor="data.bet_result == 2 ? '#7FFFD4' : '#ffffff'"
            >
              <span v-if="data.bet_result == 2">{{ data.weight }}</span>
            </td>
            <td
              align="center"
              :bgcolor="data.bet_result == 1 ? '#DC143C' : '#ffffff'"
            >
              <span v-if="data.bet_result == 1">{{ data.weight }}</span>
            </td>
          </tr>
        </td>
        <td
          width="300px"
          v-if="round.slice(40, 60).length"
          style="vertical-align: top"
        >
          <tr>
            <td width="100" bgcolor="#FFD700" align="center">
              <strong>รอบ</strong>
            </td>
            <td width="100" bgcolor="#7FFFD4" align="center">
              <strong>คู่</strong>
            </td>
            <td width="100" bgcolor="#DC143C" align="center">
              <strong>คี่</strong>
            </td>
          </tr>

          <tr v-for="(data, key) in round.slice(40, 60)" :key="key">
            <td bgcolor="#FFD700" align="center">{{ data.name }}</td>
            <td
              align="center"
              :bgcolor="data.bet_result == 2 ? '#7FFFD4' : '#ffffff'"
            >
              <span v-if="data.bet_result == 2">{{ data.weight }}</span>
            </td>
            <td
              align="center"
              :bgcolor="data.bet_result == 1 ? '#DC143C' : '#ffffff'"
            >
              <span v-if="data.bet_result == 1">{{ data.weight }}</span>
            </td>
          </tr>
        </td>
      </tr>
    </table>

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
          this.$setHeaders(this.$route.query.token)
        )
        .then((result) => {
          if (result.result.data.length) {
            this.round = result.result.data.reverse();
          }
        });
    },
  },

  mounted() {
    this.getData();
  },
};
</script>
<style scoped>
table,
td,
th {
  border: 1px solid;
  font-size: 30px;
}

table {
  border-collapse: collapse;
}
</style>
