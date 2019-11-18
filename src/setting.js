import Vue from 'vue'
import Setting from './SettingVue'

Vue.config.productionTip = false

new Vue({
  el: '#setting',
  components: { Setting },
  template: '<Setting/>'
})
