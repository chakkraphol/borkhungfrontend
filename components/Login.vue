<!-- Please remove this file from your project -->
<template>
  <div>
    <h3 align="center">เข้าสู่ระบบ</h3>
    <div class="container mt-5">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <div class="card px-5 py-5 form" id="form1">
            <div class="form-data">
              <div class="forms-inputs mb-4">
                <span>Username</span>
                <input
                  autocomplete="off"
                  type="text"
                  v-model="username"
                  :class="validateusername ? 'is-invalids' : ''"
                  class="form-control"
                  @change="validateusername = false"
                />
              </div>
              <div class="forms-inputs mb-4">
                <span>Password</span>
                <input
                  autocomplete="off"
                  type="password"
                  v-model="password"
                  :class="validatepassword ? 'is-invalids' : ''"
                  class="form-control"
                  @change="validatepassword = false"
                />
              </div>
              <div class="forms-inputs mb-4" v-if="validatelogin">
                <span class="msg-invalids text-center"
                  >Username หรือ Password ไม่ถูกต้อง</span
                >
              </div>
              <div class="mb-3">
                <button
                  v-on:click.stop.prevent="submit"
                  class="btn btn-login w-100"
                >
                  Login
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
  name: "Login",
  data() {
    return {
      username: null,
      password: null,
      validateusername: false,
      validatepassword: false,
      validatelogin: false,
    };
  },
  methods: {
    submit() {
      this.validatelogin = false;
      if (!this.username) {
        this.validateusername = true;
        return;
      }
      if (!this.password) {
        this.validatepassword = true;
        return;
      }

      this.$axios
        .$post("/api/login", {
          username: this.username,
          password: this.password,
        })
        .then(async (result) => {
          if (result.code) {
            if (result.result.token) {
              await this.$auth.loginWith("local", {
                data: result.result.token,
              });
              sessionStorage.setItem("token", result.result.token);
              this.$router.push("/rounds");
            } else {
              this.validatelogin = true;
            }
          } else {
            this.validatelogin = true;
          }
        })
        .catch(function (error) {
          this.validatelogin = true;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
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
