import dayjs from 'dayjs';
(function(doc, storage, location) {

    const sendBtn = doc.querySelector('#sendBtn')
    const messageText = doc.querySelector('#message')
    const chatList = doc.querySelector('#messageUl')
    const ws = new WebSocket('ws://localhost:8080')
    let username = ''

    const init = () => {
        initUserInfo()
        bindEvents()
    }

    const initUserInfo = () => {
        username = storage.getItem('username')
        if (!username || username.length < 6) return location.href = './login.html'
    }

    const bindEvents = () => {
        sendBtn.addEventListener('click', handleBtnSend)
        ws.addEventListener('open', handleWsOpen)
        ws.addEventListener('message', handleWsMessage)
        ws.addEventListener('close', handleWsClose)
        ws.addEventListener('error', handleWsError)
    }

    /**
     * ws.send()  发送消息
     * 可以发送JSON或者二进制  
     */
    function handleBtnSend() {
        const message = messageText.value.trim()
        if (!message.length) return
        const sendData = JSON.stringify({
            username,
            date: new Date().getTime(),
            message
        })
        ws.send(sendData)
    }

    /** 链接成功 */
    function handleWsOpen() {
        console.log('front --- ws open')
    }

    /** 处理服务端发送/广播过来的数据 */
    function handleWsMessage(event) {
        console.log('front --- accept data from server')
        const msgData = JSON.parse(event.data)
        createMsg(msgData)
    }

    /** 服务端关闭了链接 */
    function handleWsClose() {
        console.log('front --- ws close')
    }

    /** 链接服务端发生错误/失败 */
    function handleWsError() {
        console.log('front --- ws error')
    }

    function createMsg(data) {
        const { username, date, message } = data
        const liItem = doc.createElement('li')
        liItem.innerHTML = ` 
         <p>
          <span>${username}   ---   </span>
          <span>${dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</span>
         </p>
         <p>message:   ${   message}</p>
        `
        chatList.appendChild(liItem)
    }

    init()
})(document, localStorage, location)