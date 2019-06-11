const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors')
const {
    Article,
    Category,
    Admin,
    Tag,
    Resource
} = require("./model");

const app = express();
//允许接收json 格式
app.use(express.json());
//跨越
app.use(cors());
/*----------------------------------静态文件托管--------------------------- */
app.use("/", express.static("public"));
/*---------------------------------接口--start----------------------- */
//根
app.get("/api", async (req, res) => {
    res.send("The Api server is normal running...");
});
//=======================用户接口=============================
//所有
app.get('/api/admin', async (req, res) => {
    const admin = await Admin.find()
    res.send(admin);
})
//添加
app.put("/api/admin", async function (req, res) {
    const admin = req.body
    await Admin.create(admin);
    res.send("add ok");
});
//登录
app.post("/api/login", async (req, res) => {
    const admin = await Admin.findOne({
        adminname: req.body.name
    });
    if (!admin) {
        return res.status(422).send({
            message: "用户名不存在"
        });
    }
    const isPasswordValid = require('bcrypt').compareSync(
        req.body.pass,
        admin.password
    );
    if (!isPasswordValid) {
        return res.status(422).send({
            message: "密码错误"
        });
    }
    res.send({
        token: "zxcvbnmasdfghjklqwertyuiop"
    });
});
//=====================文章接口================================
//所有文章
app.get("/api/articles", async (req, res) => {
    const articles = await Article.find();
    res.send(articles);
});
//文章详情
app.get("/api/articles/:id", async (req, res) => {
    const data = await Article.findById(req.params.id);
    if (!data) {
        return res.send({
            coe: "-1",
            message: "文章不存在",
        })
    }
    else {
        res.send({
            code: "0",
            data,
            message: "success"
        });
    }
});
//文章修该
app.put("/api/articles/:id", async (req, res) => {
    req.body.time = Date.parse(new Date());
    const data = await Article.findByIdAndUpdate(req.params.id, req.body);
    if (!data) {
        return res.send({
            coe: "-1",
            message: "文章不存在",
        })
    }
    else {
        res.send({
            code: "0",
            data,
            message: "success"
        });
    }
});
//添加文章
app.put("/api/articles", async function (req, res) {
    req.body.time = Date.parse(new Date());
    const article = req.body
    if (!article) {
        return res.status(422).send({
            code: "-1",
            message: "this request fail!"
        })
    }
    else {
        await Article.create(article);
        res.send("add ok");
    }
});
//删除文章
app.delete('/api/articles/:id', async function (req, res) {
    const data = await Article.findById(req.params.id)
    if (!data) {
        return res.status(422).send({
            code: "-1",
            message: "文章不存在"
        });
    }
    else {
        await data.remove()
        res.send({
            coed: 0,
            mag: "success",
            data: ""
        })
    }
})
//======================分类接口===============================
//所有分类
app.get("/api/categories", async (req, res) => {
    const category = await Category.find();
    if (!category) {
        return res.status(422).send({
            code: "-1",
            message: "no any data"
        })
    }
    else {
        res.send(category);
    }
});
//添加分类
app.put("/api/categories", async (req, res) => {
    const category = req.body
    category.craete_time = Date.parse(new Date());
    await Category.create(category)
    res.send("add ok");
});
//=======================标签接口============================
//所有标签
app.get("/api/tags", async (req, res) => {
    const tag = await Tag.find();
    res.send(tag);
});
//添加标签
app.post("/api/addtag", async (req, res) => {
    const tag = await Tag.create({
        time: req.body.tiem,
        name: req.body.name,
        value: req.body.value,
    });
    res.send("addtag api");
});
//===========================资源接口=============================
//所有i资源
app.get("/api/resources", async (req, res) => {
    const resource = await Resource.find();
    res.send(resource);
});
//添加资源
app.put("/api/resources", async function (req, res) {
    req.body.time = Date.parse(new Date());
    const resource = req.body
    if (!resource) {
        return res.status(422).send({
            code: "-1",
            message: "this request fail!"
        })
    }
    else {
        await Resource.create(resource);
        res.send("add ok");
    }
});
/*---------------------------------接口--end----------------------- */

/*----------------------------------启动express------------------------------- */
app.listen(3001, () => {
    console.log("http://localhost:3001");
});