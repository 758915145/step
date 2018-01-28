import Step from './step.js'
export default class StepWithListener extends Step {
    constructor () {
        super(...arguments)
        this.$listener = {}
    }
    overloadTarget(){
        let steps = this.steps
        let targets = this.targets
        let targetContext = this.targetContext
        steps.forEach((item, index) => {
            if (!targets[item]) {
                throw new Error('target 中缺少步骤' + item)
            }
            let that = this
            let stepName = steps[index]
            let nextStepName = steps[index + 1]
            let target = targets[stepName]
            targets[stepName] = async function () {
                let beforeName = stepName.replace(/(^.)/, function ($1) {
                    return 'before' + $1.toLocaleUpperCase()
                })
                await that.dispatchEvent(beforeName, arguments)
                let result = await target.call(targetContext[stepName] || {}, targets[nextStepName] || function () {}, ...arguments)
                let afterName = stepName.replace(/(^.)/, function ($1) {
                    return 'after' + $1.toLocaleUpperCase()
                })
                await that.dispatchEvent(afterName, result)
            }
        })
    }
    addEventListener (type, listener) {
        this.$listener[type] = this.$listener[type] || []
        this.$listener[type].push(listener)
    }
    removeEventListener (type, listener) {
        if (!this.$listener[type]) return
        if (listener) {
            let index = this.$listener[type].indexOf(listener)
            if (index > -1) {
                this.$listener[type].splice(index, 1)
            }
            if (this.$listener[type].length < 1) {
                delete this.$listener[type]
            }
        } else {
            delete this.$listener[type]
        }
    }
    async dispatchEvent (type) {
        if (!this.$listener[type]) return
        Array.prototype.shift.call(arguments)
        await Promise.all(this.$listener[type].map(async item => {
            await item.call(this, ...arguments)
        }))
    }
}