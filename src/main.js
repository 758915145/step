import StepWithListener from './step/StepWithListener.js'
import target from './target.js'
import log from './log.js'
let step = new StepWithListener([
    'request',
    'render'
], target)
log(step)
export default step