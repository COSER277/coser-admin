<template>
  <div>
    <div v-if="isAdminWrap">
      <el-container style="height: 100vh; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: #545c64">
          <el-menu router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>文章管理
              </template>
              <el-menu-item index="/a/articles/index">文章列表</el-menu-item>
              <el-menu-item index="/a/articles/create">新增文章</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-cooperation"></i>资源管理
              </template>
              <el-menu-item index="/a/resources/index">资源列表</el-menu-item>
              <el-menu-item index="/a/resources/create">新增资源</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-custom"></i>友链管理
              </template>
              <el-menu-item index="/a/friends/index">友链列表</el-menu-item>
              <el-menu-item index="/a/friends/create">新增友链</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-container>
          <el-header style="text-align: right; font-size: 12px">
            <!-- <el-button size="mini" type="primary"  style="margin:0 10px;">个人</el-button> -->
            <router-link to="/login" v-if="!this.token">
              <el-button size="mini" type="success">登录</el-button>
            </router-link>
            <el-button size="mini" type="danger" @click="logout()" v-else-if="this.token">注销</el-button>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
          <!-- <el-footer style="background-color: rgb(238, 241, 246)">Footer</el-footer> -->
        </el-container>
      </el-container>
    </div>
    <div v-if="!isAdminWrap">
      <el-container style="height: 100vh; border: 1px solid #eee">
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      token: ""
    };
  },
  computed: {
    ...mapGetters(["isAdminWrap"])
  },
  methods: {
    logout() {
      this.$confirm("此操作将注销账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "注销成功"
          });
          localStorage.removeItem("Authorization");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    getToken() {
      this.token = localStorage.getItem("Authorization");
      this.$router.push("/a/articles/index");
    }
  },
  created() {
    this.getToken();
  },
  watch: {}
};
</script>
<style>
html,
body {
  padding: 0;
  margin: 0;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
