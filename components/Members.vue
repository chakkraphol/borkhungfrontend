<template>
  <div>
    <div class="row"><Menu active="Member" /></div>
    <div class="row mt-4">
      <div class="container col-md-11">
        <a href="/addmember">
          <button type="button" class="btn btn-success">
            + เพิ่มสมาชิก
          </button></a
        >
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12 d-flex justify-content-center">
        <table id="table">
          <tr>
            <th>ลำดับ</th>
            <th>ชื่อสมาชิก</th>
            <th>Line</th>
            <th>เบอร์โทร</th>
            <th>แก้ไข</th>
            <th>ลบ</th>
          </tr>

          <tr v-for="(data, key) in round" :key="key">
            <td>{{ key + 1 }}</td>
            <td>
              <a
                :href="`/bet/member?member_id=${data.id}&round_date=${date_today}&name=${data.name}&token=${token}`"
                target="_blank"
                >{{ data.name }}</a
              >
            </td>
            <td>{{ data.linename }}</td>
            <td>{{ data.mobile }}</td>
            <td>
              <a :href="`member/${data.id}`">แก้ไข</a>
            </td>
            <td>
              <span @click="delmember(data.id)" style="cursor: pointer"
                >ลบ</span
              >
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="row mt-4">
      <div class="container col-md-11">
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-1">page:</div>
            <div class="col-md-1">
              <select class="form-select input-small" @change="changepage">
                <option
                  v-for="startpage in page"
                  :value="startpage"
                  :selected="$route.query.page == startpage"
                >
                  {{ startpage++ }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
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
      start: 0,
      limit: process.env.LIMIT_PAGE || 20,
      round: [],
      page: 1,
      date_today: new Date().toLocaleString("sv").substring(0, 10),
      startpage: 0,
      token: sessionStorage.getItem("token"),
    };
  },
  methods: {
    delmember(id) {
      if (confirm("คุณแน่ใจที่จะทำการลบการสมาชิกท่านนี้") == true) {
        this.$axios
          .$post(
            "/api/delmember",
            {
              id: id,
            },
            this.$setHeaders(sessionStorage.getItem("token"))
          )
          .then((result) => {
            this.getData();
          });
      }
    },
    getData() {
      this.start =
        this.$route.query.page > 1
          ? (parseInt(this.$route.query.page) - 1) * this.limit
          : 0;
      this.$axios
        .$post(
          "/api/getmember",
          {
            start: this.start,
            limit: this.limit,
          },
          this.$setHeaders(sessionStorage.getItem("token"))
        )
        .then((result) => {
          this.page =
            this.limit >= parseInt(result.result.count)
              ? 1
              : Math.ceil(parseInt(result.result.count) / this.limit);
          this.round = result.result.data;
        });
    },
    changepage(e) {
      window.location.href = "/members?page=" + e.target.value;
    },
  },

  mounted() {
    this.getData();
  },
};
</script>
