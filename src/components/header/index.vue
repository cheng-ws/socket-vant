<template>
        <van-nav-bar :title="title"
                     :left-arrow="leftarrow"
                     :fixed="fixed"
                     :z-index="zindex"
                     :border="border"
                     @click-left="onClickLeft"
                     @click-right="onClickRight"
        >
            <template #left>
                <slot name="left"></slot>
            </template>
            <template #right>
                 <slot name="right"></slot>
            </template>
        </van-nav-bar>
</template>

<script>
    import {NavBar} from 'vant';

    export default {
        name: "index",
        props: {
            title: {
                type: String,
                default: '标题',
            },
            leftarrow: {
                type: Boolean,
                default: false,
            },
            fixed: {
                type: Boolean,
                default: false,
            },
            zindex: {
                type: Number,
                default: 1,
            },
            border: {
                type: Boolean,
                default: true,
            },
            left: Function,
            right: Function,
        },
        components: {
            [NavBar.name]: NavBar,
        },
        data () {
            return {};
        },
        methods: {
            onClickLeft () {
                this.$emit('left');
            },
            onClickRight () {
                this.$emit('right');
            }
        }

    }
</script>

<style scoped>

</style>