// ==UserScript==
// @name         Resize pm player
// @namespace    https://github.com/D4ST1N/pm-player-toggler/
// @version      1.0.0
// @description  Resize pm player
// @author       D4ST1N
// @license MIT
// @require      https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // is parimatch
    if (!Object.prototype.hasOwnProperty.call(window, 'CONSTANTS') || !Object.prototype.hasOwnProperty.call(window.CONSTANTS, 'URLS')) return;

    Vue.component(
      'expandplayer',
      {
        template: `
          <div class="jc-root">
            <button :class="{'jc-expand-button': true, 'jc-expand-button--collapse': playerExpanded}" type="button" @click="togglePlayer"></button>
          </div>`,
        data() {
          return {
            styles: document.createElement('style'),
            playerExpanded: false,
            baseStyles: `
              .jc-root {
                position: fixed;
                top: 10px;
                right: 10px;
                z-index: 1000;
              }
              .jc-expand-button {
                width: 60px;
                height: 60px;
                position: relative;
              }
              .jc-expand-button:after, .jc-expand-button:before {
                content: '';
                position: absolute;
                border: 5px solid #fff;
                box-sizing: border-box;
                transition: all .375s;
              }
              .jc-expand-button:after {
                width: 40%;
                height: 40%;
                top: 0;
                left: 60%;
                border-bottom: 0;
                border-left: 0;
              }
              .jc-expand-button:before {
                width: 40%;
                height: 40%;
                top: 60%;
                left: 0;
                border-top: 0;
                border-right: 0;
              }
              .jc-expand-button--collapse:before, .jc-expand-button--collapse:after {
                transform: rotate(180deg);
              }`,
            expandedPlayerStyle: `
              pm-sport-player {
                position: fixed !important;
                top: -30px;
                left: 10vw;
                width: 80vw !important;
                z-index: 1000000000;
              }`
          };
        },
        mounted() {
          this.createStyles();
          this.updateStyles();
        },
        watch: {
          playerExpanded() {
            this.updateStyles();
          }
        },
        methods:  {
          createStyles() {
            document.body.appendChild(this.styles);
          },
          updateStyles() {
            this.styles.innerHTML = `${this.baseStyles}${this.playerExpanded ? this.expandedPlayerStyle : ''}`;
          },
          togglePlayer() {
            this.playerExpanded = !this.playerExpanded;
          },
        },
      }
    );

    const appRoot = document.createElement('div');
    appRoot.id = 'approot';
    appRoot.innerHTML = '<expandplayer></expandplayer>';
    document.body.appendChild(appRoot);
    new Vue(
      {
        el: '#approot',
      }
    );
})();
