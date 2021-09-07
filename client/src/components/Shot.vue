<template>
  <div class="shot">
    <section class="chipTable">
         <section class="shotTable">
        <div>
        <div class="one" @click="shot($event)">
            <div :class="picposition[0]">
                <ul class="picposition">
                    <li class="pic" v-for="i,index in onePicPosition" :key="index"
                    >{{i}}</li>
                </ul>
            </div>
            點我下注
        </div>
       <div v-if="oneMoney!=0" class="money">下注額{{oneMoney}}</div>
        </div>
        <div>
        <div class="two" @click="shot($event)">
            <div :class="picposition[1]">
                <ul class="picposition">
                    <li class="pic" v-for="i,index in twoPicPosition" :key="index"
                    >{{i}}</li>
                </ul>
            </div>
             點我下注
            </div>
            <div v-if="twoMoney!=0" class="money">下注額{{twoMoney}}</div>
        </div>
        <div>
        <div class="three" @click="shot($event)">
             <div :class="picposition[2]">
                 <ul class="picposition">
                    <li class="pic" v-for="i,index in threePicPosition" :key="index"
                    >{{i}}</li>
                </ul>
             </div>
             點我下注
              
        </div>
        <div v-if="threeMoney!=0" class="money">下注額{{threeMoney}}</div>
        </div>
        </section>
        <!-- 表情符號列表 -->
        <ul class="emoji">
            <h2 class='title'>選擇籌碼</h2>
            <li :class="[`emoji_${i}`,'emojiBtn']"
                v-for="i,index in emojiList" :key="index"
                @click="selectedEmoji($event,i)"
            >{{i}}</li>
        </ul>
        <!-- 表情符號子彈 -->
        <!-- ul relative定位、li position定位 -->
        <ul class="shotEmoji">
            <!-- 裝第一種表情符號 -->
            <transition-group @enter="enter">
            <li class="shotEmojiPice pice0"
             v-for="i,index in shotEmoji.pice0" :key="index+1">{{i}}</li>
            </transition-group>
            <transition-group @enter="enter">
            <li class="shotEmojiPice pice1"
             v-for="i,index in shotEmoji.pice1" :key="index+1">{{i}}</li>
            </transition-group>
            <transition-group @enter="enter">
            <li class="shotEmojiPice pice2"
             v-for="i,index in shotEmoji.pice2" :key="index+1">{{i}}</li>
            </transition-group>
            <transition-group @enter="enter">
            <li class="shotEmojiPice pice3"
             v-for="i,index in shotEmoji.pice3" :key="index+1">{{i}}</li>
            </transition-group>
            <transition-group @enter="enter">
            <li class="shotEmojiPice pice4"
             v-for="i,index in shotEmoji.pice4" :key="index+1">{{i}}</li>
            </transition-group>
            <transition-group @enter="enter">
            <li class="shotEmojiPice pice5"
             v-for="i,index in shotEmoji.pice5" :key="index+1">{{i}}</li>
            </transition-group>
            <!-- <transition-group @enter="enter">
            <li :class="[`shot_${index}`,'shotEmojiPice']"
             v-for="i,index in shotEmoji" :key="index+1">{{i}}</li>
            </transition-group> -->
        </ul>
    </section>
  </div>
</template>
<script>
import gsap from 'gsap';
import {Power0} from 'gsap'
const emojiList ="❤,😒,😊,😂,😍,🤣";
export default {
    data(){
        return{
            emojiList:emojiList.split(","),
            currentEmoji:"",//用來存現在點到的emoji Class名稱
            currentMoney:0,//當前選擇的籌碼$$
            shotEmoji:{ //用來存emoji子彈的陣列
                pice0:[],
                pice1:[],
                pice2:[],
                pice3:[],
                pice4:[],
                pice5:[],
            },
            targetPosition:{ //射擊目標座標
                x:"",
                y:"",
            },
            startPosition:{ //當前骰子的座標點-->要固定
                x:"",
                y:"",
            },
            picposition:["onePicPosition","twoPicPosition","threePicPosition"],
            onePicPosition:[],//第一區裝籌碼的地方
            twoPicPosition:[],//第二區裝籌碼的地方
            threePicPosition:[],//第三區裝籌碼的地方
            onePicTop:160, //第一區的起始絕對位置
            twoPicTop:160,//第二區的起始絕對位置
            threePicTop:160,//第三區的起始絕對位置
            oneZIndex:0, //起始的z-index
            twoZIndex:0, //起始的z-index
            threeZIndex:0, //起始的z-index
            oneMoney:0,//在第一區下注的起始金錢
            twoMoney:0,
            threeMoney:0,
        }
    },
    mounted(){
        console.log(this.emojiList);
    },
    methods:{
        selectedEmoji(e,emoji){ //選擇籌碼
            this.currentEmoji =emoji;
           //設置籌碼起始點的座標
            this.startPosition.x = e.x;
            this.startPosition.y = e.y;
            console.log(this.startPosition.x,this.startPosition.y);
            switch(emoji){
                case '❤':
                    this.currentMoney=100;
                    break;
                case '😒':
                    this.currentMoney=500;
                    break;
                case '😊':
                    this.currentMoney=1000;
                    break;
                case '😂':
                    this.currentMoney=50;
                    break;
                case '😍':
                    this.currentMoney=10;
                    break;
                case '🤣':
                    this.currentMoney=300;
                    break;
            }
        },
        enter(e){  //讓籌碼飛的動畫
            gsap
            .to(e,{
                keyframes:[
                    {duration:0.2,
                    ease:Power0.easeIn,
                    scale:0.5,
                    x:(this.targetPosition.x-this.startPosition.x)-50, 
                    y:this.targetPosition.y-this.startPosition.y,
                    display:"none"}
                ]
            })
        },
        pushPice(emoji){ //不同表情符號，要裝到不同槍管內
            switch(emoji){
                case '❤':
                    this.shotEmoji.pice0.push(emoji);
                    break;
                case '😒':
                    this.shotEmoji.pice1.push(emoji);
                    break;
                case '😊':
                    this.shotEmoji.pice2.push(emoji);
                    break;
                case '😂':
                    this.shotEmoji.pice3.push(emoji);
                    break;
                case '😍':
                    this.shotEmoji.pice4.push(emoji);
                    break;
                case '🤣':
                    this.shotEmoji.pice5.push(emoji);
                    break;
            }
        },
        shot(e){   //點選下注區的邏輯
            //點一個就生一個currentEmoji
            this.pushPice(this.currentEmoji); //裝到該表情的槍管內
            this.targetPosition.x=e.x;
            this.targetPosition.y=e.y;
            let id = e.target.className //抓到點擊當下的該區域class名稱
            let fChild = e.target.firstChild.firstChild.lastChild; //抓到該區域下的ul下的最後一個li !!
            switch(id){
                case 'one':
                    this.onePicPosition.push(this.currentEmoji);//放入現在選擇的emoji
                    this.oneMoney+=this.currentMoney; //每次都會更新$$
                    this.onePicTop-=5; //每次籌碼都會往上偏移
                    this.oneZIndex+=1; //並且z-index權重提高
                    fChild.style.zIndex=this.oneZIndex;
                    fChild.style.top=`${this.onePicTop}px`;
                    break;
                case 'two':
                    this.twoPicPosition.push(this.currentEmoji);//放入現在選擇的emoji
                    this.twoMoney+=this.currentMoney;
                       this.twoPicTop-=5;
                       this.twoZIndex+=1;
                    fChild.style.zIndex=this.twoZIndex;
                    fChild.style.top=`${this.twoPicTop}px`;
                    break;
                case 'three':
                    this.threePicPosition.push(this.currentEmoji);//放入現在選擇的emoji
                    this.threeMoney+=this.currentMoney;
                    this.threePicTop-=5;
                    this.threeZIndex+=1;
                    fChild.style.zIndex=this.threeZIndex;
                    fChild.style.top=`${this.threePicTop}px`;
                    break;
            }  
        },
    }
}
</script>

<style scope lang="scss">
.shotTable{
    display:flex;
    width:400px;
    margin-left:auto;
    margin-right: auto;
    
    .one,.two,.three{
        margin-top: 20px;
        border:black 10px solid;
        width:100px;
        height:100px;
        margin-right: 20px;
        cursor: pointer;
    }
}
.emoji{
    list-style: none;
    display: flex;
    position: absolute;
    bottom:0;
    left:50%;
    transform: translateX(-50%);
    .emojiBtn{
        margin-left: 10px;
        font-size:50px;
        cursor: pointer;
    }
}
.shotEmoji{
    list-style: none;
    display: flex;
    .shotEmojiPice{
    position: absolute;
    font-size:50px;
    }
    .pice0{
        left:42%;
        bottom:1%;
    }
    .pice1{
        left:45%;
        bottom:2%;
    }
    .pice2{
        left:50%;
        bottom:2%;
    }
    .pice3{
        left:55%;
        bottom:2%;
    }
    .pice4{
        left:60%;
        bottom:2%;
    }
    .pice5{
        left:70%;
        bottom:2%;
    }
}
.picposition{
    list-style: none;
    display: flex;
    .pic{
        position: absolute;
        font-size:25px;
        top:150px;
        z-index:-1;
    }
}
.title{
    display: inline;
}
</style>