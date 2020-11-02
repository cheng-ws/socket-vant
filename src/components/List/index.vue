<template>
    <div>
        <van-list
                v-model="loading"
                offset="50"
                @load="onLoad"
        >
            <van-cell v-for="(item,index) in list" :key="index" :title="item.message"/>
        </van-list>
    </div>
</template>

<script>
    import {List,Cell} from 'vant';
    export default {
        name: "index",
        components: {
            [List.name]: List,
            [Cell.name]: Cell,
        },
        props: {
            list: {
                type: Array,
                default: ()=>[]
            }
        },
        data () {
            return {
                error: false,
                loading: false,
            };
        },
        created () {
            let vm = this;
            vm.onLoad();
        },
        mounted () {
        },
        watch: {

        },
        methods: {
            onLoad() {
                let vm = this;
                // let data = vm.$store.getters.getCurrentChatList;
                // console.log(data);
                // vm.list = data;
                vm.loading = false;
            },

        }
    }
</script>

<style scoped>

</style>