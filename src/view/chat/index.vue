<template>
    <div class="chat">
        <list :list="list"/>
        <div class="chat-send">
            <van-field
                    v-model="sms"
                    center
                    clearable
                    placeholder="请输入内容"
            >
                <template #button>
                    <van-button size="small" type="primary" @click="handleSend">发送</van-button>
                </template>
            </van-field>
        </div>
    </div>
</template>

<script>
    import List from '@/components/List';
    import {Field, Button} from 'vant';

    export default {
        name: "index",
        components: {
            List,
            [Field.name]: Field,
            [Button.name]: Button,
        },
        data () {
            return {
                sms: '',
                list: [],

            };
        },
        watch: {
            '$store.getters.getCurrentChatFlag' () {
                this.getChatList();
            }
        },
        mounted () {
            this.getChatList();
        },
        methods: {
            getChatList () {
                let vm = this;
                let chatList = vm.$store.getters.getChatList;
                vm.list = chatList;
            },
            handleSend () {
                let vm = this;
                if (vm.sms) {
                    vm.$store.commit('SOCKET_CHAT_PRIVATE', vm.sms);
                } else {
                    vm.$notice({type: 'warning', message: '消息不能为空'});
                }
            }
        },

    }
</script>

<style scoped lang="less">
    .chat {
        &-send {
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
        }
    }
</style>