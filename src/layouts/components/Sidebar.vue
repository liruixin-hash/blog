<template>
    <div>
        <el-card shadow="never">
            <el-menu  >
                <el-menu-item v-for="menu in $static.menus.edges" :key="menu.node.id">
                    <i :class="menu.node.icon"></i>
                    <g-link :to="menu.node.path"><span slot="title">{{ menu.node.menu_name }}</span></g-link>
                </el-menu-item>
               
            </el-menu>
 
        </el-card>

        <el-card shadow="never" style="margin-top: 20px;text-align: center">
            <div  style="font-size: 0.9rem;line-height: 1.5;color: #606c71;" v-if="!token">
                <el-tag type="danger" size="small">&nbsp;</el-tag>&nbsp;&nbsp; Token未绑定&nbsp;&nbsp;
                <el-button type="text" @click="openTokenDialog">绑定</el-button>
            </div>
            <div  style="font-size: 0.9rem;line-height: 1.5;color: #303133;" v-else>
                <el-tag type="success" size="small">&nbsp;</el-tag>&nbsp;&nbsp; Token已绑定&nbsp;&nbsp;
                <el-button type="text" @click="destory">注销</el-button>
            </div>
            <div style="margin-top: 10px;text-align: left">
                <el-alert title="Token获取" type="info" description="在 github-> settings-> developerSettings-> personalAccessTokens 勾选gist权限,获取Token. 详情参考README.md"
                    >
                </el-alert>
            </div>
        </el-card>
         <token-dialog ref="tokenDialog"></token-dialog>
    </div>
</template>
<static-query>
    query{
        menus:allStrapiMenu(order: ASC){
            edges{
                node{
                    id
                    menu_name
                    icon
                    path
                }
            }
        }
         myinfo:strapiMyInfos(id:1){
            
            username
            location
            imagesUrl
        
        }  

    }
</static-query>
<script>
    import { mapMutations, mapState } from 'vuex'
    import TokenDialog from './TokenDialog'
    export default {
        name:'Sidebar',
        computed:{
            ...mapState({token:'Token'})
        },
        methods:{
            ...mapMutations(['increment']),
            destory:function(){
                this.increment("")
            },
           openTokenDialog() {
                this.$refs.tokenDialog.open(() => {
           
                })
            },
        },
        components: {
            TokenDialog
        },
        
    }
</script>