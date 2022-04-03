const { buffer } = require('node:stream/consumers');
const Ws = require('ws');
((Ws) => {

    //ws:localhost:8080  和前端规定好8080端口
    const server = new Ws.Server({ port: 8080 })

    const init = () => {
        bindEvent()
    }

    const bindEvent = () => {
        server.on('open', handleOpen)
        server.on('close', handleClose)
        server.on('error', handleError)
        server.on('connection', handleConnect)
    }

    function handleOpen() {
        console.log('ws open')
    }

    function handleClose() {
        console.log('ws close')
    }

    function handleError() {
        console.log('ws error')
    }

    /** 
     * 与前端连接成功
     *  ws.on('message', callback)
     *  发送消息
     */
    function handleConnect(ws) {
        console.log('ws connected')
        ws.on('message', handleMessage)
    }

    /**
     * 处理接收到的消息
     * server.client 所有与该ws服务连接的客户端
     * forEach 遍历所有客户端 都广播出对应的消息
     * msg.toString('utf-8') 二进制数据转为字符串
     */
    function handleMessage(msg) {
        const msgData =  msg.toString('utf-8')
        server.clients.forEach(client => {
            client.send(msgData)
        })
    }

    init()
})(Ws)