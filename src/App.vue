<template>
  <div id="app">
    <div style="display: flex">
      <input id="input" type="text" v-model="search" @keyup.up.stop="up"
             @keyup.enter="liClick(nowChoice)"
             @keyup.down.stop="down">
    </div>
    <div style="" id="content">
      <ul>
        <li v-for="(item,index) in result" :class="{'liChoice':nowChoice === index}" @mouseenter="slection(index)"
            @click="liClick(index)">
          <img :src="item.icon" style="margin-top: 3px">
          <span style=" display: block;top: -48px;position: relative;left: 48px;font-size: 18px">{{item.title}}</span>
          <span style="font-size: 14px; position: relative;top: -44px;left: 48px;">{{item.subTitle}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    let remote
    if (window.require) {
        remote = window.require('electron').remote
    }
    import util from './util/util'

    export default {
        created() {
            util.initPluginList()
        },
        name: 'App',
        methods: {
            slection(index) {
                this.nowChoice = index
            },
            up() {
                document.getElementById('input').selectionStart = this.selectionStart
                if (this.nowChoice - 1 < 0) {
                    this.nowChoice = this.result.length - 1
                } else {
                    this.nowChoice--
                }
            }, down() {
                document.getElementById('input').selectionStart = this.selectionStart
                if (this.nowChoice + 1 >= this.result.length) {
                    this.nowChoice = 0
                } else {
                    this.nowChoice++
                }
            }, liClick(index) {
                let isShow = this.result[index].enter()
                if (!isShow) {
                    remote.getCurrentWindow().hide()
                }
            }
        },
        data() {
            return {
                search: '',
                div: '',
                result: [],
                nowChoice: 0,
                selectionStart: 0
            }
        },
        watch: {
            search(search) {
                this.selectionStart = input.selectionStart
                this.nowChoice = 0
                this.result = util.run(search)
                remote.getCurrentWindow().setSize(800, 66 + (this.result.length > 6 ? 6 : this.result.length) * 55)
            }
        },
        mounted() {
            let self = this;
            this.$nextTick(function () {
                document.addEventListener('keyup', function (e) {
                    if (e.keyCode === 27) {

                    }
                })
            })
        }
    }
</script>

<style>
  * {
    margin: 0px;
    padding: 0px;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;

  }

  #content::-webkit-scrollbar {
    width: 6px;
    height: 4px;
    scrollbar-arrow-color: red;

  }

  #content::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgb(97, 97, 97);
    scrollbar-arrow-color: red;
  }

  #content::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgb(66, 66, 66);
  }

  #content {
    max-height: 330px;
    height: auto;
    overflow-x: hidden;
    overflow-y: auto;
    background: rgb(66, 66, 66);
    color: rgb(227, 224, 227);
  }

  #app {
    overflow: hidden;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input {
    display: flex;
    width: 780px;
    height: 46px;
    outline: none;
    border: 10px solid rgb(66, 66, 66);
    background: rgb(97, 97, 97);
    color: rgb(227, 224, 227);
    line-height: 60px;
    font-size: 26px;
  }

  li:hover, li:active, .liChoice {
    background: rgb(79, 97, 128);
  }

  ul {
    padding-left: 10px;
    padding-right: 10px;
  }

  li {
    height: 55px;
    width: 780px;
    cursor: pointer;
  }
</style>
