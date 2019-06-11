<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="text-primary" style="text-align:center;font-weight:700;">管理员登录</span>
      </div>

      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="admin">
          <el-input type="text" v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>


<script>
import { mapMutations } from "vuex";
export default {
  data() {
    var validateadmin = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        name: "",
        pass: ""
        // checkPass: ""
      },
      token: "",
      rules: {
        name: [{ validator: validateadmin, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
        // checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  computed: {},
  mounted() {
    // if (this.adminInfo) {
    //   this.ruleForm.username = this.adminInfo.userName;
    // }
  },
  methods: {
    ...mapMutations(["changLogin"]),
    submitForm() {
      if (this.loginForm.name === "" || this.loginForm.pass === "") {
        this.$notify({
          title: "登录错误！",
          type: "warning",
          message: "请检查账号与密码是否正确!"
        });
      } else {
        this.$http
          .post("login", this.loginForm)
          .then(res => {
            this.token = "Coser" + res.data;
            this.changLogin({ Authorization: this.token });
            this.$notify({
              title: "登录成功!",
              type: "success",
              message: "Welcom come black!"
            });
            this.$router.push("a/articles/index");
          })
          .catch(() => {
            this.$notify({
              title: "登录失败!",
              type: "warning",
              message: "请检查账号与密码是否正确!"
            });
          });
      }
      //二
      //    if (valid) {
      //   if (this.loginForm.admin == "1" && this.loginForm.pass == "123") {
      //     this.$notify({
      //       title: "登录成功!",
      //       type: "success",
      //       message: "Welcom come black!"
      //     });
      //     let loginFormParams = {
      //       username: this.loginForm.username,
      //       password: this.loginForm.pass
      //     };
      //     this.adminLogin(loginFormParams)
      //       .then(info => {
      //         window.location.reload();
      //       })
      //       .catch(err => {
      //         this.$toast(err.msg, "error");
      //       });
      //   } else {
      //     this.$notify({
      //       title: "登录错误！",
      //       type: "warning",
      //       message: "请检查账号与密码是否正确!"
      //     });
      //   }
      // } else {
      //   return false;
      // }
      //});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style  scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10% 0;
}
*:-webkit-scrollbar {
  display: none;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>