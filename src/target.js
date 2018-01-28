export default {
    event (next) {
        next('message from event')
        log('event:', ...arguments)
        return 'im event'
    },
    method (next, msg) {
        next('message from method')
        log('method:', ...arguments)
        return 'im method'
    },
    request (next, msg) {
        next('message from request')
        log('request:', ...arguments)
        return 'im request'
    }
}
let dom = document.getElementById('main')
function log() {
    let result = '';
    [...arguments].forEach(item => {
        result += item + ' '
    })
    dom.innerHTML += result + '<br>'
}