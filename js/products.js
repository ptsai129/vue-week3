let productModal = null;
let delProductModal = null;

Vue.createApp({
    data(){
        return{
            apiUrl :'https://vue3-course-api.hexschool.io/v2', //api的網址
            apiPath : 'ptsai129', //個人 API Path
            //放產品列表資料
            products :[],
            //判斷是新增或編輯產品
            AddNewProduct:false, 
            //放modal明細資料?
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
            alert(error.data.message);
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

        },
        //依據帶入的參數判別出modal顯示的內容 
        openModal( editState , item){
            if (editState === 'new'){
                 this.temp = {
                     imagesUrl :[],
                 };
                //modal標題顯示新增產品
                this.AddNewProduct = true;
                //顯示modal
                productModal.show();
            }else if ( editState === 'edit'){
                //複製products內的item內容到temp內
                this.temp = {...item};
                //modal標題顯示編輯產品
                this.AddNewProduct = false; 
                productModal.show();
            }else if (editState ==='delete'){
                 //複製products內的item內容到temp內
                this.temp ={...item};
                //顯示modal
                delProductModal.show()
            }
            
        }

    }, 
    mounted(){
          //取得cookie內的token
          const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
          axios.defaults.headers.common['Authorization'] = token;
          this.checkSignIn();
         

         //用一行 JavaScript 創建一個互動視窗
         // 使用 new 建立 bootstrap Modal，拿到實體 DOM 並賦予到變數上
          productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false //取消使用esc關閉modal功能
        });
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false//取消使用esc關閉modal功能
        });

    }

}).mount("#app");



