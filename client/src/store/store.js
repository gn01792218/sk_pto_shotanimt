//導入Vue和Vuex,並使用
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{ //儲存資料的地方
        imgList:["http://localhost:8080/static/img/0.jpg","http://localhost:8080/static/img/1.jpg","http://localhost:8080/static/img/2.jpg","http://localhost:8080/static/img/3.jpg"],
    },
    mutations:{ //更改資料的地方

    },
    actions:{ ////這裡是用來放api的欄位，可以呼叫commit(放入要執行的mutations方法)。

    },
    modules: {
		//在這裡分不同的storeS
    },
    getters:{ //提供給外界取得state資料的地方
        imgList:state=>{
            return state.imgList;
        }
    },
})

