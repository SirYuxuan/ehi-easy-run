// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Setting from './SettingVue'

Vue.config.productionTip = false

new Vue({
  el: '#setting',
  components: { Setting },
  template: '<Setting/>'
})
