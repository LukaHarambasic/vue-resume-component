(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.VueResume = {}));
}(this, (function (exports) { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    name: 'ResumeHeader',
    props: {
      name: {
        type: String,
        required: true
        // TODO: add validation
      }
    },
    computed: {
      alt: function alt () {
        return ("Resume picture of " + (this.settings.name))
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  { style.element.setAttribute('media', css.media); }
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "resume-header" }, [
      _c("h1", {
        staticClass: "resume-header-name",
        domProps: { textContent: _vm._s(_vm.name) }
      })
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-4c5753e6_0", { source: ".resume-header {\n  background: var(--color-primary);\n  border-radius: var(--border-radius);\n  padding: 1rem;\n}\n.resume-header > .resume-header-name {\n  color: var(--color-font-on-primary);\n  font-size: 2rem;\n  font-weight: bold;\n}\n\n/*# sourceMappingURL=ResumeHeader.vue.map */", map: {"version":3,"sources":["/Users/luha/development/vue-resume-component/src/components/ResumeHeader.vue","ResumeHeader.vue"],"names":[],"mappings":"AA4BA;EACA,gCAAA;EACA,mCAAA;EACA,aAAA;AC3BA;AD4BA;EACA,mCAAA;EACA,eAAA;EACA,iBAAA;AC1BA;;AAEA,2CAA2C","file":"ResumeHeader.vue","sourcesContent":["<template>\n  <div class=\"resume-header\">\n    <h1\n      v-text=\"name\"\n      class=\"resume-header-name\"\n    />\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'ResumeHeader',\n  props: {\n    name: {\n      type: String,\n      required: true\n      // TODO: add validation\n    }\n  },\n  computed: {\n    alt () {\n      return `Resume picture of ${this.settings.name}`\n    }\n  }\n}\n</script>\n\n<style lang=\"sass\">\n.resume-header\n  background: var(--color-primary)\n  border-radius: var(--border-radius)\n  padding: 1rem\n  >.resume-header-name\n    color: var(--color-font-on-primary)\n    font-size: 2rem\n    font-weight: bold\n</style>\n",".resume-header {\n  background: var(--color-primary);\n  border-radius: var(--border-radius);\n  padding: 1rem;\n}\n.resume-header > .resume-header-name {\n  color: var(--color-font-on-primary);\n  font-size: 2rem;\n  font-weight: bold;\n}\n\n/*# sourceMappingURL=ResumeHeader.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$1 = {
    name: 'ResumeFooter',
    props: {
      information: {
        type: Object,
        required: true
        // TODO: add validation
      }
    }
  };

  /* script */
  var __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "resume-footer" }, [
      _c(
        "ul",
        { staticClass: "resume-footer-links" },
        _vm._l(_vm.information.links, function(link, i) {
          return _c("li", { key: i, staticClass: "resume-footer-link" }, [
            _c("a", {
              attrs: { href: link.url },
              domProps: { textContent: _vm._s(link.title) }
            })
          ])
        }),
        0
      ),
      _vm._v(" "),
      _vm.information.logo
        ? _c("img", {
            staticClass: "resume-footer-logo",
            attrs: { src: _vm.information.logo, alt: "Decorative logo" }
          })
        : _vm._e()
    ])
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    var __vue_inject_styles__$1 = function (inject) {
      if (!inject) { return }
      inject("data-v-0f7c2292_0", { source: "@charset \"UTF-8\";\n.resume-footer {\n  position: relative;\n  color: var(--color-font-on-primary);\n  background: var(--color-primary);\n  border-radius: 0 0 var(--border-radius) var(--border-radius);\n  font-size: 0.9rem;\n  padding: 1rem;\n}\n.resume-footer > .resume-footer-links {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: center;\n  align-content: center;\n  align-items: center;\n  width: auto;\n}\n@media screen and (max-width: var(--breakpoint)) {\n.resume-footer > .resume-footer-links {\n    flex-direction: column;\n}\n}\n.resume-footer > .resume-footer-links .resume-footer-link {\n  margin: 0 0.5rem 0 0;\n}\n@media screen and (max-width: var(--breakpoint)) {\n.resume-footer > .resume-footer-links .resume-footer-link {\n    margin: 0 0 0.5rem 0;\n}\n}\n.resume-footer > .resume-footer-links .resume-footer-link::after {\n  content: \"•\";\n  margin: 0 0 0 0.5rem;\n}\n@media screen and (max-width: var(--breakpoint)) {\n.resume-footer > .resume-footer-links .resume-footer-link::after {\n    content: \"\";\n}\n}\n.resume-footer > .resume-footer-links .resume-footer-link:last-of-type {\n  margin: 0;\n}\n.resume-footer > .resume-footer-links .resume-footer-link:last-of-type::after {\n  content: \"\";\n  margin: 0;\n}\n.resume-footer > .resume-footer-links .resume-footer-link a {\n  color: var(--color-font-on-primary);\n  transition: var(--transition);\n  text-decoration: none;\n  border-bottom: 1px transparent solid;\n}\n.resume-footer > .resume-footer-links .resume-footer-link a:hover {\n  border-bottom-color: var(--color-font-on-primary);\n}\n.resume-footer > .resume-footer-logo {\n  position: absolute;\n  right: 1.5rem;\n  top: -1.5rem;\n  width: 3rem;\n  height: 3rem;\n  box-shadow: var(--box-shadow);\n  border-radius: 50%;\n}\n\n/*# sourceMappingURL=ResumeFooter.vue.map */", map: {"version":3,"sources":["ResumeFooter.vue","/Users/luha/development/vue-resume-component/src/components/ResumeFooter.vue"],"names":[],"mappings":"AAAA,gBAAgB;ACqChB;EACA,kBAAA;EACA,mCAAA;EACA,gCAAA;EACA,4DAAA;EACA,iBAAA;EACA,aAAA;ADnCA;ACoCA;EACA,aAAA;EACA,mBAAA;EACA,iBAAA;EACA,uBAAA;EACA,qBAAA;EACA,mBAAA;EACA,WAAA;ADlCA;ACmCA;AARA;IASA,sBAAA;ADhCE;AACF;ACgCA;EACA,oBAAA;AD9BA;AC+BA;AAFA;IAGA,oBAAA;AD5BE;AACF;AC4BA;EACA,YAAA;EACA,oBAAA;AD1BA;AC2BA;AAHA;IAIA,WAAA;ADxBE;AACF;ACwBA;EACA,SAAA;ADtBA;ACuBA;EACA,WAAA;EACA,SAAA;ADrBA;ACsBA;EACA,mCAAA;EACA,6BAAA;EACA,qBAAA;EACA,oCAAA;ADpBA;ACqBA;EACA,iDAAA;ADnBA;ACoBA;EACA,kBAAA;EACA,aAAA;EACA,YAAA;EACA,WAAA;EACA,YAAA;EACA,6BAAA;EACA,kBAAA;ADlBA;;AAEA,2CAA2C","file":"ResumeFooter.vue","sourcesContent":["@charset \"UTF-8\";\n.resume-footer {\n  position: relative;\n  color: var(--color-font-on-primary);\n  background: var(--color-primary);\n  border-radius: 0 0 var(--border-radius) var(--border-radius);\n  font-size: 0.9rem;\n  padding: 1rem;\n}\n.resume-footer > .resume-footer-links {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: center;\n  align-content: center;\n  align-items: center;\n  width: auto;\n}\n@media screen and (max-width: var(--breakpoint)) {\n  .resume-footer > .resume-footer-links {\n    flex-direction: column;\n  }\n}\n.resume-footer > .resume-footer-links .resume-footer-link {\n  margin: 0 0.5rem 0 0;\n}\n@media screen and (max-width: var(--breakpoint)) {\n  .resume-footer > .resume-footer-links .resume-footer-link {\n    margin: 0 0 0.5rem 0;\n  }\n}\n.resume-footer > .resume-footer-links .resume-footer-link::after {\n  content: \"•\";\n  margin: 0 0 0 0.5rem;\n}\n@media screen and (max-width: var(--breakpoint)) {\n  .resume-footer > .resume-footer-links .resume-footer-link::after {\n    content: \"\";\n  }\n}\n.resume-footer > .resume-footer-links .resume-footer-link:last-of-type {\n  margin: 0;\n}\n.resume-footer > .resume-footer-links .resume-footer-link:last-of-type::after {\n  content: \"\";\n  margin: 0;\n}\n.resume-footer > .resume-footer-links .resume-footer-link a {\n  color: var(--color-font-on-primary);\n  transition: var(--transition);\n  text-decoration: none;\n  border-bottom: 1px transparent solid;\n}\n.resume-footer > .resume-footer-links .resume-footer-link a:hover {\n  border-bottom-color: var(--color-font-on-primary);\n}\n.resume-footer > .resume-footer-logo {\n  position: absolute;\n  right: 1.5rem;\n  top: -1.5rem;\n  width: 3rem;\n  height: 3rem;\n  box-shadow: var(--box-shadow);\n  border-radius: 50%;\n}\n\n/*# sourceMappingURL=ResumeFooter.vue.map */","<template>\n  <div class=\"resume-footer\">\n    <ul class=\"resume-footer-links\">\n      <li\n        class=\"resume-footer-link\"\n        v-for=\"(link, i) in information.links\"\n        :key=\"i\"\n      >\n        <a\n          :href=\"link.url\"\n          v-text=\"link.title\"\n        />\n      </li>\n    </ul>\n    <img\n      class=\"resume-footer-logo\"\n      :src=\"information.logo\"\n      v-if=\"information.logo\"\n      alt=\"Decorative logo\"\n    >\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'ResumeFooter',\n  props: {\n    information: {\n      type: Object,\n      required: true\n      // TODO: add validation\n    }\n  }\n}\n</script>\n\n<style lang=\"sass\">\n.resume-footer\n  position: relative\n  color: var(--color-font-on-primary)\n  background: var(--color-primary)\n  border-radius: 0 0 var(--border-radius) var(--border-radius)\n  font-size: 0.9rem\n  padding: 1rem\n  >.resume-footer-links\n    display: flex\n    flex-direction: row\n    flex-wrap: nowrap\n    justify-content: center\n    align-content: center\n    align-items: center\n    width: auto\n    @media screen and (max-width: var(--breakpoint))\n      flex-direction: column\n    .resume-footer-link\n      margin: 0 .5rem 0 0\n      @media screen and (max-width: var(--breakpoint))\n        margin: 0 0 .5rem 0\n      &::after\n        content: '•'\n        margin: 0 0 0 .5rem\n        @media screen and (max-width: var(--breakpoint))\n          content: ''\n      &:last-of-type\n        margin: 0\n        &::after\n          content: ''\n          margin: 0\n      a\n        color: var(--color-font-on-primary)\n        transition: var(--transition)\n        text-decoration: none\n        border-bottom: 1px transparent solid\n        &:hover\n          border-bottom-color: var(--color-font-on-primary)\n  >.resume-footer-logo\n    position: absolute\n    right: 1.5rem\n    top: -1.5rem\n    width: 3rem\n    height: 3rem\n    box-shadow: var(--box-shadow)\n    border-radius: 50%\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$1 = undefined;
    /* module identifier */
    var __vue_module_identifier__$1 = undefined;
    /* functional template */
    var __vue_is_functional_template__$1 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$2 = {
    name: 'ResumeSegmentEntry',
    props: {
      title: {
        required: true,
        type: String
      },
      description: {
        default: '',
        type: String
      },
      position: {
        default: '',
        type: String
      },
      location: {
        default: '',
        type: String
      },
      from: {
        default: '',
        type: String
      },
      to: {
        default: '',
        type: String
      }
    },
    computed: {
      positionInBrackets: function positionInBrackets () {
        return (" (" + (this.position) + ")")
      }
    }
  };

  /* script */
  var __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("li", { staticClass: "resume-segment-entry" }, [
      _vm.from || _vm.to || _vm.location
        ? _c("div", { staticClass: "resume-segment-entry-information" }, [
            _vm.from || _vm.to
              ? _c(
                  "div",
                  { staticClass: "resume-segment-entry-information-date" },
                  [
                    _vm.from
                      ? _c("div", {
                          staticClass: "resume-segment-entry-information-from",
                          domProps: { textContent: _vm._s(_vm.from) }
                        })
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.to
                      ? _c("div", {
                          staticClass: "resume-segment-entry-information-to",
                          domProps: { textContent: _vm._s(_vm.to) }
                        })
                      : _vm._e()
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.location
              ? _c("div", {
                  staticClass: "resume-segment-entry-information-location",
                  domProps: { textContent: _vm._s(_vm.location) }
                })
              : _vm._e()
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("h3", { staticClass: "resume-segment-entry-title" }, [
        _vm.title
          ? _c("span", { domProps: { textContent: _vm._s(_vm.title) } })
          : _vm._e(),
        _vm._v(" "),
        _vm.position
          ? _c("span", {
              domProps: { textContent: _vm._s(_vm.positionInBrackets) }
            })
          : _vm._e()
      ]),
      _vm._v(" "),
      _vm.description
        ? _c("p", {
            staticClass: "resume-segment-entry-description",
            domProps: { innerHTML: _vm._s(_vm.description) }
          })
        : _vm._e()
    ])
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

    /* style */
    var __vue_inject_styles__$2 = function (inject) {
      if (!inject) { return }
      inject("data-v-87647db4_0", { source: "@charset \"UTF-8\";\n.resume-segment-entry {\n  position: relative;\n  display: flex;\n  flex-flow: column wrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n  margin: 0 0 0 1rem;\n  padding: 0 0 1rem 0;\n  width: 100%;\n}\n.resume-segment-entry:before {\n  content: \"\";\n  position: absolute;\n  left: -13px;\n  background: var(--color-accent);\n  width: 3px;\n  height: 100%;\n}\n.resume-segment-entry:after {\n  content: \"\";\n  position: absolute;\n  left: -17px;\n  top: 18px;\n  width: 0.75rem;\n  height: 0.75rem;\n  background: var(--color-accent);\n  border: 2px solid var(--color-background);\n  border-radius: 50%;\n}\n.resume-segment-entry:first-of-type:before {\n  border-radius: var(--border-radius) var(--border-radius) 0 0;\n}\n.resume-segment-entry:last-of-type {\n  padding: 0;\n}\n.resume-segment-entry:last-of-type:before {\n  border-radius: 0 0 var(--border-radius) var(--border-radius);\n}\n.resume-segment-entry > .resume-segment-entry-information {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  font-size: 0.8rem;\n  font-style: italic;\n  margin: 0 0 0.2rem 0;\n}\n@media screen and (max-width: var(--breakpoint)) {\n.resume-segment-entry > .resume-segment-entry-information {\n    flex-direction: column;\n    margin: 0 0 0.4rem 0;\n}\n}\n.resume-segment-entry > .resume-segment-entry-information .resume-segment-entry-information-date {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  margin: 0 0 0.25rem 0;\n}\n.resume-segment-entry > .resume-segment-entry-information .resume-segment-entry-information-date .resume-segment-entry-information-from {\n  margin: 0 0.15rem 0 0;\n}\n.resume-segment-entry > .resume-segment-entry-information .resume-segment-entry-information-date .resume-segment-entry-information-from::after {\n  content: \"-\";\n  margin: 0 0 0 0.15rem;\n}\n.resume-segment-entry > .resume-segment-entry-information .resume-segment-entry-information-date .resume-segment-entry-information-to {\n  margin: 0 0.15rem 0 0;\n}\n.resume-segment-entry > .resume-segment-entry-information .resume-segment-entry-information-date .resume-segment-entry-information-to::after {\n  content: \"•\";\n  margin: 0 0 0 0.25rem;\n}\n@media screen and (max-width: var(--breakpoint)) {\n.resume-segment-entry > .resume-segment-entry-information .resume-segment-entry-information-date .resume-segment-entry-information-to::after {\n    content: \"\";\n    margin: 0;\n}\n}\n.resume-segment-entry > .resume-segment-entry-title {\n  margin: 0 0 0.2rem 0;\n  line-height: 1.5;\n}\n.resume-segment-entry > .resume-segment-entry-description {\n  width: 100%;\n  font-size: 0.9rem;\n}\n\n/*# sourceMappingURL=ResumeSegmentEntry.vue.map */", map: {"version":3,"sources":["ResumeSegmentEntry.vue","/Users/luha/development/vue-resume-component/src/components/ResumeSegmentEntry.vue"],"names":[],"mappings":"AAAA,gBAAgB;ACmFhB;EACA,kBAAA;EACA,aAAA;EACA,sBAAA;EACA,2BAAA;EACA,uBAAA;EACA,kBAAA;EACA,mBAAA;EACA,WAAA;ADjFA;ACkFA;EACA,WAAA;EACA,kBAAA;EACA,WAAA;EACA,+BAAA;EACA,UAAA;EACA,YAAA;ADhFA;ACiFA;EACA,WAAA;EACA,kBAAA;EACA,WAAA;EACA,SAAA;EACA,cAAA;EACA,eAAA;EACA,+BAAA;EACA,yCAAA;EACA,kBAAA;AD/EA;ACiFA;EACA,4DAAA;AD/EA;ACgFA;EACA,UAAA;AD9EA;AC+EA;EACA,4DAAA;AD7EA;AC8EA;EACA,aAAA;EACA,mBAAA;EACA,iBAAA;EACA,iBAAA;EACA,kBAAA;EACA,oBAAA;AD5EA;AC6EA;AAPA;IAQA,sBAAA;IACA,oBAAA;AD1EE;AACF;AC0EA;EACA,aAAA;EACA,mBAAA;EACA,iBAAA;EACA,qBAAA;ADxEA;ACyEA;EACA,qBAAA;ADvEA;ACwEA;EACA,YAAA;EACA,qBAAA;ADtEA;ACuEA;EACA,qBAAA;ADrEA;ACsEA;EACA,YAAA;EACA,qBAAA;ADpEA;ACqEA;AAHA;IAIA,WAAA;IACA,SAAA;ADlEE;AACF;ACkEA;EACA,oBAAA;EACA,gBAAA;ADhEA;ACiEA;EACA,WAAA;EACA,iBAAA;AD/DA;;AAEA,iDAAiD","file":"ResumeSegmentEntry.vue","sourcesContent":["@charset \"UTF-8\";\n.resume-segment-entry {\n  position: relative;\n  display: flex;\n  flex-flow: column wrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n  margin: 0 0 0 1rem;\n  padding: 0 0 1rem 0;\n  width: 100%;\n}\n.resume-segment-entry:before {\n  content: \"\";\n  position: absolute;\n  left: -13px;\n  background: var(--color-accent);\n  width: 3px;\n  height: 100%;\n}\n.resume-segment-entry:after {\n  content: \"\";\n  position: absolute;\n  left: -17px;\n  top: 18px;\n  width: 0.75rem;\n  height: 0.75rem;\n  background: var(--color-accent);\n  border: 2px solid var(--color-background);\n  border-radius: 50%;\n}\n.resume-segment-entry:first-of-type:before {\n  border-radius: var(--border-radius) var(--border-radius) 0 0;\n}\n.resume-segment-entry:last-of-type {\n  padding: 0;\n}\n.resume-segment-entry:last-of-type:before {\n  border-radius: 0 0 var(--border-radius) var(--border-radius);\n}\n.resume-segment-entry > .resume-segment-entry-information {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  font-size: 0.8rem;\n  font-style: italic;\n  margin: 0 0 0.2rem 0;\n}\n@media screen and (max-width: var(--breakpoint)) {\n  .resume-segment-entry > .resume-segment-entry-information {\n    flex-direction: column;\n    margin: 0 0 0.4rem 0;\n  }\n}\n.resume-segment-entry > .resume-segment-entry-information .resume-segment-entry-information-date {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  margin: 0 0 0.25rem 0;\n}\n.resume-segment-entry > .resume-segment-entry-information .resume-segment-entry-information-date .resume-segment-entry-information-from {\n  margin: 0 0.15rem 0 0;\n}\n.resume-segment-entry > .resume-segment-entry-information .resume-segment-entry-information-date .resume-segment-entry-information-from::after {\n  content: \"-\";\n  margin: 0 0 0 0.15rem;\n}\n.resume-segment-entry > .resume-segment-entry-information .resume-segment-entry-information-date .resume-segment-entry-information-to {\n  margin: 0 0.15rem 0 0;\n}\n.resume-segment-entry > .resume-segment-entry-information .resume-segment-entry-information-date .resume-segment-entry-information-to::after {\n  content: \"•\";\n  margin: 0 0 0 0.25rem;\n}\n@media screen and (max-width: var(--breakpoint)) {\n  .resume-segment-entry > .resume-segment-entry-information .resume-segment-entry-information-date .resume-segment-entry-information-to::after {\n    content: \"\";\n    margin: 0;\n  }\n}\n.resume-segment-entry > .resume-segment-entry-title {\n  margin: 0 0 0.2rem 0;\n  line-height: 1.5;\n}\n.resume-segment-entry > .resume-segment-entry-description {\n  width: 100%;\n  font-size: 0.9rem;\n}\n\n/*# sourceMappingURL=ResumeSegmentEntry.vue.map */","<template>\n  <li class=\"resume-segment-entry\">\n    <div\n      v-if=\"from || to || location\"\n      class=\"resume-segment-entry-information\"\n    >\n      <div\n        v-if=\"from || to\"\n        class=\"resume-segment-entry-information-date\"\n      >\n        <div\n          v-if=\"from\"\n          class=\"resume-segment-entry-information-from\"\n          v-text=\"from\"\n        />\n        <div\n          v-if=\"to\"\n          class=\"resume-segment-entry-information-to\"\n          v-text=\"to\"\n        />\n      </div>\n      <div\n        v-if=\"location\"\n        class=\"resume-segment-entry-information-location\"\n        v-text=\"location\"\n      />\n    </div>\n    <h3 class=\"resume-segment-entry-title\">\n      <span\n        v-if=\"title\"\n        v-text=\"title\"\n      />\n      <span\n        v-if=\"position\"\n        v-text=\"positionInBrackets\"\n      />\n    </h3>\n    <p\n      v-if=\"description\"\n      class=\"resume-segment-entry-description\"\n      v-html=\"description\"\n    />\n  </li>\n</template>\n\n<script>\nexport default {\n  name: 'ResumeSegmentEntry',\n  props: {\n    title: {\n      required: true,\n      type: String\n    },\n    description: {\n      default: '',\n      type: String\n    },\n    position: {\n      default: '',\n      type: String\n    },\n    location: {\n      default: '',\n      type: String\n    },\n    from: {\n      default: '',\n      type: String\n    },\n    to: {\n      default: '',\n      type: String\n    }\n  },\n  computed: {\n    positionInBrackets () {\n      return ` (${this.position})`\n    }\n  }\n}\n</script>\n\n<style lang=\"sass\">\n.resume-segment-entry\n  position: relative\n  display: flex\n  flex-flow: column wrap\n  justify-content: flex-start\n  align-items: flex-start\n  margin: 0 0 0 1rem\n  padding: 0 0 1rem 0\n  width: 100%\n  &:before\n    content: ''\n    position: absolute\n    left: -13px\n    background: var(--color-accent)\n    width: 3px\n    height: 100%\n  &:after\n    content: ''\n    position: absolute\n    left: -17px\n    top: 18px\n    width: .75rem\n    height: .75rem\n    background: var(--color-accent)\n    border: 2px solid var(--color-background)\n    border-radius: 50%\n  &:first-of-type\n    &:before\n      border-radius: var(--border-radius) var(--border-radius) 0 0\n  &:last-of-type\n    padding: 0\n    &:before\n      border-radius: 0 0 var(--border-radius) var(--border-radius)\n  >.resume-segment-entry-information\n    display: flex\n    flex-direction: row\n    flex-wrap: nowrap\n    font-size: .8rem\n    font-style: italic\n    margin: 0 0 .2rem 0\n    @media screen and (max-width: var(--breakpoint))\n      flex-direction: column\n      margin: 0 0 .4rem 0\n    .resume-segment-entry-information-date\n      display: flex\n      flex-direction: row\n      flex-wrap: nowrap\n      margin: 0 0 .25rem 0\n      .resume-segment-entry-information-from\n        margin: 0 .15rem 0 0\n        &::after\n          content: '-'\n          margin: 0 0 0 .15rem\n      .resume-segment-entry-information-to\n        margin: 0 .15rem 0 0\n        &::after\n          content: '•'\n          margin: 0 0 0 .25rem\n          @media screen and (max-width: var(--breakpoint))\n            content: ''\n            margin: 0\n  >.resume-segment-entry-title\n    margin: 0 0 .2rem 0\n    line-height: 1.5\n  >.resume-segment-entry-description\n    width: 100%\n    font-size: .9rem\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$2 = undefined;
    /* module identifier */
    var __vue_module_identifier__$2 = undefined;
    /* functional template */
    var __vue_is_functional_template__$2 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  var script$3 = {
    name: 'ResumeSegments',
    components: { ResumeSegmentEntry: __vue_component__$2 },
    props: {
      segments: {
        type: Array,
        required: true
        // TODO: add validation
      },
      settings: {
        type: Object,
        required: true
        // TODO: add validation
      }
    }
  };

  /* script */
  var __vue_script__$3 = script$3;

  /* template */
  var __vue_render__$3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "resume-segments" },
      _vm._l(_vm.segments, function(segment, i) {
        return _c("div", { key: i, staticClass: "resume-segment" }, [
          _c("h2", {
            staticClass: "resume-segment-title",
            domProps: { textContent: _vm._s(segment.title) }
          }),
          _vm._v(" "),
          _c(
            "ul",
            { staticClass: "resume-segment-list" },
            _vm._l(segment.entries, function(entry, j) {
              return _c("resume-segment-entry", {
                key: j,
                attrs: {
                  title: entry.title,
                  description: entry.description,
                  from: entry.from,
                  to: entry.to,
                  location: entry.location,
                  position: entry.position
                }
              })
            }),
            1
          )
        ])
      }),
      0
    )
  };
  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;

    /* style */
    var __vue_inject_styles__$3 = function (inject) {
      if (!inject) { return }
      inject("data-v-8004a3d8_0", { source: ".resume-segment {\n  margin: 0 0 2rem 0;\n}\n.resume-segment > .resume-segment-list {\n  margin: 0 0 0 0.2rem;\n}\n\n/*# sourceMappingURL=ResumeSegments.vue.map */", map: {"version":3,"sources":["/Users/luha/development/vue-resume-component/src/components/ResumeSegments.vue","ResumeSegments.vue"],"names":[],"mappings":"AAgDA;EACA,kBAAA;AC/CA;ADgDA;EACA,oBAAA;AC9CA;;AAEA,6CAA6C","file":"ResumeSegments.vue","sourcesContent":["<template>\n  <div class=\"resume-segments\">\n    <div\n      v-for=\"(segment, i) in segments\"\n      :key=\"i\"\n      class=\"resume-segment\"\n    >\n      <h2\n        class=\"resume-segment-title\"\n        v-text=\"segment.title\"\n      />\n      <ul class=\"resume-segment-list\">\n        <resume-segment-entry\n          v-for=\"(entry, j) in segment.entries\"\n          :key=\"j\"\n          :title=\"entry.title\"\n          :description=\"entry.description\"\n          :from=\"entry.from\"\n          :to=\"entry.to\"\n          :location=\"entry.location\"\n          :position=\"entry.position\"\n        />\n      </ul>\n    </div>\n  </div>\n</template>\n\n<script>\nimport ResumeSegmentEntry from './ResumeSegmentEntry.vue'\nexport default {\n  name: 'ResumeSegments',\n  components: { ResumeSegmentEntry },\n  props: {\n    segments: {\n      type: Array,\n      required: true\n      // TODO: add validation\n    },\n    settings: {\n      type: Object,\n      required: true\n      // TODO: add validation\n    }\n  }\n}\n</script>\n\n<style lang=\"sass\">\n.resume-segment\n  margin: 0 0 2rem 0\n  >.resume-segment-list\n    margin: 0 0 0 .2rem\n</style>\n",".resume-segment {\n  margin: 0 0 2rem 0;\n}\n.resume-segment > .resume-segment-list {\n  margin: 0 0 0 0.2rem;\n}\n\n/*# sourceMappingURL=ResumeSegments.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$3 = undefined;
    /* module identifier */
    var __vue_module_identifier__$3 = undefined;
    /* functional template */
    var __vue_is_functional_template__$3 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //

  var script$4 = {
    name: 'ResumeSkillEntry',
    props: {
      title: {
        type: String,
        required: true
        // TODO: add validation
      },
      level: {
        type: Number,
        default: 0
        // TODO: add validation
      }
    }
  };

  /* script */
  var __vue_script__$4 = script$4;

  /* template */
  var __vue_render__$4 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("li", { staticClass: "resume-skill-entry" }, [
      _c("span", { domProps: { textContent: _vm._s(_vm.title) } })
    ])
  };
  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;

    /* style */
    var __vue_inject_styles__$4 = function (inject) {
      if (!inject) { return }
      inject("data-v-c7ce5628_0", { source: ".resume-skill-entry {\n  margin: 0;\n  display: inline;\n  font-size: 0.9rem;\n  line-height: 1.4;\n}\n.resume-skill-entry:after {\n  content: \",\";\n  margin: 0 0.3rem 0 0;\n}\n.resume-skill-entry:last-child:after {\n  content: \"\";\n}\n\n/*# sourceMappingURL=ResumeSkillEntry.vue.map */", map: {"version":3,"sources":["/Users/luha/development/vue-resume-component/src/components/ResumeSkillEntry.vue","ResumeSkillEntry.vue"],"names":[],"mappings":"AA0BA;EACA,SAAA;EACA,eAAA;EACA,iBAAA;EACA,gBAAA;ACzBA;AD0BA;EACA,YAAA;EACA,oBAAA;ACxBA;AD0BA;EACA,WAAA;ACxBA;;AAEA,+CAA+C","file":"ResumeSkillEntry.vue","sourcesContent":["<template>\n  <li class=\"resume-skill-entry\">\n    <span v-text=\"title\" />\n    <!-- TODO: Add level depending on settings-->\n  </li>\n</template>\n\n<script>\nexport default {\n  name: 'ResumeSkillEntry',\n  props: {\n    title: {\n      type: String,\n      required: true\n      // TODO: add validation\n    },\n    level: {\n      type: Number,\n      default: 0\n      // TODO: add validation\n    }\n  }\n}\n</script>\n\n<style lang=\"sass\">\n.resume-skill-entry\n  margin: 0\n  display: inline\n  font-size: .9rem\n  line-height: 1.4\n  &:after\n    content: ','\n    margin: 0 .3rem 0 0\n  &:last-child\n    &:after\n      content: ''\n</style>\n",".resume-skill-entry {\n  margin: 0;\n  display: inline;\n  font-size: 0.9rem;\n  line-height: 1.4;\n}\n.resume-skill-entry:after {\n  content: \",\";\n  margin: 0 0.3rem 0 0;\n}\n.resume-skill-entry:last-child:after {\n  content: \"\";\n}\n\n/*# sourceMappingURL=ResumeSkillEntry.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$4 = undefined;
    /* module identifier */
    var __vue_module_identifier__$4 = undefined;
    /* functional template */
    var __vue_is_functional_template__$4 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  var script$5 = {
    name: 'ResumeSkills',
    components: {
      ResumeSkillEntry: __vue_component__$4
    },
    props: {
      skills: {
        type: Array,
        required: true
        // TODO: add validation
      },
      settings: {
        type: Object,
        required: true
        // TODO: add validation
      }
    }
  };

  /* script */
  var __vue_script__$5 = script$5;

  /* template */
  var __vue_render__$5 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "resume-skills" },
      [
        _c("h2", [_vm._v("Skills")]),
        _vm._v(" "),
        _vm._l(_vm.skills, function(skill, i) {
          return _c("div", { key: i, staticClass: "resume-skills-category" }, [
            _c("h3", {
              staticClass: "resume-skills-category-title",
              domProps: { textContent: _vm._s(skill.title) }
            }),
            _vm._v(" "),
            _c(
              "ul",
              { staticClass: "resume-skills-category-entries" },
              _vm._l(skill.entries, function(entry, j) {
                return _c("resume-skill-entry", {
                  key: j,
                  staticClass: "resume-skills-category-entry",
                  attrs: { title: entry.title, level: entry.level }
                })
              }),
              1
            )
          ])
        })
      ],
      2
    )
  };
  var __vue_staticRenderFns__$5 = [];
  __vue_render__$5._withStripped = true;

    /* style */
    var __vue_inject_styles__$5 = function (inject) {
      if (!inject) { return }
      inject("data-v-3044d746_0", { source: ".resume-skills {\n  background: var(--color-accent);\n  border-radius: var(--border-radius);\n  padding: 1rem;\n}\n.resume-skills > .resume-skills-category {\n  margin: 0 0 1rem 0;\n}\n.resume-skills > .resume-skills-category .resume-skills-category-entries {\n  list-style: none;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n\n/*# sourceMappingURL=ResumeSkills.vue.map */", map: {"version":3,"sources":["/Users/luha/development/vue-resume-component/src/components/ResumeSkills.vue","ResumeSkills.vue"],"names":[],"mappings":"AAgDA;EACA,+BAAA;EACA,mCAAA;EACA,aAAA;AC/CA;ADgDA;EACA,kBAAA;AC9CA;AD+CA;EACA,gBAAA;EACA,aAAA;EACA,mBAAA;EACA,eAAA;AC7CA;;AAEA,2CAA2C","file":"ResumeSkills.vue","sourcesContent":["<template>\n  <div class=\"resume-skills\">\n    <h2>Skills</h2>\n    <div\n      v-for=\"(skill, i) in skills\"\n      :key=\"i\"\n      class=\"resume-skills-category\"\n    >\n      <h3\n        class=\"resume-skills-category-title\"\n        v-text=\"skill.title\"\n      />\n      <ul class=\"resume-skills-category-entries\">\n        <resume-skill-entry\n          v-for=\"(entry, j) in skill.entries\"\n          :key=\"j\"\n          :title=\"entry.title\"\n          :level=\"entry.level\"\n          class=\"resume-skills-category-entry\"\n        />\n      </ul>\n    </div>\n  </div>\n</template>\n\n<script>\nimport ResumeSkillEntry from './ResumeSkillEntry.vue'\nexport default {\n  name: 'ResumeSkills',\n  components: {\n    ResumeSkillEntry\n  },\n  props: {\n    skills: {\n      type: Array,\n      required: true\n      // TODO: add validation\n    },\n    settings: {\n      type: Object,\n      required: true\n      // TODO: add validation\n    }\n  }\n}\n</script>\n\n<style lang=\"sass\">\n.resume-skills\n  background: var(--color-accent)\n  border-radius: var(--border-radius)\n  padding: 1rem\n  >.resume-skills-category\n    margin: 0 0 1rem 0\n    .resume-skills-category-entries\n      list-style: none\n      display: flex\n      flex-direction: row\n      flex-wrap: wrap\n</style>\n",".resume-skills {\n  background: var(--color-accent);\n  border-radius: var(--border-radius);\n  padding: 1rem;\n}\n.resume-skills > .resume-skills-category {\n  margin: 0 0 1rem 0;\n}\n.resume-skills > .resume-skills-category .resume-skills-category-entries {\n  list-style: none;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n\n/*# sourceMappingURL=ResumeSkills.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$5 = undefined;
    /* module identifier */
    var __vue_module_identifier__$5 = undefined;
    /* functional template */
    var __vue_is_functional_template__$5 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$6 = {
    name: 'ResumeList',
    props: {
      list: {
        type: Array,
        required: true
        // TODO validator
      }
    }
  };

  /* script */
  var __vue_script__$6 = script$6;

  /* template */
  var __vue_render__$6 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "resume-list" }, [
      _c(
        "ul",
        _vm._l(_vm.list, function(entry, i) {
          return _c("li", { key: i, staticClass: "resume-list-entry" }, [
            entry.url
              ? _c("a", {
                  attrs: { href: entry.url },
                  domProps: { textContent: _vm._s(entry.title) }
                })
              : _c("span", { domProps: { textContent: _vm._s(entry.title) } })
          ])
        }),
        0
      )
    ])
  };
  var __vue_staticRenderFns__$6 = [];
  __vue_render__$6._withStripped = true;

    /* style */
    var __vue_inject_styles__$6 = function (inject) {
      if (!inject) { return }
      inject("data-v-49b80fb4_0", { source: ".resume-list {\n  margin: 0 0 2rem 0;\n  background: var(--color-accent);\n  border-radius: var(--border-radius);\n  padding: 1rem;\n}\n.resume-list .resume-list-entry {\n  margin: 0 0 0.5rem 0;\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n  font-size: 0.9rem;\n}\n.resume-list .resume-list-entry:last-of-type {\n  margin: 0;\n}\n.resume-list .resume-list-entry a {\n  color: var(--color-font);\n  transition: var(--transition);\n  text-decoration: none;\n  border-bottom: 1px transparent solid;\n}\n.resume-list .resume-list-entry a:hover {\n  border-bottom-color: var(--color-font);\n}\n\n/*# sourceMappingURL=ResumeList.vue.map */", map: {"version":3,"sources":["/Users/luha/development/vue-resume-component/src/components/ResumeList.vue","ResumeList.vue"],"names":[],"mappings":"AAoCA;EACA,kBAAA;EACA,+BAAA;EACA,mCAAA;EACA,aAAA;ACnCA;ADoCA;EACA,oBAAA;EACA,yBAAA;EACA,qBAAA;EACA,iBAAA;AClCA;ADmCA;EACA,SAAA;ACjCA;ADkCA;EACA,wBAAA;EACA,6BAAA;EACA,qBAAA;EACA,oCAAA;AChCA;ADiCA;EACA,sCAAA;AC/BA;;AAEA,yCAAyC","file":"ResumeList.vue","sourcesContent":["<template>\n  <div class=\"resume-list\">\n    <ul>\n      <li\n        class=\"resume-list-entry\"\n        v-for=\"(entry, i) in list\"\n        :key=\"i\"\n      >\n        <a\n          v-if=\"entry.url\"\n          :href=\"entry.url\"\n          v-text=\"entry.title\"\n        />\n        <span\n          v-else\n          v-text=\"entry.title\"\n        />\n      </li>\n    </ul>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'ResumeList',\n  props: {\n    list: {\n      type: Array,\n      required: true\n      // TODO validator\n    }\n  }\n}\n</script>\n\n<style lang=\"sass\">\n.resume-list\n  margin: 0 0 2rem 0\n  background: var(--color-accent)\n  border-radius: var(--border-radius)\n  padding: 1rem\n  .resume-list-entry\n    margin: 0 0 .5rem 0\n    overflow-wrap: break-word\n    word-wrap: break-word\n    font-size: .9rem\n    &:last-of-type\n      margin: 0\n    a\n      color: var(--color-font)\n      transition: var(--transition)\n      text-decoration: none\n      border-bottom: 1px transparent solid\n      &:hover\n        border-bottom-color: var(--color-font)\n</style>\n",".resume-list {\n  margin: 0 0 2rem 0;\n  background: var(--color-accent);\n  border-radius: var(--border-radius);\n  padding: 1rem;\n}\n.resume-list .resume-list-entry {\n  margin: 0 0 0.5rem 0;\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n  font-size: 0.9rem;\n}\n.resume-list .resume-list-entry:last-of-type {\n  margin: 0;\n}\n.resume-list .resume-list-entry a {\n  color: var(--color-font);\n  transition: var(--transition);\n  text-decoration: none;\n  border-bottom: 1px transparent solid;\n}\n.resume-list .resume-list-entry a:hover {\n  border-bottom-color: var(--color-font);\n}\n\n/*# sourceMappingURL=ResumeList.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$6 = undefined;
    /* module identifier */
    var __vue_module_identifier__$6 = undefined;
    /* functional template */
    var __vue_is_functional_template__$6 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$7 = {
    name: 'ResumeImage',
    props: {
      image: {
        type: String,
        required: true
      }
    }
  };

  /* script */
  var __vue_script__$7 = script$7;

  /* template */
  var __vue_render__$7 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "resume-image" }, [
      _c("img", { attrs: { src: _vm.image, alt: "Resume picture" } })
    ])
  };
  var __vue_staticRenderFns__$7 = [];
  __vue_render__$7._withStripped = true;

    /* style */
    var __vue_inject_styles__$7 = function (inject) {
      if (!inject) { return }
      inject("data-v-6c8b9032_0", { source: ".resume-image {\n  margin: 0 0 2rem 0;\n}\n.resume-image > img {\n  max-width: 100%;\n  border-radius: var(--border-radius);\n  box-shadow: var(--box-shadow);\n}\n\n/*# sourceMappingURL=ResumeImage.vue.map */", map: {"version":3,"sources":["/Users/luha/development/vue-resume-component/src/components/ResumeImage.vue","ResumeImage.vue"],"names":[],"mappings":"AAsBA;EACA,kBAAA;ACrBA;ADsBA;EACA,eAAA;EACA,mCAAA;EACA,6BAAA;ACpBA;;AAEA,0CAA0C","file":"ResumeImage.vue","sourcesContent":["<template>\n  <div class=\"resume-image\">\n    <img\n      :src=\"image\"\n      alt=\"Resume picture\"\n    >\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'ResumeImage',\n  props: {\n    image: {\n      type: String,\n      required: true\n    }\n  }\n}\n</script>\n\n<style lang=\"sass\">\n.resume-image\n  margin: 0 0 2rem 0\n  >img\n    max-width: 100%\n    border-radius: var(--border-radius)\n    box-shadow: var(--box-shadow)\n</style>\n",".resume-image {\n  margin: 0 0 2rem 0;\n}\n.resume-image > img {\n  max-width: 100%;\n  border-radius: var(--border-radius);\n  box-shadow: var(--box-shadow);\n}\n\n/*# sourceMappingURL=ResumeImage.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$7 = undefined;
    /* module identifier */
    var __vue_module_identifier__$7 = undefined;
    /* functional template */
    var __vue_is_functional_template__$7 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$7 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //

  var script$8 = {
    name: 'ResumeSlogan',
    props: {
      slogan: {
        type: String,
        required: true
      }
    }
  };

  /* script */
  var __vue_script__$8 = script$8;

  /* template */
  var __vue_render__$8 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "resume-slogan" }, [
      _c("p", { domProps: { innerHTML: _vm._s(_vm.slogan) } })
    ])
  };
  var __vue_staticRenderFns__$8 = [];
  __vue_render__$8._withStripped = true;

    /* style */
    var __vue_inject_styles__$8 = function (inject) {
      if (!inject) { return }
      inject("data-v-54e879c2_0", { source: ".resume-slogan {\n  margin: 0 0 2rem 0;\n  background: var(--color-accent);\n  border-radius: var(--border-radius);\n  padding: 1rem;\n  font-size: 0.9rem;\n}\n\n/*# sourceMappingURL=ResumeSlogan.vue.map */", map: {"version":3,"sources":["/Users/luha/development/vue-resume-component/src/components/ResumeSlogan.vue","ResumeSlogan.vue"],"names":[],"mappings":"AAmBA;EACA,kBAAA;EACA,+BAAA;EACA,mCAAA;EACA,aAAA;EACA,iBAAA;AClBA;;AAEA,2CAA2C","file":"ResumeSlogan.vue","sourcesContent":["<template>\n  <div class=\"resume-slogan\">\n    <p v-html=\"slogan\" />\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'ResumeSlogan',\n  props: {\n    slogan: {\n      type: String,\n      required: true\n    }\n  }\n}\n</script>\n\n<style lang=\"sass\">\n.resume-slogan\n  margin: 0 0 2rem 0\n  background: var(--color-accent)\n  border-radius: var(--border-radius)\n  padding: 1rem\n  font-size: 0.9rem\n</style>\n",".resume-slogan {\n  margin: 0 0 2rem 0;\n  background: var(--color-accent);\n  border-radius: var(--border-radius);\n  padding: 1rem;\n  font-size: 0.9rem;\n}\n\n/*# sourceMappingURL=ResumeSlogan.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$8 = undefined;
    /* module identifier */
    var __vue_module_identifier__$8 = undefined;
    /* functional template */
    var __vue_is_functional_template__$8 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$8 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
      __vue_inject_styles__$8,
      __vue_script__$8,
      __vue_scope_id__$8,
      __vue_is_functional_template__$8,
      __vue_module_identifier__$8,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  var script$9 = {
    name: 'Resume',
    components: {
      ResumeSlogan: __vue_component__$8,
      ResumeImage: __vue_component__$7,
      ResumeList: __vue_component__$6,
      ResumeHeader: __vue_component__,
      ResumeFooter: __vue_component__$1,
      ResumeSegments: __vue_component__$3,
      ResumeSkills: __vue_component__$5
    },
    created: function created () {
      this.setCssVariables(document);
    },
    props: {
      settings: {
        type: Object,
        required: true,
        // TODO add validator for mandatory fields
      },
      information: {
        type: Object,
        required: true,
        // TODO add validator for mandatory fields
      },
      segments: {
        type: Array,
        required: true,
        // TODO add validator for mandatory fields
      },
      skills: {
        type: Array,
        required: true,
        // TODO add validator for mandatory fields
      },
    },
    methods: {
      setCssVariables: function setCssVariables (document) {
        var root = document.documentElement;
        // TODO test if colors are valid hex colors, if not use defaults
        var colors = this.settings.style.colors;
        // TODO maybe write helper
        root.style.setProperty('--color-primary', colors.primary);
        root.style.setProperty('--color-accent', colors.accent);
        root.style.setProperty('--color-font', colors.font);
        root.style.setProperty('--color-background', colors.background);
        root.style.setProperty('--color-font-on-primary', colors.fontOnPrimary);
        root.style.setProperty('--color-font-on-accent', colors.fontOnAccent);
        // TODO use defaults if nothing is provided
        var fonts = this.settings.style.fonts;
        root.style.setProperty('--font-headline', fonts.headline);
        root.style.setProperty('--font-body', fonts.body);
      }
    }
  };

  /* script */
  var __vue_script__$9 = script$9;

  /* template */
  var __vue_render__$9 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "resume" },
      [
        _c("resume-header", {
          staticClass: "header",
          attrs: { name: _vm.information.name }
        }),
        _vm._v(" "),
        _c("resume-segments", {
          staticClass: "segments",
          attrs: { segments: _vm.segments, settings: _vm.settings.segments }
        }),
        _vm._v(" "),
        _c(
          "aside",
          { staticClass: "sidebar" },
          [
            _vm.information.image
              ? _c("resume-image", {
                  staticClass: "image",
                  attrs: { image: _vm.information.image }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.information.slogan
              ? _c("resume-slogan", {
                  staticClass: "slogan",
                  attrs: { slogan: _vm.information.slogan }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.information.list
              ? _c("resume-list", {
                  staticClass: "list",
                  attrs: { list: _vm.information.list }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.skills
              ? _c("resume-skills", {
                  staticClass: "skills",
                  attrs: { skills: _vm.skills, settings: _vm.settings.skills }
                })
              : _vm._e()
          ],
          1
        ),
        _vm._v(" "),
        _c("resume-footer", {
          staticClass: "footer",
          attrs: { information: _vm.information.footer }
        })
      ],
      1
    )
  };
  var __vue_staticRenderFns__$9 = [];
  __vue_render__$9._withStripped = true;

    /* style */
    var __vue_inject_styles__$9 = function (inject) {
      if (!inject) { return }
      inject("data-v-f741be58_0", { source: ":root {\n  --paper-width: 210mm;\n  --paper-height: 297mm;\n  --breakpoint: var(--paper-width) + 30mm;\n  --border-radius: 2px;\n  --transition: all 150ms ease-in-out;\n  --box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 0 2px rgba(0, 0, 0, 0.1), 0 0 3px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1);\n}\n.resume {\n  display: grid;\n  grid-template-areas: \"sidebar header\" \"sidebar segments\" \"footer footer\";\n  grid-template-columns: 30% 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-gap: 2rem;\n  width: var(--paper-width);\n  min-height: var(--paper-height);\n  background: var(--color-background);\n  border-radius: var(--border-radius);\n  font-size: 1rem;\n}\n@media screen and (max-width: var(--breakpoint)) {\n.resume {\n    grid-template-areas: \"header\" \"sidebar\" \"segments\" \"footer\";\n    grid-template-columns: 1fr;\n    grid-template-rows: auto auto auto auto;\n    width: 100%;\n    min-height: auto;\n}\n}\n.resume * {\n  font-family: var(--font-body);\n  box-sizing: border-box;\n}\n.resume *:after, .resume *:before {\n  box-sizing: border-box;\n}\n.resume h1, .resume h2, .resume h3, .resume h4, .resume h5, .resume h6, .resume p, .resume ul, .resume ol {\n  margin: 0;\n  padding: 0;\n}\n.resume ul, .resume ol {\n  list-style: none;\n}\n.resume h1, .resume h2, .resume h3 {\n  font-family: var(--font-headline);\n}\n.resume h2 {\n  font-size: 1.2rem;\n  font-weight: bold;\n  margin: 0 0 0.75rem 0;\n}\n.resume h3 {\n  font-size: 1rem;\n  font-weight: bold;\n}\n.resume p {\n  line-height: 1.5;\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n  word-break: break-word;\n  hyphens: auto;\n}\n.resume > .header {\n  grid-area: header;\n  margin: 2rem 2rem 0 0;\n}\n@media screen and (max-width: var(--breakpoint)) {\n.resume > .header {\n    margin: 2rem 2rem 0 2rem;\n}\n}\n.resume > .segments {\n  grid-area: segments;\n  margin: 0 2rem 0 0;\n}\n@media screen and (max-width: var(--breakpoint)) {\n.resume > .segments {\n    margin: 0 2rem 0 2rem;\n}\n}\n.resume > .sidebar {\n  grid-area: sidebar;\n  margin: 2rem 0 0 2rem;\n}\n@media screen and (max-width: var(--breakpoint)) {\n.resume > .sidebar {\n    margin: 0 2rem 0 2rem;\n}\n}\n.resume > .footer {\n  grid-area: footer;\n}\n\n/*# sourceMappingURL=Resume.vue.map */", map: {"version":3,"sources":["/Users/luha/development/vue-resume-component/src/components/Resume.vue","Resume.vue"],"names":[],"mappings":"AA2GA;EACA,oBAAA;EACA,qBAAA;EACA,uCAAA;EACA,oBAAA;EACA,mCAAA;EACA,4HAAA;AC1GA;AD2GA;EACA,aAAA;EACA,wEAAA;EACA,8BAAA;EACA,iCAAA;EACA,cAAA;EACA,yBAAA;EACA,+BAAA;EACA,mCAAA;EACA,mCAAA;EACA,eAAA;ACxGA;ADyGA;AAXA;IAYA,2DAAA;IACA,0BAAA;IACA,uCAAA;IACA,WAAA;IACA,gBAAA;ACtGE;AACF;ADsGA;EACA,6BAAA;EACA,sBAAA;ACpGA;ADqGA;EACA,sBAAA;ACnGA;ADqGA;EACA,SAAA;EACA,UAAA;ACnGA;ADoGA;EACA,gBAAA;AClGA;ADoGA;EACA,iCAAA;AClGA;ADmGA;EACA,iBAAA;EACA,iBAAA;EACA,qBAAA;ACjGA;ADkGA;EACA,eAAA;EACA,iBAAA;AChGA;ADiGA;EACA,gBAAA;EACA,yBAAA;EACA,qBAAA;EACA,sBAAA;EACA,aAAA;AC/FA;ADiGA;EACA,iBAAA;EACA,qBAAA;AC/FA;ADgGA;AAHA;IAIA,wBAAA;AC7FE;AACF;AD6FA;EACA,mBAAA;EACA,kBAAA;AC3FA;AD4FA;AAHA;IAIA,qBAAA;ACzFE;AACF;ADyFA;EACA,kBAAA;EACA,qBAAA;ACvFA;ADwFA;AAHA;IAIA,qBAAA;ACrFE;AACF;ADqFA;EACA,iBAAA;ACnFA;;AAEA,qCAAqC","file":"Resume.vue","sourcesContent":["<template>\n  <div class=\"resume\">\n    <resume-header\n      class=\"header\"\n      :name=\"information.name\"\n    />\n    <resume-segments\n      class=\"segments\"\n      :segments=\"segments\"\n      :settings=\"settings.segments\"\n    />\n    <aside class=\"sidebar\">\n      <resume-image\n        class=\"image\"\n        :image=\"information.image\"\n        v-if=\"information.image\"\n      />\n      <resume-slogan\n        class=\"slogan\"\n        :slogan=\"information.slogan\"\n        v-if=\"information.slogan\"\n      />\n      <resume-list\n        :list=\"information.list\"\n        class=\"list\"\n        v-if=\"information.list\"\n      />\n      <resume-skills\n        class=\"skills\"\n        :skills=\"skills\"\n        :settings=\"settings.skills\"\n        v-if=\"skills\"\n      />\n    </aside>\n    <resume-footer\n      class=\"footer\"\n      :information=\"information.footer\"\n    />\n  </div>\n</template>\n\n<script>\nimport ResumeHeader from './ResumeHeader.vue'\nimport ResumeFooter from './ResumeFooter.vue'\nimport ResumeSegments from './ResumeSegments.vue'\nimport ResumeSkills from './ResumeSkills.vue'\nimport ResumeList from './ResumeList.vue'\nimport ResumeImage from './ResumeImage.vue'\nimport ResumeSlogan from './ResumeSlogan.vue'\nexport default {\n  name: 'Resume',\n  components: {\n    ResumeSlogan,\n    ResumeImage,\n    ResumeList,\n    ResumeHeader,\n    ResumeFooter,\n    ResumeSegments,\n    ResumeSkills\n  },\n  created () {\n    this.setCssVariables(document)\n  },\n  props: {\n    settings: {\n      type: Object,\n      required: true,\n      // TODO add validator for mandatory fields\n    },\n    information: {\n      type: Object,\n      required: true,\n      // TODO add validator for mandatory fields\n    },\n    segments: {\n      type: Array,\n      required: true,\n      // TODO add validator for mandatory fields\n    },\n    skills: {\n      type: Array,\n      required: true,\n      // TODO add validator for mandatory fields\n    },\n  },\n  methods: {\n    setCssVariables (document) {\n      const root = document.documentElement\n      // TODO test if colors are valid hex colors, if not use defaults\n      const colors = this.settings.style.colors\n      // TODO maybe write helper\n      root.style.setProperty('--color-primary', colors.primary)\n      root.style.setProperty('--color-accent', colors.accent)\n      root.style.setProperty('--color-font', colors.font)\n      root.style.setProperty('--color-background', colors.background)\n      root.style.setProperty('--color-font-on-primary', colors.fontOnPrimary)\n      root.style.setProperty('--color-font-on-accent', colors.fontOnAccent)\n      // TODO use defaults if nothing is provided\n      const fonts = this.settings.style.fonts\n      root.style.setProperty('--font-headline', fonts.headline)\n      root.style.setProperty('--font-body', fonts.body)\n    }\n  }\n}\n</script>\n\n<style lang=\"sass\">\n\\:root\n  --paper-width: 210mm\n  --paper-height: 297mm\n  --breakpoint: var(--paper-width) + 30mm\n  --border-radius: 2px\n  --transition: all 150ms ease-in-out\n  --box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 0 2px rgba(0, 0, 0, 0.1), 0 0 3px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1)\n.resume\n  display: grid\n  grid-template-areas: \"sidebar header\" \"sidebar segments\" \"footer footer\"\n  grid-template-columns: 30% 1fr\n  grid-template-rows: auto 1fr auto\n  grid-gap: 2rem\n  width: var(--paper-width)\n  min-height: var(--paper-height)\n  background: var(--color-background)\n  border-radius: var(--border-radius)\n  font-size: 1rem\n  @media screen and (max-width: var(--breakpoint))\n    grid-template-areas: \"header\" \"sidebar\" \"segments\" \"footer\"\n    grid-template-columns: 1fr\n    grid-template-rows: auto auto auto auto\n    width: 100%\n    min-height: auto\n  *\n    font-family: var(--font-body)\n    box-sizing: border-box\n    &:after, &:before\n      box-sizing: border-box\n  // RESET\n  h1, h2, h3, h4, h5, h6, p, ul, ol\n    margin: 0\n    padding: 0\n  ul, ol\n    list-style: none\n  // TYPO\n  h1, h2, h3\n    font-family: var(--font-headline)\n  h2\n    font-size: 1.2rem\n    font-weight: bold\n    margin: 0 0 .75rem 0\n  h3\n    font-size: 1rem\n    font-weight: bold\n  p\n    line-height: 1.5\n    overflow-wrap: break-word\n    word-wrap: break-word\n    word-break: break-word\n    hyphens: auto\n  // ALIGNMENT\n  >.header\n    grid-area: header\n    margin: 2rem 2rem 0 0\n    @media screen and (max-width: var(--breakpoint))\n      margin: 2rem 2rem 0 2rem\n  >.segments\n    grid-area: segments\n    margin: 0 2rem 0 0\n    @media screen and (max-width: var(--breakpoint))\n      margin: 0 2rem 0 2rem\n  >.sidebar\n    grid-area: sidebar\n    margin: 2rem 0 0 2rem\n    @media screen and (max-width: var(--breakpoint))\n      margin: 0 2rem 0 2rem\n  >.footer\n    grid-area: footer\n</style>\n",":root {\n  --paper-width: 210mm;\n  --paper-height: 297mm;\n  --breakpoint: var(--paper-width) + 30mm;\n  --border-radius: 2px;\n  --transition: all 150ms ease-in-out;\n  --box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 0 2px rgba(0, 0, 0, 0.1), 0 0 3px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1);\n}\n\n.resume {\n  display: grid;\n  grid-template-areas: \"sidebar header\" \"sidebar segments\" \"footer footer\";\n  grid-template-columns: 30% 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-gap: 2rem;\n  width: var(--paper-width);\n  min-height: var(--paper-height);\n  background: var(--color-background);\n  border-radius: var(--border-radius);\n  font-size: 1rem;\n}\n@media screen and (max-width: var(--breakpoint)) {\n  .resume {\n    grid-template-areas: \"header\" \"sidebar\" \"segments\" \"footer\";\n    grid-template-columns: 1fr;\n    grid-template-rows: auto auto auto auto;\n    width: 100%;\n    min-height: auto;\n  }\n}\n.resume * {\n  font-family: var(--font-body);\n  box-sizing: border-box;\n}\n.resume *:after, .resume *:before {\n  box-sizing: border-box;\n}\n.resume h1, .resume h2, .resume h3, .resume h4, .resume h5, .resume h6, .resume p, .resume ul, .resume ol {\n  margin: 0;\n  padding: 0;\n}\n.resume ul, .resume ol {\n  list-style: none;\n}\n.resume h1, .resume h2, .resume h3 {\n  font-family: var(--font-headline);\n}\n.resume h2 {\n  font-size: 1.2rem;\n  font-weight: bold;\n  margin: 0 0 0.75rem 0;\n}\n.resume h3 {\n  font-size: 1rem;\n  font-weight: bold;\n}\n.resume p {\n  line-height: 1.5;\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n  word-break: break-word;\n  hyphens: auto;\n}\n.resume > .header {\n  grid-area: header;\n  margin: 2rem 2rem 0 0;\n}\n@media screen and (max-width: var(--breakpoint)) {\n  .resume > .header {\n    margin: 2rem 2rem 0 2rem;\n  }\n}\n.resume > .segments {\n  grid-area: segments;\n  margin: 0 2rem 0 0;\n}\n@media screen and (max-width: var(--breakpoint)) {\n  .resume > .segments {\n    margin: 0 2rem 0 2rem;\n  }\n}\n.resume > .sidebar {\n  grid-area: sidebar;\n  margin: 2rem 0 0 2rem;\n}\n@media screen and (max-width: var(--breakpoint)) {\n  .resume > .sidebar {\n    margin: 0 2rem 0 2rem;\n  }\n}\n.resume > .footer {\n  grid-area: footer;\n}\n\n/*# sourceMappingURL=Resume.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$9 = undefined;
    /* module identifier */
    var __vue_module_identifier__$9 = undefined;
    /* functional template */
    var __vue_is_functional_template__$9 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$9 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
      __vue_inject_styles__$9,
      __vue_script__$9,
      __vue_scope_id__$9,
      __vue_is_functional_template__$9,
      __vue_module_identifier__$9,
      false,
      createInjector,
      undefined,
      undefined
    );

  // Import vue component

  // Declare install function executed by Vue.use()
  function install(Vue) {
    if (install.installed) { return; }
    install.installed = true;
    Vue.component('VueResume', __vue_component__$9);
  }

  // Create module definition for Vue.use()
  var plugin = {
    install: install,
  };

  // Auto-install when vue is found (eg. in browser via <script> tag)
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  exports.default = __vue_component__$9;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
