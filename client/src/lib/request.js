// import axios from 'axios'
import io from 'socket.io-client'
import protoRoot from '@/proto/proto'
import protobuf from 'protobufjs'

//1.基本設置-api方式
// const httpService = axios.create({
// timeout: 45000,
// method: 'post',
// headers: {
// 'X-Requested-With': 'XMLHttpRequest',
// 'Content-Type': 'application/octet-stream'
// },
// responseType: 'arraybuffer'
// })

//1.基本設置-使用socket
const socket = io("http://localhost:5000");

//2.設置請求和響應的message
// 请求体message
const PBMessageRequest = protoRoot.lookup('framework.PBMessageRequest')
// 响应体的message
const PBMessageResponse = protoRoot.lookup('framework.PBMessageResponse')

const apiVersion = '1.0.0'
const token = 'my_token'

function getMessageTypeValue(msgType) { //取得請求的Message是哪一個
  const PBMessageType = protoRoot.lookup('framework.PBMessageType')
  const ret = PBMessageType.values[msgType]
  return ret
}

// 3.撰寫将發出的请求数据encode成二进制(encode是proto.js提供的方法)
function transformRequest(data) {
  return PBMessageRequest.encode(data).finish()
}
//4.撰寫res相關方法://將得到的回應轉成json的形式

function isArrayBuffer (obj) { //判斷是否是二進制的function
  return Object.prototype.toString.call(obj) === '[object ArrayBuffer]'
}

function transformResponseFactory(responseType) {
  return function transformResponse(rawResponse) {
    // 判断response是否是arrayBuffer
    if (rawResponse == null || !isArrayBuffer(rawResponse)) {
      return rawResponse
    }
    try {
      const buf = protobuf.util.newBuffer(rawResponse)
      // decode响应体
      const decodedResponse = PBMessageResponse.decode(buf)
      if (decodedResponse.messageData && responseType) {
        const model = protoRoot.lookup(responseType)
        decodedResponse.messageData = model.decode(decodedResponse.messageData)
      }
      return decodedResponse
    } catch (err) {
      return err
    }
  }
}

//5.撰寫req的方法
/**
* @param {*} msgType 接口名稱
* @param {*} requestBody 請求體參數
* @param {*} responseType 返回值
*/
function request(msgType, requestBody, responseType) { 
    // 请求需要的数据
    const reqData = {
      timeStamp: new Date().getTime(),
      type: msgType,
      version: apiVersion,
      messageData: requestBody,
      token: token
    }
    // 将对象序列化成请求体实例
    const req = PBMessageRequest.create(reqData) 
  
    // 调用socketIO发起请求
    // 这里用到socketIO的配置项：transformRequest和transformResponse
    // transformRequest 发起请求时，调用transformRequest方法，目的是将req转换成二进制
    // transformResponse 对返回的数据进行处理，目的是将二进制转换成真正的json数据
    return socket.on("proto", req, {
      transformRequest,
      transformResponse: transformResponseFactory(responseType)
    })
  }
// 在request下添加一个方法，方便用于处理请求参数
request.create = function (protoName, obj) {
  const pbConstruct = protoRoot.lookup(protoName)
  return pbConstruct.encode(obj).finish()
}
export default request
