<template>
  <div class="edit">
    <el-form
      ref="article"
      model="article"
      label-width="100px"
      @submit.native.prevent="saveArticle(article)"
    >
      <el-form-item label="文章标题">
        <el-input v-model="article.tittle"></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select v-model="article.category" placeholder="请选择分类">
          <el-option v-for="item in categories" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="允许评论">
        <el-switch v-model="article.allowComment"></el-switch>
      </el-form-item>
      <el-form-item label="文章内容">
        <!-- <el-input type="textarea" v-model="article.body"></el-input> -->
        <mavon-editor v-model="article.body"></mavon-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="success" native-type="submit">保存文章</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  name: "edit",
  components: {
    mavonEditor
  },
  props: {},
  data() {
    return {
      article: {},
      categories: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    getArticle() {
      this.$http
        .get(`articles/${this.$route.params.id}`)
        .then(res => {
          this.$message({
            message: "获取文章成功",
            type: "success"
          });

          this.article = res.data.data;
          console.log(this.article);
        })
        .catch(err => {
          this.$message.error("获取文章失败" + err);
        });
          //获取分类
      this.$http
        .get("categories")
        .then(res => {
          this.categories = res.data;
        })
        .catch(err => {
          this.$message.error("错了哦，获取文章列表失败" + err);
        });
    },
    saveArticle(article) {
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
            .put(`articles/${this.$route.params.id}`, this.article)
            .then(() => {
              this.$message({
                message: "保存文章成功",
                type: "success"
              });
              this.$router.push("/a/articles/index");
            })
            .catch(err => {
              this.$message.error("保存文章失败" + err);
            });
        }
      });
    }
  },
  created() {
    this.getArticle();
  },
  mounted() {}
};
</script>
<style  scoped>
</style>