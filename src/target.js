export default {
    event (next) {
        next('message from event')
        return 'im event'
    },
    method (next, msg) {
        next('message from method')
        return 'im method'
    },
    request (next, msg) {
        next('message from request')
        return 'im request'
    }
}