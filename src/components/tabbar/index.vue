<template>
    <van-tabbar route>
        <van-tabbar-item replace to='/message' icon="chat-o">消息</van-tabbar-item>
        <van-tabbar-item replace to='/contact' icon="friends-o">联系人</van-tabbar-item>
        <van-tabbar-item replace to='/person' icon="user-circle-o">我的</van-tabbar-item>
<!--        <van-tabbar-item icon="setting-o" badge="20">标签</van-tabbar-item>-->
<!--        <van-icon name="user-circle-o" />-->
    </van-tabbar>
</template>

<script>
    import {Tabbar,TabbarItem} from 'vant';
    export default {
        name: "index",
        components: {
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
        }
    }
</script>

<style scoped>

</style>