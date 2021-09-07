
const http = require('http')
const server = http.createServer();

const io = require('socket.io')(server,{
    cors:{
        origin:"*"
    }
});

// io.binaryType = 'arraybuffer';
const port = 5000;

//初始資料
const messages=[ //聊天室的訊息陣列
	{name:"Jack",message:"HELLOOOO~~"} //進入聊天室時的預設訊息
]
let proto = {}
//protobuf
const ProtoBuf = require('protobufjs');
ProtoBuf.load('./src/proto/user.proto',async function(err, root) {
        if (err)
            throw err;
        // 並取得 Product 資料定義
        var User =await root.lookupType('framework.PBUser'); 
        // 2.準備包裝的資料
        var data = {
            userId: 12,
            name: 'ApplePen',
            mobile: 'The combination of Apple and Pen',
        };
        // 3.包裝資料後回傳 Buffer 格式（二進位形態）
        proto=await User.encode(data).finish(); 
    });

        io.on("connection",(socket)=>{
            console.log("a user connected");
            socket.emit("proto",proto);//發送proto資料
            socket.emit("allMessage",messages); //發送當前所有訊息的事件
            //接收Clinet端emit的事件
            socket.on("message",function(obj){ //收到來自客戶端發送的訊息物件
                messages.push(obj);//將收到的訊息物件存入server的訊息陣列中
                console.log(obj.name+"說: "+obj.message);
                io.emit("newMessage",obj) //發送newMessage事件，用io來廣播收到的訊息物件
            })
            socket.on("sendProto",function(obj){
                console.log(obj);
            })
        })

server.listen(port,()=>{
    console.log("server is Listening at 5000")
})
