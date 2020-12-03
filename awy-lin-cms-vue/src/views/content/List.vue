<template>
    <div class="container">
        <div class="title">
            期刊内容列表
        </div>
        <div class="add-button">
            <el-button type="primary" @click="handleAdd">新增内容</el-button>
        </div>
        <div class="table-container">
            <el-table :data="contentList">
                <el-table-column label="序号" width="60" type="index"></el-table-column>
                <el-table-column label="类型" prop="type">
                    <template slot-scope="scope">
                        {{ type[scope.row.type] }}
                    </template>
                </el-table-column>
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="期刊介绍" prop="content"></el-table-column>
                <el-table-column label="音乐外链" prop="url">
                    <template slot-scope="scope">
                        <audio controls v-if="scope.row.url">
                            <source :src="scope.row.url">
                        </audio>
                    </template>
                </el-table-column>
                <el-table-column label="发布时间" prop="pubdate" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.pubdate | formateDate }}
                    </template>
                </el-table-column>
                <el-table-column label="点赞数👍" prop="fav_nums" width="120"></el-table-column>
                <el-table-column label="是否有效" prop="status" width="120">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status === 1" type="success">有效</el-tag>
                        <el-tag v-else type="info">无效</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" v-permission="{permission:'编辑内容',type:'disabled'}">
                            编辑
                        </el-button>
                        <el-button type="danger" @click="handleDelete(scope.row)"
                                   v-permission="{permission:'删除内容',type:'disabled'}">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            :title="dialogTitle"
            width="800px"
            :visible.sync="showDialog"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            @close="resetForm"
        >
            <el-form ref="form" :model="temp" label-width="90px" :rules="rules">
                <el-form-item label="内容封面" prop="image">
                    <upload-imgs ref="uploadEle" :value="contentImgData" :max-num="1">
                    </upload-imgs>
                </el-form-item>
                <el-form-item label="内容类型" prop="type">
                    <el-radio v-model="temp.type" :disabled="dialogTitle==='编辑内容'" :label="100">电影</el-radio>
                    <el-radio v-model="temp.type" :disabled="dialogTitle==='编辑内容'" :label="200">音乐</el-radio>
                    <el-radio v-model="temp.type" :disabled="dialogTitle==='编辑内容'" :label="300">句子</el-radio>
                </el-form-item>
                <el-form-item label="内容标题" prop="title">
                    <el-col :span="11">
                        <el-input v-model="temp.title"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="内容介绍" prop="content">
                    <el-col :span="11">
                        <el-input type="textarea" v-model="temp.content" :rows="2"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="音乐外链" prop="url">
                    <el-col :span="11">
                        <el-input v-model="temp.url"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="发布时间" prop="pubdate">
                    <el-date-picker v-model="temp.pubdate" type="date" placeholder="选择日期">

                    </el-date-picker>
                </el-form-item>
                <el-form-item label="有效状态" prop="status">
                    <el-switch v-model="temp.status" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="showDialog=false">
                        取消
                    </el-button>
                    <el-button @click="dialogTitle==='添加内容'?confirmAdd():confirmEdit()">
                        保存
                    </el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
import {ContentModel} from "@/models/content";
import moment from 'moment';
import UploadImgs from '../../components/base/upload-imgs/index';

export default {
    name: "List",
    components: {
        UploadImgs
    },
    filters: {
        formateDate(time) {
            return moment(time).format("YYYY-MM-DD hh:mm:ss")
        },
    },
    data() {
        return {
            contentList: [],
            type: {
                100: '电影',
                200: '音乐',
                300: '句子',
            },
            showDialog: false,
            dialogTitle: '',
            temp: {
                id: null,
                image: null,
                type: null,
                title: null,
                content: null,
                url: null,
                pubdate: '',
                status: '',
            },
            rules: {
                image: [{required: true, message: '内容封面不能为空', trigger: 'blur'}],
                type: [{required: true, message: '请指定内容类型', trigger: 'blur'}],
                title: [{required: true, message: '内容标题不能为空', trigger: 'blur'}],
                content: [{required: true, message: '内容介绍不能为空', trigger: 'blur'}],
                url: [{type: 'url', message: 'url格式不正确', trigger: 'blur'}],
                pubdate: [{required: true, message: '发布时间不能为空', trigger: 'blur'}],
            },
            contentImgData: [],
            uploadRules: {
                minWidth: 100,
                minHeight: 100,
                maxSize: 5
            }
        }
    },
    created() {
        this.getContentList()
    },
    methods: {
        async getContentList() {
            this.contentList = await ContentModel.getContentList()
        },
        handleAdd() {
            this.dialogTitle = '添加内容';
            this.showDialog = true;
        },
        resetForm() {
            this.contentImgData = []
            this.$refs.form.resetFields();
            this.showDialog = false;
        },
        handleEdit(row) {
            this.dialogTitle = '编辑内容';
            this.showDialog = true;
            this.temp = {
                id: row.id,
                image: row.image,
                type: row.type,
                title: row.title,
                content: row.content,
                url: row.url,
                pubdate: row.pubdate,
                status: row.status,
            }
            this.contentImgData.push({
                display: row.image
            })
        },
        handleDelete() {
        },
        async confirmAdd() {
            const images = await this.$refs.uploadEle.getValue();
            console.log(images)
            this.temp.image = images.length < 1 ? '' : images[0].src;
            this.$refs.form.validate(async valid => {
                if (valid) {
                    delete this.temp.id
                    const res = ContentModel.addContent(this.temp);
                    this.showDialog = false;
                    this.$message.success(res.message);
                    await this.getContentList();
                } else {
                    console.log(valid)
                }
            })
        },
        async confirmEdit() {
            const images = await this.$refs.uploadEle.getValue();
            this.temp.image = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1769048876,1147767271&fm=26&gp=0.jpg';
            this.$refs.form.validate(async valid => {
                if (valid) {
                    const id = this.temp.id;
                    delete this.temp.id;
                    const res = ContentModel.editContent(id, this.temp);
                    this.showDialog = false;
                    this.$message.success(res.message);
                    await this.getContentList();
                } else {
                    console.log(valid)
                }
            })

        },
        beforeUpload(file) {
            console.log(file)
        }
    }
}
</script>

<style scoped lang="scss">
.container {
    .title {
        height: 59px;
        line-height: 59px;
        color: $parent-title-color;
        font-size: 16px;
        font-weight: 500;
        text-indent: 40px;
        border-bottom: 1px solid #dae1ec;
    }

    .add-button {
        padding: 20px 40px;
    }
}
</style>
