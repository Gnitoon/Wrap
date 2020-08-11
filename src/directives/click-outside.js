import Vue from 'vue'

/**
 * @author Linus Borg
 * 
 * source: https://stackoverflow.com/questions/36170425/detect-click-outside-element
 * answer: https://stackoverflow.com/a/36180348
 * demo: https://jsfiddle.net/Linusborg/yzm8t8jq/
 */
export default Vue.directive('click-outside', {
    priority: 700,
    bind () {
      let self  = this
      this.event = function (event) { 
          console.log('emitting event')
          self.vm.$emit(self.expression,event) 
         }
      this.el.addEventListener('click', this.stopProp)
      document.body.addEventListener('click',this.event)
    },
    
    unbind() {
        console.log('unbind')
      this.el.removeEventListener('click', this.stopProp)
      document.body.removeEventListener('click',this.event)
    },
    stopProp(event) {event.stopPropagation() }
})
