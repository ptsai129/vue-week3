Vue.createApp({
    data(){
        return{
            apiUrl :'https://vue3-course-api.hexschool.io/v2', //api的網址
            apiPath : 'ptsai129', //個人 API Path
            user: {
                "username":'',
                 "password":''
            }

        }

    },
    methods:{
        signIn(){

            axios.post(`${this.apiUrl}/admin/signin`, this.user)
            //正確回傳
            .then((res)=>{
                const { token , expired} = res.data; 
                console.log(token , expired);
                //https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
                //把res.data內的token跟expired存在cookie 存在myToken這個名稱 expired是unix格式是要用new Date轉格式
                document.cookie = `myToken=${token}; expires=${new Date(expired)}; path=/`;
                 //跳轉到產品列表頁面
                  window.location = 'products.html';
            })
            //失敗回傳
            .catch((error)=>{
                //登入若失敗清空欄位並用 alert 提醒使用者
                alert(error.data.message);
                this.user.username ="";
                this.user.password ="";


            })
        }

    }, 
    mounted(){

    }
}).mount("#app")