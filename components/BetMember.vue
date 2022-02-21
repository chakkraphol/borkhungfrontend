<template>
  <div>
    <div class="row mt-4 text-center">
      <h1>ชื่อสมาชิก {{ $route.query.name }}</h1>
    </div>
    <div class="row mt-2 text-center">
      <h1>วันที่ {{ $convertDate($route.query.round_date) }}</h1>
    </div>
    <div class="row mt-4">
      <div class="col-md-12 d-flex justify-content-center">
        <table id="table">
          <tr>
            <th>ลำดับ</th>
            <th>รอบ</th>
            <th>เดิมพัน</th>
            <th>ผลการเดิมพัน</th>
            <th>ราคา</th>
            <th>ลบ</th>
            <th>บวก</th>
          </tr>

          <tr v-for="(data, key) in memberbet" :key="key">
            <td>{{ key + 1 }}</td>
            <td>{{ data.round_name }}</td>
            <td>
              <span v-if="data.bet == 1">คี่</span
              ><span v-if="data.bet == 2">คู่</span>
            </td>
            <td>
              <span v-if="data.bet_result == 1">คี่</span
              ><span v-if="data.bet_result == 2">คู่</span
              ><span v-if="data.bet_result != 1 && data.bet_result != 2"
                >รอผล</span
              >
            </td>
            <td>{{ $formatPrice(data.price) }}</td>
            <td>
              <span
                v-if="
                  data.bet != data.bet_result &&
                  (data.bet_result == 1 || data.bet_result == 2)
                "
                style="color: #ff0000"
              >
                -{{ $formatPrice(data.price) }}</span
              >
            </td>
            <td>
              <span
                v-if="
                  data.bet == data.bet_result &&
                  (data.bet_result == 1 || data.bet_result == 2)
                "
                style="color: #008000"
              >
                +{{ cal(data.price, data.rate_bet) }}</span
              >
            </td>
          </tr>
          <tr>
            <td>รวม</td>
            <td></td>
            <td></td>
            <td></td>
            <td>{{ $formatPrice(sumbet) }}</td>
            <td style="color: #ff0000">{{ $formatPrice(sumrub) }}</td>
            <td style="color: #008000">{{ $formatPrice(sumplus) }}</td>
          </tr>
          <tr>
            <td colspan="7">
              สรุปยอด
              <span v-if="sumplus >= sumrub"
                ><span style="color: #008000"
                  >+{{ $formatPriceFloat(sumplus - sumrub) }}</span
                ></span
              ><span v-else
                ><span style="color: #ff0000"
                  >-{{ $formatPriceFloat(sumrub - sumplus) }}</span
                ></span
              >
            </td>
          </tr>
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
      memberbet: [],
      sumbet: 0,
      sumplus: 0,
      sumrub: 0,
      round_id: null,
    };
  },
  methods: {
    getData() {
      this.$axios
        .$post(
          "/api/getbetmember",
          {
            member_id: this.$route.query.member_id
              ? this.$route.query.member_id
              : null,
            round_date: this.$route.query.round_date
              ? this.$route.query.round_date
              : null,
            round_id: this.$route.query.round_id
              ? this.$route.query.round_id
              : null,
          },
          this.$setHeaders(this.$route.query.token)
        )
        .then((result) => {
          if (result.result.data.length) {
            this.memberbet = result.result.data;
            this.sumbet = result.result.data.reduce(function (tot, record) {
              return tot + record.price;
            }, 0);
            this.sumplus = result.result.data.reduce(function (tot, record) {
              let data = 0;
              if (
                record.bet == record.bet_result &&
                (record.bet_result == 1 || record.bet_result == 2)
              ) {
                data = record.price - (record.price * record.rate_bet) / 100;
              }
              return tot + data;
            }, 0);
            this.sumrub = result.result.data.reduce(function (tot, record) {
              if (
                record.bet != record.bet_result &&
                (record.bet_result == 1 || record.bet_result == 2)
              ) {
                tot = record.price + tot;
              }
              return tot;
            }, 0);
          }
        });
    },
    cal(price, rate_bet) {
      let data = price - (price * rate_bet) / 100;
      return this.$formatPriceFloat(data);
    },
  },

  mounted() {
    this.getData();
  },
};
</script>
