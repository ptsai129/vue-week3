Vue.createApp({
    data(){
        return{
            apiUrl :'https://vue3-course-api.hexschool.io/v2', //api的網址
            apiPath : 'ptsai129', //個人 API Path
            //放產品列表資料
            products :[],
            //放產品明細資料
            temp:{}
        }
    }, 
    methods:{
        //檢查登入狀態
        checkSignIn(){
            axios.post(`${this.apiUrl}/api/user/check`)
        .then((res)=>{
          //確認登入成功帶出產品列表
           this.getProductList(); 
          
        }).catch((error)=>{
            alert(error);
          //跳轉到登入頁面
          window.location = 'index.html';
        })
        },
        //取得產品列表
        getProductList(){
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products/all`)
            .then((res)=>{
                this.products = res.data.products;
            }).catch((error)=>{
                console.log(error);
            })

        }

    }, 
    mounted(){
          //取得cookie內的token
          const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
          axios.defaults.headers.common['Authorization'] = token;
          this.checkSignIn();

    }

}).mount("#app");