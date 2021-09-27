<template>
  <div class="hello">
    <video
      id="videoElement"
      ref="videoElement"
      controls
      muted
      width="500px"
      height="500px"
    ></video>
    <div class="msgBar" ref="msgBar">
      <p v-for="(i, index) in messages" :key="index">{{ i }}</p>
    </div>
    <input
      ref="input"
      class="input"
      type="text"
      placeholder="請輸入訊息"
      v-model="temp.message"
    />
    <input
      class="input"
      type="text"
      placeholder="請輸入姓名"
      v-model="temp.name"
    />
    <button type="button" @click="sendMesage">發送</button>
    <div class="protobuf">{{ proto }}</div>
    <button type="button" @click="sendProto">傳送proto資料</button>
    <div class="contentArear">
      <!-- <ul class="floatingEmojiList"> -->
        <transition-group class="floatingEmojiList" tag="ul" v-on:enter="enter">
       <li class="floatEmoji"
          v-for="emoji,emojiId in currentEmojiList" :key="emojiId+10"
          >{{emoji}}
        </li>
        </transition-group>
      <!-- </ul> -->
    </div>
    <ul class="emojiToolBar">
      <li class="emojiBtn" v-for="i,index in emojis" :key="index" @click="addEmoji(i)">{{i}}</li>
    </ul>
  </div>
</template>

<script>
import flvjs from "flv.js";
import protoRoot from "@/proto/proto";  //一定要導入轉成json格式的proto文件(protoRoot名稱是自訂的)
import protobuf from "protobufjs";
import {gsap,Power0,Power4,Power1} from 'gsap';
const emojiList ="❤,😒,😊,😂,😍,🤣";
export default {
  name: 'HelloWorld',
  data() {  
    return {
      emojis:emojiList.split(','), //以逗號分隔表情符號字串，切成陣列
      currentEmojiList:[], //用來記錄目前被選到的表情符號
      flvPlayer: null,
      Protobuf: "",
      getProto: false,
      proto: {},
      messages: [], //裝聊天室訊息的陣列
      temp: {
        //接收clinet端input的暫存訊息
        message: "",
        name: "路人",
      },
    };
  },
  mounted() {
    // console.log(this.temp);
    this.createFlv();//開啟直播
    this.$socket.on("proto", (obj) => {
      let UData = new Uint8Array(obj); //先將二arrayBuf轉成Unit8Array
      //注意:使用箭頭函式才能抓的到this唷~!
      protobuf.load(protoRoot, protoRoot, (err, root)=> {
        if (err) throw err;
        let message = root.lookupType("framework.PBUser");
        this.proto = message.decode(UData); //放入Unit8Array的data才可以decode
      });
      console.log(this.proto);
    });
    this.$socket.on("allMessage", (obj) => {
      //監聽server的訊息陣列
      this.messages = obj; //將server傳來的訊息陣列裝到本messages中  //這個this.就是vm
    }); //監聽server發射出來的聊天室訊息陣列
    this.$socket.on("newMessage", (obj) => {
      //監聽Server的訊息廣播(有人發言時)
      this.messages.push(obj);
    });
  },
  methods: {
    enter(emoji){
      //點到就做gsap動畫
      //注意class名稱前面要加.唷!(id記得加#)
        let id = emoji; //抓取元素
        gsap.set(id,{ //使用set設置初始化狀態
          scale:0.5,
          x:Math.random()*-100+20, //初始x位置在1~100之間
        })
        .to(id,1,{
            y:Math.random()*-100+20, //往上飄到隨機的一定範圍內
            scale:1,
            ease:Power4.easeOut,
        }).to(id,1,{
              x:-500,
              scale:0.5,
              ease:Power1.easeIn
        }).to(id,0,{
            display:"none",
        })
    },
    addEmoji(emoji){
      this.currentEmojiList.push(emoji); //被點到的裝到選中的比情符號列表
    },
    createFlv() { //創建直播
      let url = "http://xxxxxxxx.flv";
      if (flvjs.isSupported()) {
        let videoElement = document.getElementById("videoElement");
        this.flvPlayer = flvjs.createPlayer({
          type: "flv",
          isLive: true,
          hasAudio: false,
          url,
        });
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
      }
    },
    sendMesage() {
      this.$socket.emit("message", this.temp); //發送客戶端傳送的訊息物件給server
      this.temp.message = ""; //暫存訊息規0
    },
    sendProto(){
      //先包裝proto
      let temp = this.proto;
      protobuf.load(protoRoot,protoRoot,function(err,root){
        if(err)
          throw err;
        let userDate = root.lookupType("framework.PBUser");
        let msgBuffer = userDate.encode(temp).finish();
        temp = msgBuffer;
      })
      //透過socket.io傳遞
      this.$socket.emit("sendProto",temp);
    },
  },
   beforeDestroy() { //元件銷燬之前，將socket 關閉
    this.socket.close();
 },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#input{
  background-color:gray;
}
.emojiToolBar{
  display: flex;
  list-style: none; 
  position:absolute;
  right:0;
  bottom:0;
  .emojiBtn{
     font-size:40px;
     width:60px;
     cursor: pointer;
    // //  transition:1s; 
     &:active{   //點著的時候會執行1s的縮小動畫
       transition: 1s;
       transform:scale(0.1) ;
     }
     &:hover{
       border: 10px solid black;
     }
  }
}
.floatingEmojiList{
	  display: flex;
	  list-style: none;
	.floatEmoji{
		position:absolute;
		right:50px;
		top:50px;
		font-size:50px;
	}
}
.msgBar {
  width: 500px;
  height: 300px;
  border: #2c3e50 5px solid;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  overflow-y: auto;
}
.input {
  margin-top: 20px;
}
.protobuf {
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
}
</style>
