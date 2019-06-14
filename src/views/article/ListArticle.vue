<template>
  <div class="list">
    <el-table :data="articles">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="文章内容">
              <!-- <el-input type="textarea" v-model="props.row.body "></el-input> -->
              <p>{{props.row.body}}</p>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tittle" label="文章标题" width="120"></el-table-column>
      <!-- <el-table-column prop="body" label="内容"></el-table-column> -->
      <el-table-column label="分类">
        <template slot-scope="scope">
          <span>{{scope.row.category}}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签">
        <template slot-scope="scope">
          <el-tag type="danger">{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="文章状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status?'success':'danger'">{{scope.row.status?"发布中":"未发布"}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="评论权限">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.allowComment?'success':'danger'"
          >{{scope.row.allowComment?"允许":"禁止"}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="EditArticle(scope.row._id)" type="primary" size="small">编辑</el-button>
          <el-button @click="RemoveArticle(scope.row._id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    <el-dialog title="文章修改" :visible.sync="EditialogVisiable" width="80%">
      <el-form
        ref="article"
        :model="article"
        label-width="80px"
        @submit.native.prevent="saveArticle(article)"
      >
        <el-form-item label="文章标题">
          <el-input v-model="article.tittle"></el-input>
        </el-form-item>
        <el-form-item label="文章分类">
          <el-select v-model="article.category" placeholder="请选择分类">
            <el-option
              v-for="item in categories"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
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
          <!-- <el-input type="textarea" v-model="article.body"></el-input> -->
          <mavon-editor v-model="article.body"></mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="success" native-type="submit">保存文章</el-button>
          <el-button @click="EditialogVisiable = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  name: "lsit",
  components: { mavonEditor },
  props: {},
  data() {
    return {
      articles: [],
      EditialogVisiable: false,
      article: {},
      categories: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 获取所有文章
    getArticleList() {
      this.$http
        .get("articles", this.article)
        .then(res => {
          // this.$message({
          //   message: "恭喜你，获取文章列表成功",
          //   type: "success"
          // });
          this.articles = res.data;
        })
        .catch(err => {
          this.$message.error("错了哦，获取文章列表失败" + err);
        });
        //获取分类
      this.$http
        .get("categories")
        .then(res => {
          // this.$message({
          //   message: "恭喜你，获取文章列表成功",
          //   type: "success"
          // });
          this.categories = res.data;
        })
        .catch(err => {
          this.$message.error("错了哦，获取文章列表失败" + err);
        });
    },
    //获取特定文章详情
    getArticle() {
      this.$http
        .get(`articles/${this.$route.params.id}`)
        .then(res => {
          // this.$message({
          //   message: "获取文章成功",
          //   type: "success"
          // });

          this.article = res.data;
          console.log(this.article);
        })
        .catch(err => {
          this.$message.error("获取文章失败" + err);
        });
    },
    //编辑文章 跳转方式 EditArticle(id) { this.$router.push(`/articles/${id}/edit`)}
    //编辑文章 弹窗方式
    EditArticle(id) {
      this.EditialogVisiable = true;
      this.$http
        .get(`articles/${id}`)
        .then(res => {
          // this.$message({
          //   message: "获取文章成功",
          //   type: "success"
          // });
          this.article = res.data.data;
        })
        .catch(err => {
          this.$message.error("获取文章失败" + err);
        });
    },
    //编辑保存
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
            .put(`articles/${article._id}`, this.article)
            .then(() => {
              this.$message({
                message: "保存文章成功",
                type: "success"
              });
              this.EditialogVisiable = false;
              this.$router.push("/a/articles/index");

              this.getArticleList();
            })
            .catch(err => {
              this.$message.error("保存文章失败" + err);
            });
        }
      });
    },
    //删除文章
    RemoveArticle(id) {
      var _this = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete(`articles/${id}`)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              _this.getArticleList();
            })
            .catch(err => {
              this.$message.error("删除文章失败" + err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getArticleList();
  },
  mounted() {}
};
</script>
<style  scoped>
</style>