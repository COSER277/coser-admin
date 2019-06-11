<template>
  <div class="index">
    <el-container>
      <el-aside width="400px">
        <el-menu
          :default-openeds="['1', '3']"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/articles/index">博主主页</el-menu-item>
          <el-menu-item index="/articles/create">创作文章</el-menu-item>
          <el-menu-item index="/articles/create">文章归档</el-menu-item>
        </el-menu>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "inde",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style  scoped>
</style>