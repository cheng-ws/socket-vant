<template>
    <div class="login">
        <van-form @submit="onSubmit" class="login-form">
            <van-field
                    v-model="username"
                    name="username"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                    v-model="password"
                    type="password"
                    name="password"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import { Row, Col, Icon, Cell, Form, Field,Button } from 'vant';
    export default {
        name: "login_index",
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [Form.name]: Form,
            [Field.name]: Field,
            [Button.name]: Button,
        },
        data () {
            return {
                username: '',
                password: ''
            };
        },
        methods: {
            onSubmit (values) {
                // eslint-disable-next-line no-console
                // console.log(values);
                let vm = this;
                if(values.username && values.password) {
                    vm.$http.post('/mysql/login',values)
                    .then((res)=>{
                        let data = res.data;
                        if(data.status === 200) {
                            let userInfo = data.data;
                            vm.$store.commit('USER_INFO',userInfo);
                            vm.$store.dispatch('IO_INIT','127.0.0.1:3000');
                            // vm.$io.emit('online',userInfo.username);
                            sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
                            vm.$router.push('/message');
                        }else {
                            vm.$notice({type: 'warning',message: '登录失败，请重试'});
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                }
            },

        }
    }
</script>

<style scoped lang="less">
.login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    /deep/ .van-cell {
        margin-bottom: 20px;
        border-radius: 10px;
    }
}
</style>