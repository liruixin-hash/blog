<template>
<Layout>

        <el-card shadow="never" style="min-height: 400px;margin-bottom: 20px;padding: 0px 0px 20px 0px">
            <el-tabs  v-model="activeTab" type="card" >
                <el-tab-pane :label="'粉丝 '+$page.userlist.totalCount" name="followers" style="padding: 5px">
                    <div >
                        <div v-if="$page.userlist.totalCount>0">
                            <el-row style="min-height: 200px; " >
                                <el-col :span="8"  style="padding: 10px" v-for="item in $page.userlist.edges.slice((followers.query.page-1)*followers.query.pageSize,followers.query.page*followers.query.pageSize)" :key="item.node.id">
                                    <el-card shadow="hover" style="font-size: 13px;color: #606266;line-height: 20px">
                                        <i class="el-icon-star-off"></i>&emsp;
                                        <g-link :to="'/social/details/'+item.node.id" style=" text-decoration:none;cursor:pointer">{{item.node.name}}</g-link>
                                        <br>
                                        <i class="el-icon-message"></i>&emsp;
                                        <a :href="item.node.htmlUrl" target="_blank" style=" text-decoration:none;cursor:pointer">TA的主页</a>
                                        <br>
                                        <img :src="item.node.imageUrl" style="width: 100%;border-radius:5px;margin-top: 5px">
                                    </el-card>
                                </el-col>
                            </el-row>
                            <div style="text-align: center;margin-top: 10px">
                                <el-pagination @current-change="onSelect" background layout="prev, pager, next"  :current-page.sync="followers.query.page"
                                    :page-size="followers.query.pageSize" :total="$page.userlist.totalCount">
                                </el-pagination>
                            </div>
                        </div>
                        <div style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-else>
                            <font style="font-size: 30px;color:#dddddd ">
                                <b>(￢_￢) 没有一个粉丝</b>
                            </font>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="'关注 '+$page.follows.totalCount" name="following" style="padding: 5px">
                    <div >
                        <div v-if="$page.follows.totalCount>0">
                            <el-row style="min-height: 200px; ">
                                <el-col :span="8"  style="padding: 10px"  v-for="item in $page.follows.edges.slice((following.query.page-1)*following.query.pageSize,following.query.page*following.query.pageSize)" :key="item.node.id">
                                    <el-card shadow="hover" style="font-size: 13px;color: #606266;line-height: 20px">
                                        <i class="el-icon-star-off"></i>&emsp;
                                        <a  style=" text-decoration:none;cursor:pointer"></a>
                                        <br>
                                        <i class="el-icon-message"></i>&emsp;
                                        <a :href="item.node.htmlUrl" target="_blank" style=" text-decoration:none;cursor:pointer">TA的主页</a>
                                        <br>
                                        <img :src="item.node.imageUrl" style="width: 100%;border-radius:5px;margin-top: 5px">
                                    </el-card>
                                </el-col>
                            </el-row>
                            <div style="text-align: center;margin-top: 10px">
                                <el-pagination  background layout="prev, pager, next" :current-page.sync="following.query.page"
                                    :page-size="following.query.pageSize" :total="$page.follows.totalCount">
                                </el-pagination>
                            </div>
                        </div>
                        <div style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-else>
                            <font style="font-size: 30px;color:#dddddd ">
                                <b>(￢_￢) 还没有关注一个人</b>
                            </font>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>

</Layout>
</template>
<page-query>
    query{
        userlist:allStrapiUserlist{
            edges{
                node{
                    id
                    name
                    imageUrl
                    htmlUrl
                }
            }
            totalCount
        } 
        follows:allStrapiFollows{
            edges{
                node{
                    id
                    name
                    imageUrl
                    htmlUrl
                }
            }
            totalCount
        }       
    }
</page-query>
<script>
 
    export default {
       name:'SocialMain',
      data(){
          return{
               activeTab: "followers",
                followers: {
                    query: {
                        page: 1,
                        pageSize: 9,
                        pageNumber: 1
                    },
                    loading: false,
            
                },
                following: {
                    query: {
                        page: 1,
                        pageSize: 1,
                        pageNumber: 1
                    },
                    loading: false,
            
                }
          }
      },
     methods: {
            onSelect() {
              console.log(this.followers.query.page)
            }
     }
        
    }
</script>