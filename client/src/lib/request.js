// import axios from 'axios'
import io from 'socket.io-client'
import protoRoot from '@/proto/proto'
import protobuf from 'protobufjs'

//1.基本設置-使用socket
const socket = io("http://localhost:5000");

function transformReq(ioEventName,protoName,obj){ //請求時，要將資料封裝成protobuf
  protobuf.load(protoRoot,protoRoot,function(err,root){
    if(err)
      throw err;
    let userDate = root.lookupType(protoName);
    let msgBuffer = userDate.encode(obj).finish();
  })
  //透過socket.io傳遞
  socket.emit(ioEventName,msgBuffer);
}
async function transformRes(ioEventName,protoName){ //接到回應時，要將資料解封成protobuf
  let data = null;
  //透過socket.on取得資料，並解析
  await socket.on(ioEventName, (obj) => {
    let UData = new Uint8Array(obj); //先將二arrayBuf轉成Unit8Array
    //注意:使用箭頭函式才能抓的到this唷~!
    protobuf.load(protoRoot, protoRoot, (err, root)=> {
      if (err) throw err;
      let message = root.lookupType(protoName);
      data = message.decode(UData); //放入Unit8Array的data才可以decode
    });
  });
  return data;
}

export default function(iotype,ioEventName,protoName,obj){
  switch(iotype){
    case "on":  
      //這裡要解析protobuf
      let data = transformRes(ioEventName,protoName,obj);
      return data;
    case "emit":
      //這裡要封裝protobuf
      data = transformReq(protoName,obj);
      break;
  }
}
