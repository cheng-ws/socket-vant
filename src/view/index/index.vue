<template>
    <div class="index">
        <div class="index-header">
            <header-bar
                    :title="title"
                    :fixed="true"
                    :leftarrow="leftarrow"
                    :zindex="10"
                    @left="handleLeft"
            ></header-bar>
        </div>
        <div class="index-content"> <router-view /></div>
        <tabbar class="index-bottom" v-if="tabbarFlag"></tabbar>
    </div>
</template>

<script>
    import Tabbar from '@/components/tabbar';
    import HeaderBar from '@/components/header';
    export default {
        name: "index",
        components: {
            Tabbar,
            HeaderBar,
        },
        data () {
            return {
                title: '',
                tabbarFlag: true,
                leftarrow: false,
            };
        },
        created () {
          // this.init();
          //   this.$io.dispatch('IO_INIT','127.0.0.1:3000');
        },
        watch: {
            $route: {
                handler:function (route) {
                    let vm = this;
                    let val = route.path;
                    let title = '';
                    if(val === '/message') {
                        title = '消息';
                    }
                    if(val === '/contact') {
                        title = '联系人';
                    }
                    if(val === '/person') {
                        title = '我的';
                    }
                    if(val === '/chat') {
                        let query = route.query;
                        if(!query.chatname) {
                            vm.$router.push('/contact');
                        }else {
                            title = query.chatname;
                            vm.$store.commit('CHAT_INFO',{username: title});
                            vm.tabbarFlag = false;
                            vm.leftarrow = true;
                        }
                    }else {
                        vm.tabbarFlag = true;
                        vm.leftarrow = false;
                    }
                    vm.title = title;
                    vm.init();
                },
                deep: true,
                immediate: true,
            }
        },
        methods: {
            init() {
                // console.log(this.$store);
                // let vm = this;
                // let userInfo = sessionStorage.getItem('userInfo');
                // let username = JSON.parse(userInfo).username;
                // vm.$io.on('connect',()=>{
                //     vm.$io.emit('online',username);
                // });
            },
            handleLeft () {
                let vm = this;
                vm.$router.go('-1');
            }
        }
    }
</script>

<style scoped lang="less">
.index {
    position: relative;
    &-header {
        /*background: aqua;*/
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        width: 100%;
        height: 46px;
        /*z-index: 10;*/
        /deep/ .van-nav-bar--fixed {
            background: #2eaeff;
        }
    }
    &-content {
        width: 100%;
        /*margin-top: 46px;*/
        margin-bottom: 50px;
        height: calc(100vh - 96px);
        overflow-x: hidden;
        overflow-y: auto;
    }
    &-bottom {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50px;
        z-index: 10;
    }

}
</style>