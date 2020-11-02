<template>
    <div>
        <van-button type="danger" block @click="loginOut">注销</van-button>
    </div>
</template>

<script>
    import {Button} from 'vant';
    export default {
        name: "index",
        components: {
            [Button.name]: Button,
        },
        data() {
            return {

            };
        },
        methods: {
            loginOut() {
                let vm = this;
                vm.$dialog.confirm({message:'注销账户，需重新登录！'})
                .then(()=>{
                    sessionStorage.removeItem('userInfo');
                    vm.$router.push('/login');
                })
                .catch(()=>{
                    console.log('取消注销');
                });

            }
        }
    }
</script>

<style scoped>

</style>