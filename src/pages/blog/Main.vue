<template>
    <layout>
    <div style="min-height: 600px" >
        <el-card shadow="never" style="margin-bottom: 20px">
            <el-input placeholder="请输入关键字"  clearable style="width: 300px"></el-input>
            <el-button icon="el-icon-search" style="margin-left: 10px" circle plain></el-button>
            <el-button style="margin-left: 10px" icon="el-icon-share" type="warning" plain circle></el-button>
            <el-button type="primary" icon="el-icon-edit" round plain style="float: right;" @click="goAdd">写博文</el-button>
        </el-card>

        <div>
            <el-card shadow="hover"  style="margin-bottom: 20px" v-for="item in $page.posts.edges.slice(startPage,endPage)" :key="item.node.id">
                <div slot="header">
                    <el-row>
                        <el-col :span="16">
                            <span>
                                <g-link :to="'/blog/details/'+item.node.id" style="text-decoration:none;cursor:pointer" >
                                    <i class="el-icon-edit-outline"></i>&nbsp;&nbsp; {{item.node.created_at}}&nbsp;&nbsp;更新
                                </g-link>
                            </span>
                        </el-col>
                        <el-col :span="8">
                            <div style="text-align: right;">
                                <el-button  style="padding: 3px 0" type="text" icon="el-icon-share"></el-button>
                                <el-button  style="padding: 3px 0" type="text" icon="el-icon-edit"></el-button>
                                <el-button  style="padding: 3px 0" type="text" icon="el-icon-delete" ></el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                    最近更新 {{item.node.created_at}}
                </div>
                <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px">
                    {{item.node.title}}
                </div>
            </el-card>
            <div style="text-align: center">
                <el-pagination  background layout="prev, pager, next" 
                    :current-page.sync="following.query.page"
                    :page-size="following.query.pageSize" :total="$page.posts.totalCount"
                    >
                </el-pagination>
            </div>

        </div>

        <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-if="!$page.posts.edges.length">
            <font style="font-size: 30px;color:#dddddd ">
                <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
            </font>
        </el-card>
    </div>
    </Layout>
</template>
<page-query>
    query{
        posts:allStrapiPosts(order: DESC){
            edges{
                node{
                  id
                  title
                  description
                  updateTime
                  created_at
                }
            }
            totalCount
        }
    }
</page-query>
<script>

    import { mapState } from 'vuex'
    export default {
  
        name:'BlogMain',
        data(){
          return{
                following: {
                    query: {
                        page: 1,
                        pageSize: 5,
                        pageNumber: 1
                    },
                    loading: false,
                }
          }
      },
     computed:{
          startPage:function(){
              return (this.following.query.page-1)*this.following.query.pageSize
          },
          endPage:function(){
              return this.following.query.page*this.following.query.pageSize
          },
          ...mapState({token:'Token'})
      },
      methods:{
          goAdd() {
            //   alert(this.token)
                if (!this.token) {
                    this.$message({
                        message: '请绑定有效的Token',
                        type: 'warning'
                    })
                    return
                }
                this.$router.push('/blog/add')
            },
      },

     
    }
</script>