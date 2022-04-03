;
(function(doc, storage, location) {

    const usernameText = doc.querySelector('#username')
    const loginBtn = doc.querySelector('#loginBtn')

    const init = () => {
        bindEvents()
    }

    const bindEvents = () => {
        loginBtn.addEventListener('click', handleBtnLogin)
    }

    function handleBtnLogin() {
        const username = usernameText.value.trim()
        if (username.length < 6) {
            alert('用户名不能少于6位')
            return
        }
        storage.setItem('username', username)
        location.href = './index.html'
    }

    init()
})(document, localStorage, location)