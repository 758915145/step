export default class Step {
    constructor (steps, targets, targetContext = {}) {
        this.$steps = steps
        this.$targets = targets
        this.$targetContext = targetContext
        this.overloadTarget()
        setTimeout(targets[steps[0]].bind(targetContext[steps[0]] || {}))
    }
    overloadTarget(){
        let steps = this.steps
        let targets = this.targets
        let targetContext = this.targetContext
        steps.forEach((item, index) => {
            if (!targets[item]) {
                throw new Error('target 中缺少步骤' + item)
            }
            let stepName = steps[index]
            let nextStepName = steps[index + 1]
            let target = targets[stepName]
            targets[stepName] = function () {
                target.call(targetContext[stepName] || {}, targets[nextStepName] || function () {}, ...arguments)
            }
        })
    }
    get targetContext () {
        return this.$targetContext
    }
    get targets () {
        return this.$targets
    }
    get steps () {
        return this.$steps
    }
    get length () {
        return this.$steps.length
    }
}