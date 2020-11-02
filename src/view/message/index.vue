<template>
    <div>
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                offset="50"
                @load="onLoad"
        >
            <van-cell v-for="item in list" :key="item" :title="item"/>
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
        methods: {
            onLoad () {
                setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        this.list.push(this.list.length + 1);
                    }

                    // 加载状态结束
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.list.length >= 40) {
                        this.finished = true;
                    }
                }, 1000);
                // vm.loading = true;
                // vm.$http.post('/mysql/login')
                //     .then(() => {
                //
                //         for (let i = 0; i < 10; i++) {
                //             vm.list.push('u'+i);
                //         }
                //         vm.error = false;
                //         vm.loading = false;
                //
                //     })
                //     .catch(() => {
                //         vm.error = true;
                //         vm.loading = false;
                //     });
            },
        },
    }
</script>

<style scoped>

</style>