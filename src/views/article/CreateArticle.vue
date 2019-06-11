<template>
  <div class="create">
    <el-form
      ref="article"
      :model="article"
      label-width="100px"
      @submit.native.prevent="saveArticle(article)"
    >
      <el-form-item label="文章标题">
        <el-input v-model="article.tittle"></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select v-model="article.category" placeholder="请选择分类">
          <el-option label="前端" value="shanghai"></el-option>
          <el-option label="前端" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标签">
        <el-input v-model="article.tag" placeholder="自定义标签"></el-input>
      </el-form-item>
      <el-form-item label="允许评论">
        <el-switch v-model="article.allowComment"></el-switch>
      </el-form-item>
      <el-form-item label="文章状态">
        <el-switch v-model="article.status"></el-switch>
      </el-form-item>
      <el-form-item label="文章内容">
        <!-- <el-input type="textarea" v-model="form.desc"></el-input> -->
        <mavon-editor v-model="article.body"></mavon-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">添加文章</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "create",
  components: {
    mavonEditor
  },
  props: {},
  data() {
    return {
      article: {
        tittle: "",
        category: "",
        status: null,
        allowComment: null,
        body: ""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    saveArticle(article) {
      //拿到表单内容
      this.$refs.article.validate(valid => {
        //验证
        if (valid) {
          let tittle = article.tittle;
          let body = article.body;
          if (tittle === "") {
            this.$notify({
              type: "warning",
              message: "请检查文章标题是否正确!"
            });
            return 1;
          }
          if (body == "") {
            this.$notify({
              type: "warning",
              message: "请检查文章内容是否正确!"
            });
            return 1;
          }
          this.$http
            .put("articles", this.article)
            .then(res => {
              this.$message({
                message: "恭喜你，添加文章成功" + res.data,
                type: "success"
              });
              this.$router.push("/a/articles/index");
            })
            .catch(err => {
              this.$message.error("错了哦，添加文章失败" + err);
            });
        }
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style  scoped>
</style>