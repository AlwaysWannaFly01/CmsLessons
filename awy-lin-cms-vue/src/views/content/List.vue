<template>
    <div class="container">
        <div class="title">
            期刊内容列表
        </div>
        <div class="add-button">
            <el-button type="primary">新增内容</el-button>
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
    </div>
</template>

<script>
import {ContentModel} from "@/models/content";
import moment from 'moment';

export default {
    name: "List",
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
        handleEdit() {
        },
        handleDelete() {
        },

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
