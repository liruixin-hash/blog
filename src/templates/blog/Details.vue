<template>
<Layout>
    <div style="min-height: 600px" >
        <el-card shadow="never" style="min-height: 400px">
            <div slot="header">
                <el-row>
                    <el-col :span="12">
                        <span>{{$page.post.title}}</span>
                    </el-col>
                    <el-col :span="12">
                        <div style="text-align: right;">
                            <el-button  style="padding: 3px 0" type="text" icon="el-icon-share">分享</el-button>
                            <el-button  style="padding: 3px 0" type="text" icon="el-icon-edit" >编辑</el-button>
                            <el-button style=" padding: 3px 0" type="text" icon="el-icon-more-outline">更多博客</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                发布 {{$page.post.created_at}}
                <br> 更新 {{$page.post.updateTime}}
            </div>
            <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 5px 0px 5px 0px">
                <pre style="font-family: '微软雅黑'">{{$page.post.description}}</pre>
            </div>
            <div  class="markdown-body" style="padding-top: 20px"></div>
        </el-card>
    </div>
    </Layout>
</template>
<page-query>
    query($id:ID!){
        post:strapiPosts(id:$id){
            id
            title
            description
            created_at
            updateTime
        } 
           
    }
</page-query>
<script>

    export default {
      name:'BlogDetail'
    }
</script>