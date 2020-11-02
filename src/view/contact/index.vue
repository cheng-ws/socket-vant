<template>
    <div>
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                offset="50"
                @load="onLoad"
        >
            <van-cell v-for="(item,index) in list" :key="index" :title="item.username" is-link :clickable="true"
                      @click="handleOneUser(item)"/>
        </van-list>
    </div>
</template>

<script>
    import {List,Cell} from 'vant';

    export default {
        name: "home-index",
        components: {
            [List.name]: List,
            [Cell.name]: Cell,
        },
        data () {
            return {
                list: [],
                error: false,
                loading: false,
                finished: false,
            };
        },
        created () {
           let vm = this;
           vm.onLoad();
        },
        watch: {
          '$store.getters.getOnlineUser' () {
             let vm  = this;
             vm.onLoad();
          }
        },
        methods: {
            onLoad () {
                let vm = this;
                setTimeout(()=>{
                    let data = vm.$store.getters.getOnlineUser;
                    vm.list = data;
                    vm.loading = false;
                    vm.finished = true;
                },100);
            },
            handleOneUser(params) {
                let vm = this;
                let username = params.username;
                vm.$router.push({name: 'chat', 'query': {chatname:username}});
            }
        },
    }
</script>

<style scoped>

</style>