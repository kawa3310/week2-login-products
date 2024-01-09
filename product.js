import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data(){
        return{
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'reirei',
            products: [],
            temp: {}
        }
    },
    methods:{
        loginCheck(){
            axios.post(`${this.url}/api/user/check`)
                .then(()=>{
                    //確認登入後呼叫取得商品資料
                    this.getProduct();
                })
                .catch((err)=>{
                    console.log(err.res.data.message);
                    //若無登入會跳轉至登入頁面
                    window.location = 'login.html';
                })
        },
        getProduct(){
            axios.get(`${this.url}/api/${this.path}/admin/products/all`)
                .then((res)=>{
                    //取出商品資料加入products空陣列內
                    this.products = res.data.products;
                })
                .catch((err)=>{
                    console.log(err.res.data.message);
                })
        }
    },
    mounted() {
        //取得token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)kawaToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");
        //將token加入headers
        axios.defaults.headers.common['Authorization'] = token;
    //初始化 
    this.loginCheck();
    },
}).mount('#app');