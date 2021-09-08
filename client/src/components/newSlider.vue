<template>
  <div>
      <h1>Vue Slider</h1>
     <div class="slider">
        <transition-group tag="div" class="slider_img" @enter="imgEnter">
            <!-- <img src="../assets/sliderImg/3.jpg" alt=""> -->
            <img class="simg" v-for="(i,index) in imgList" :key="i" :src="i" alt="圖片" width=600 height=400 v-show="active==index">
        </transition-group>
        <ul class="img_dot">
            <li class="img_dot_item"> <button class="btn_pre" @click="changeImgByBtn(active-1),isPre=true">&lt;</button></li>
            <li :class="[{active:active == index},'img_dot_item']"
                v-for="i,index in imgList" :key="i"
                @click="changeImage(index)"
            >⏺</li>
            <li class="img_dot_item"><button class="btn_next" @click="changeImgByBtn(active+1),isPre=false">></button></li>
         </ul>
     </div>
     <section class="playOption">
         <button class="playBtn" type="button" v-if="!autoPlay" @click="_autoPlay">關閉自動輪播</button> 
      <button class="playBtn" type="button" v-else @click="_autoPlay">開啟自動輪播</button>
      <div class="editPlaySecond">
        <input class="playSeconInput" type="text" placeholder="輸入豪秒數" v-model="playSecond"> 
        <button type="button" @click="setPlayTime">修改輪播秒數</button>
      </div>
     </section>
      
  </div>
</template>

<script>
import gsap from 'gsap';
import {Power0} from 'gsap'
export default {
    data(){
        return{
            active:0,
            isPre:false,
            autoPlay:true,
            playSecond:1, //秒為單位
            timer:null, //自動輪播計時器
            imgList:["http://localhost:8080/static/img/0.7c68064.jpg","http://localhost:8080/static/img/1.a457e1b.jpg","http://localhost:8080/static/img/2.83784d3.jpg","http://localhost:8080/static/img/3.86ae87e.jpg"],
        }
    },
    created(){
        //自動輪播
        //被點到的時候要記得清除Interval並重新開始interval
        // this._autoPlay();
    },
    computed:{
        imgNumber(){ //計算照片長度
            return this.imgList.length;
        },
        playTime(){ //轉換為毫秒
            return this.playSecond*1000;
        }
    },
    methods:{
        setPlayTime(){
            if(this.timer){
                console.log("重新啟動計時器",this.playTime)
                clearInterval(this.timer); //清除原本的計時器
                this.timer = setInterval(()=>{ //重啟計時器
                this.active = (this.active+1)%this.imgNumber;
                },this.playTime)
            }else{
                console.log(this.playTime)
            }
        },
        _autoPlay(){
            if(this.autoPlay){
                console.log("開啟自動輪播")
                this.timer = setInterval(()=>{
                this.active = (this.active+1)%this.imgNumber;
            },this.playTime)
            }else{
                console.log("關閉自動輪播")
                clearInterval(this.timer);
            }
            this.autoPlay = !this.autoPlay;
        },
        changeImage(index){
            this.active =index;
        },
        changeImgByBtn(num){ //按前後按鈕
            // if(num<0){num=this.imgNumber-1}
            //num+圖片張數，確保點到0的時候回到最後一張
            this.active =(num+this.imgNumber) % this.imgNumber;
            console.log(this.isPre)
        },
        imgEnter(e){
            switch(this.isPre){
                case false:
                gsap.to(e,{
                    keyframes:[
                        {duration:0,x:-200,opacity:0,ease:Power0.easeOut,},
                        {duration:0.5,x:0,opacity:1,ease:Power0.easeOut,}
                    ]
                })
                    break;
                case true:
                gsap.to(e,{
                    keyframes:[
                        {duration:0,x:200,opacity:0,ease:Power0.easeOut,},
                        {duration:0.5,x:0,opacity:1,ease:Power0.easeOut,}
                    ]
                })
                    break;
            }
        }
    }
}
</script>

<style lang="scss" scope>
.img_dot{
    display: flex;
    list-style:none;
    justify-content: center;
    padding-left: 0;
    .img_dot_item{
         opacity: 0.5;
        margin-right: 10px;
    }
    .active{
    opacity: 1 ;
    }
}
.slider_img{
    width:600px;
    height:400px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    border-radius: 10px;
    border:5px solid gray;
}
.playOption{
    width:350px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    .playBtn{
    width:100px;
    display: block;
    margin-right: auto;
    }
    .editPlaySecond{
    width:150px;
    margin-left: auto;
        .playSeconInput{
            width:15px;
        }
    }
}

</style>