<template>
  <div>
    <div style="width: 90%; margin: 0 auto; padding-bottom: 25px">
      <div class="row mt-4 text-center">
        <h1>วันที่ {{ $convertDate(round_date) }}</h1>
      </div>
      <div class="row mt-2 text-center">
        <h1>รอบ {{ round_name }}</h1>
      </div>
      <table width="400" align="center">
        <tr>
          <td style="vertical-align: top">
            <table width="200">
              <tr>
                <td colspan="2" align="center" bgcolor="#ADFF2F">คู่</td>
              </tr>

              <tr bgcolor="#FFD700">
                <td width="100" align="center">ชื่อ</td>
                <td align="center">ยอด</td>
              </tr>
              <tr v-for="(data, key) in bet_even_data" :key="key">
                <td width="100" align="center">{{ data.member_name }}</td>
                <td align="center">{{ $formatPrice(data.price) }}</td>
              </tr>
              <client-only v-if="length_even < length_odd">
                <tr v-for="length_even in length_odd - length_even">
                  <td width="100" align="center">&nbsp;</td>
                  <td align="center"></td>
                </tr>
              </client-only>
              <tr bgcolor="#00CED1">
                <td width="100" align="center">รวม</td>
                <td align="center">{{ $formatPrice(sum_bet_even) }}</td>
              </tr>
            </table>
          </td>
          <td style="vertical-align: top">
            <table width="200">
              <tr>
                <td colspan="2" align="center" bgcolor="#FF0000">คี่</td>
              </tr>

              <tr bgcolor="#FFD700">
                <td width="100" align="center">ชื่อ</td>
                <td align="center">ยอด</td>
              </tr>

              <tr v-for="(data, key) in bet_odd_data" :key="key">
                <td width="100" align="center">{{ data.member_name }}</td>
                <td align="center">{{ $formatPrice(data.price) }}</td>
              </tr>
              <client-only v-if="length_odd < length_even">
                <tr v-for="length_odd in length_even - length_odd">
                  <td width="100" align="center">&nbsp;</td>
                  <td align="center"></td>
                </tr>
              </client-only>
              <tr bgcolor="#00CED1">
                <td width="100" align="center">รวม</td>
                <td align="center">{{ $formatPrice(sum_bet_odd) }}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td colspan="2">
            <div align="center">
              <h3>
                <font color="#FF0000"
                  >** รบกวนตรวจสอบยอด ชั่งแล้วผลได้ผลเสียยึดตามตารางเท่านั้น
                  **</font
                >
              </h3>
            </div>
          </td>
        </tr>

        <tr>
          <td bgcolor="#BA55D3" align="center"><h2>ผล</h2></td>
          <td align="center" bgcolor="#00FA9A">
            <h2>{{ bet_result }}</h2>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bet_odd_data: [],
      bet_even_data: [],
      sum_bet_odd: 0,
      sum_bet_even: 0,
      length_odd: 0,
      length_even: 0,
      round_date: null,
      round_name: null,
      bet_result: null,
    };
  },
  methods: {
    getBet(bet) {
      this.$axios
        .$post(
          "/api/getbet",
          {
            round_id: this.$route.query.id,
            bet: bet,
          },
          this.$setHeaders(this.$route.query.token)
        )
        .then((result) => {
          if (result.result.data.length) {
            if (bet == 1) {
              this.round_date = result.result.data[0].round_date;
              this.round_name = result.result.data[0].round_name;
              this.bet_result = result.result.data[0].bet_result;
              this.length_odd = result.result.data.length;
              this.bet_odd_data = result.result.data;
              this.sum_bet_odd = result.result.data.reduce(function (
                tot,
                record
              ) {
                return tot + record.price;
              },
              0);
            } else {
              this.round_date = result.result.data[0].round_date;
              this.round_name = result.result.data[0].round_name;
              this.length_even = result.result.data.length;
              this.bet_even_data = result.result.data;
              this.sum_bet_even = result.result.data.reduce(function (
                tot,
                record
              ) {
                return tot + record.price;
              },
              0);
            }
          }
        });
    },
    caldup() {
      if (this.sum_bet_odd > this.sum_bet_even) {
        return this.sum_bet_odd - this.sum_bet_even;
      } else {
        return this.sum_bet_even - this.sum_bet_odd;
      }
    },
    getRound() {
      this.$axios
        .$post(
          "/api/getroundbyid",
          {
            id: this.$route.query.id,
          },
          this.$setHeaders(this.$route.query.token)
        )
        .then((result) => {
          if (result.result.data.length) {
            this.bet_result =
              result.result.data[0].weight != null
                ? this.$formatPrice(result.result.data[0].weight)
                : "รอผล";
          }
        });
    },
  },

  mounted() {
    this.getBet(1);
    this.getBet(2);
    this.getRound();
  },
};
</script>
<style lang="scss" scoped>
table,
td,
th {
  border: 1px solid;
  font-size: 18px;
  font-weight: bold;
}

table {
  border-collapse: collapse;
}
</style>
