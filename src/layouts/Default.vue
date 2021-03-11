<template>
    <div class="layout">
        <section class="page-header" > 
            <div style="position:absolute; top:20px; right:20px; z-index:2;">
                <el-tooltip effect="dark" :content="fullButton.full?'退出':'全屏'" placement="bottom-end">
                    <el-button :icon="fullButton.full?'el-icon-close':'el-icon-rank'" circle></el-button>
                </el-tooltip>
            </div>
            <div v-for="(item,index) in randomIcon" :key="'ri'+index" :style="'position:absolute; top:'+item.top+'px; left:'+item.left+'px; z-index:1;'">
                <font :style="'font-size: '+item.size+'px;color:#fff;'">
                    <b>♪</b>
                </font>
            </div>
            <h1 class="project-name"></h1>
            <h2 class="project-tagline"></h2>
            <a href="" class="btn" target="_blank">GitHub主页</a>
            <a href="" class="btn" target="_blank" >博客源码</a>
        </section> 
        <div style="position:relative;  z-index:2;margin: auto;margin-top:-30px;width:64rem;"> 
            <el-card shadow="never" :body-style="{ padding: '0px' }">
                <el-row>
                    <el-col :span="10">
                        <el-menu  :default-active="topbar.active" mode="horizontal" menu-trigger="click">
                            <el-submenu index="#more">
                                <template slot="title">了解博主</template>
                                <el-menu-item index="#githubHome">github主页</el-menu-item>
                                <el-menu-item index="#blog">其他博客</el-menu-item>
                            </el-submenu>
                            <el-submenu index="#webSites" >
                                <template slot="title">其他网站</template>
                                <el-menu-item ></el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                    <el-col :span="8" style="text-align: center;padding: 12px 0px 0px 10px">
                        <el-row>
                            <el-col :span="4">
                                <el-popover placement="top" trigger="hover">
                                    <div style="text-align: center">
                                        <el-progress color="#67C23A" type="circle" :percentage="music.volume"></el-progress>
                                        <br>
                                        <el-button  icon="el-icon-minus" circle></el-button>
                                        <el-button  icon="el-icon-plus" circle></el-button>
                                    </div>

                                    <el-button id="play" slot="reference" :icon="music.isPlay?'el-icon-refresh':'el-icon-caret-right'" circle></el-button>
                                </el-popover>
                            </el-col>
                            <el-col :span="14" style="padding-left: 20px">
                                <el-slider   style="width: 100%;"></el-slider>
                            </el-col>
                            <el-col :span="6" style="padding: 9px 0px 0px 10px;color:#909399;font-size: 13px">
                                
                            </el-col>
                        </el-row>

                        <audio ref="music" loop autoplay >
                            <source  type="audio/mpeg">
                        </audio>
                       
                    </el-col>
                    <el-col :span="4" style="text-align: right;">
                        <div style="font-size: 20px;color:#606266;margin-top: 5px">
                            <b>{{$static.myinfo.username}}</b>
                        </div>
                        <div style="color:#606266;">
                            <i class="el-icon-location"></i>&nbsp;{{$static.myinfo.location}}
                            <br>
                        </div>
                    </el-col>
                    <el-col :span="2" style="text-align: center;">
                        <img v-popover:bigAvatar :src="$static.myinfo.imagesUrl" style="margin-top: 4px;margin-right: 10px;width:52px; height:52px; border-radius:5px; border: 1px solid #EBEEF5"
                        />
                        <el-popover ref="bigAvatar" placement="top-start"  width="200" trigger="hover">
                            <i class="el-icon-star-on"></i>&emsp;{{$static.myinfo.username}}
                            <br>
                            <i class="el-icon-location"></i>&emsp;{{$static.myinfo.location}}
                            <br>
                            <img :src="$static.myinfo.imagesUrl" style="width: 200px;height: 200px;">
                        </el-popover>
                    </el-col>
                </el-row>

            </el-card>
        </div> 
        <section class="main-content">
            <el-row>
                <el-col :span="6" style="padding-right:10px">
                    <sidebar></sidebar>
                </el-col>
                <el-col :span="18" style="padding-left:10px">
                    
                     <app-main><slot/></app-main>
                </el-col>
            </el-row>

        </section>
        <section class="foot">
            <foot></foot>
        </section>


    </div>
</template>
<static-query>
    query{
        myinfo:strapiMyInfos(id:1){
            
            username
            location
            imagesUrl
        
        }       
    }
</static-query>

<script>
    import { mapMutations, mapState } from 'vuex'
    import Sidebar from './components/Sidebar'
    import AppMain from './components/AppMain'
    
    import Foot from './components/Foot'
    export default {
        components: {
            Sidebar,
            AppMain,
            Foot
        },
        data() {
            return {
                music: {
                    isPlay: false,
                    currentTime: 0,
                    maxTime: 0,
                    volume: 100
                },
                fullButton: {
                    full: false
                },
                topbar: {
                    active: "",
                },
                menus:[],
                randomIcon: []
            }
        },
        computed:{
            ...mapState({token:'Token'})
        },
        methods:{
            ...mapMutations(['increment']),
            
        }
       
    }
</script>

<style>
    .page-header {
        padding: 5rem 6rem;
        color: #fff;
        text-align: center;
        background-color: #159957;
        background-image: linear-gradient(120deg, #155799, #159957);
    }

    .project-name {
        font-size: 3.25rem;
        margin-top: 0;
        margin-bottom: 0.1rem;
    }

    .project-tagline {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        font-weight: normal;
        opacity: 0.7;
    }

    .btn:hover {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        background-color: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.3);
    }

    a:hover {
        text-decoration: underline;
    }

    a:active,
    a:hover {
        outline: 0;
    }

    .btn {
        padding: 0.75rem 1rem;
        display: inline-block;
        margin-bottom: 1rem;
        color: rgba(255, 255, 255, 0.7);
        background-color: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.2);
        border-style: solid;
        border-width: 1px;
        border-radius: 0.3rem;
        transition: color 0.2s, background-color 0.2s, border-color 0.2s;
    }

    a {
        color: #1e6bb8;
        text-decoration: none;
    }

    .btn+.btn {
        margin-left: 1rem;
    }

    .main-content {
        max-width: 64rem;
        padding: 30px 0px 30px 0px;
        margin: 0 auto;
        font-size: 1.1rem;
        word-wrap: break-word;
        min-height: 800px;
    }

    .foot {
        max-width: 67rem;
        margin: 0 auto;
        font-size: 12px !important;
        color: #586069 !important;
        word-wrap: break-word;
    }
</style>