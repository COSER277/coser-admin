const mongoose = require('mongoose')
var url = 'mongodb://localhost:27017/cosereBlog' // 数据库地址
var option = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}
//连接数据库
mongoose.connect(url, option,
    function (err) {
        if (err) {
            console.log('连接失败');
        } else {
            console.log('连接成功');
        }
    });
/* ------------------------------------建立数据库表单-start-----------------------------------*/
//文章表
const ArticleSchema = new mongoose.Schema({
    time: {
        type: Date
    },
    tittle: {
        type: String,
        unique: true,
    },
    body: {
        type: String
    },
    category: {
        type: String,

    },
    tag: {
        type: String,
    },
    status: {
        type: Boolean
    },
    allowComment: {
        type: Boolean
    },
})
const Article = mongoose.model('Article', ArticleSchema);
//-------------------------------------------------------
//分类表
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    create_time: {
        type: Date
    },
    value: {
        type: Number,
        unique: true
    },

})
const Category = mongoose.model('Category', CategorySchema)
//-------------------------------------------------------
//标签表
const TagSchema = new mongoose.Schema({
    name: {
        type: String
    },
    create_time: {
        type: Date
    },
    value: {
        type: Number
    }
})
const Tag = mongoose.model('Tag', TagSchema)
//-------------------------------------------------------
//admin表
const AdminSchema = new mongoose.Schema({
    adminname: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    },
})
const Admin = mongoose.model('Admin', AdminSchema)
//-------------------------------------------------------
//资源文件表
const ResourceSchema = new mongoose.Schema({
    time: {
        type: Date
    }
})
const Resource = mongoose.model('Resource', ResourceSchema)
//-------------------------------------------------------
/* ------------------------------------建立数据库表单-end-----------------------------------*/
module.exports = {
    Article,
    Category,
    Admin,
    Tag,
    Resource
}