import Io from 'socket.io-client';

export default {
    state: {
        io: null,
        userInfo: {},
        chatInfo: {},
        chatList: [],
        onlineUser: [],
        currentChatFlag: false,
    },
    getters: {
        getIo (state) {
            return state.io;
        },
        getUserInfo (state) {
            return state.userInfo;
        },
        getChatInfo (state) {
            return state.chatInfo;
        },
        getInfo (state) {
            let obj = {
                sender: state.userInfo.username,
                receiver: state.chatInfo.username,
            };
            return obj;
        },
        getOnlineUser (state) {
            return state.onlineUser;
        },
        getCurrentChatFlag(state) {
            return state.currentChatFlag;
        },
        getChatList (state) {
            return state.chatList;
        }


    },
    mutations: {
        SOCKET_INIT (state, url) {
            let io = Io(url);
            state.io = io;
            state.io.on('connect', () => {
                // console.log(state.userInfo);
                state.io.emit('online', state.userInfo.username);
            });
            state.io.on('onLineUser', (data) => {
                if (Object.keys(data).length > 0) {
                    let arr = [];
                    for (let key in data) {
                        let obj = {};
                        if (key.toString() !== state.userInfo.username && data[key].status === 'ONLINE') {
                            obj.username = key;
                            arr.push(obj);
                        }
                    }
                    state.onlineUser = arr;
                }
            });
            state.io.on('chatList', (data) => {
                if (data) {
                    data = JSON.parse(data);
                    state.chatList[data.name] = data.data;
                    state.currentChatFlag = !state.currentChatFlag;
                }
                console.log(state.chatList);
            });
            state.io.on('replyPrivateChat', (params) => {
                 state.chatList.push(params);
                state.currentChatFlag = !state.currentChatFlag;
                console.log(state.chatList);
            });
            // state.io.on('progress',(data)=>{
            //     console.log(data);
            // });
        },
        SOCKET_EMIT (state, params) {
            state.io.emit(params.name, params.data);
        },
        USER_INFO (state, params) {
            state.userInfo = params;
        },
        CHAT_INFO (state, params) {
            state.chatInfo = params;
        },
        SOCKET_CHAT_PRIVATE(state,params) {
            let obj = {
                sender: state.userInfo.username,
                receiver: state.chatInfo.username,
                message: params,
            };
            state.io.emit('privateChat',JSON.stringify(obj));
            state.chatList.push(obj);
            state.currentChatFlag = !state.currentChatFlag;
            console.log(state.chatList);
        },
        ADD_CHAT_LIST(state,params) {
            state.chatList.push(params);
        }
    },
    actions: {
        IO_INIT ({commit}, url) {
            commit('SOCKET_INIT', url);
        },
        IO_EMIT ({commit}, params) {
            commit('SOCKET_EMIT', params);
        }
    },
};