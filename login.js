import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data(){
        return{
            //建一個登入用的物件
            user: {
                //v-model綁定input，將值直接匯入物件內
                username: '',
                password: ''
            },
            url: 'https://vue3-course-api.hexschool.io/v2',
        }
    },
    methods:{
        login(){
            axios.post(`${this.url}/admin/signin`, this.user)
                .then((res)=>{
                    console.log(res.data);
                    //登入後取出token和expired的值
                    const { token ,expired } = res.data;
                    //取得cookie
                    document.cookie = `kawaToken=${token}; expired=${new Date (expired)}; path=/`;
                    //登入成功後跳轉至商品頁面
                    window.location = 'product.html';
                })
                .catch((err)=>{
                    console.log(err.res.data.message);
                })
        },
    }
}).mount('#app');
