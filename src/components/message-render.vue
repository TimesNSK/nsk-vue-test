<script>
    import Vue from 'vue'

    const allowedTags = ['I', 'B', 'math']
    const replaceTags = {
        math: 'vue-math'
    }

    function simpleCleanTags(node) {
        const arr = {
            text: [],
        }
        function f(childNode, arr) {
            /* ie workaround: childNodes don't have forEach */
            [...childNode.childNodes].forEach(node => {
                if (allowedTags.includes(node.tagName)) {
                    let tag = node.tagName
                    if (replaceTags[tag]) {
                        tag = replaceTags[tag]
                    }
                    arr.text.push(`<${tag}>`)
                }

                if (node.nodeType === Node.TEXT_NODE) {
                    arr.text.push(node.textContent)
                }

                f(node, arr)

                if (allowedTags.includes(node.tagName)) {
                    let tag = node.tagName
                    if (replaceTags[tag]) {
                        tag = replaceTags[tag]
                    }
                    arr.text.push(`</${tag}>`)
                }
            })
        }
        f(node, arr)
        return arr.text.join('')
    }

    function mathTagPrepare(node) {
        function f(childNode) {
            [...childNode.childNodes].forEach(node => {
                if (node.tagName && node.tagName.toLowerCase() === 'vue-math') {
                    node.setAttribute('expression', node.textContent)
                    node.textContent = ''
                }
            })
        }
        f(node)
        return node
    }

    import VueMath from './vue-math'

    export default {
        name: 'MessageRender',
        props: ['message'],
        components: {VueMath},
        data() {
            return {
                templateRender: null,
                templateRenderFns: [],
                dom: document.createElement('div')
            }
        },
        computed: {
            template() {
                return this.message.text
            }
        },
        render(h) {
            if (!this.templateRender) {
                return h('p', '')
            } else {
                return this.templateRender()
            }
        },
        watch: {
            template: {
                immediate: true,
                handler() {
                    this.dom.innerHTML = this.template
                    this.dom.innerHTML = simpleCleanTags(this.dom)

                    const res = Vue.compile(`<p>${mathTagPrepare(this.dom).innerHTML}</p>`)

                    this.templateRender = res.render
                    this.$options.staticRenderFns = []
                    this._staticTrees = []
                    for (var i in res.staticRenderFns) {
                        this.$options.staticRenderFns.push(res.staticRenderFns[i])
                    }
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables";

    i,
    b {
        color: $math-color;
    }
</style>
