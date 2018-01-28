export default function (step) {
    step.addEventListener('beforeEvent', function () {
        console.log('beforeEvent:', ...arguments)
    })
    step.addEventListener('afterEvent', function () {
        console.log('afterEvent:', ...arguments)
    })
    step.addEventListener('beforeMethod', function (args) {
        // args[0] = '我要改变参数'
        console.log('beforeMethod:', ...arguments)
    })
    step.addEventListener('beforeMethod', function (args) {
        // args[0] = '我也要改变参数'
        console.log('beforeMethod:', ...arguments)
    })
    step.addEventListener('afterMethod', function () {
        console.log('afterMethod:', ...arguments)
    })
    step.addEventListener('beforeRequest', function () {
        console.log('beforeRequest:', ...arguments)
    })
    step.addEventListener('afterRequest', function () {
        console.log('afterRequest:', ...arguments)
    })
}