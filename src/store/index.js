import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        fileName: 'Sample.json',
        identifiers: [{
            name: 'id1',
            messages: [{
                text: 'Test message <b>1</b>',
            }, {
                text: 'Test message <b>2</b>',
            }]
        }, {
            name: 'id2',
            messages: [{
                text: 'Test message <i>1</i> with math <math>x</math>'
            }, {
                text: 'Test message <i>2</i> with math <math>x+y</math>'
            }]
        }, {
            name: 'Other sample',
            messages: [{
                text: `Test message <i>i tag</i> with math <math>f(x) = \\int_{-\\infty}^\\infty\\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\\,d\\xi</math> - <b>bold</b>`
            }, {
                text: `<math>c = \\pm\\sqrt{a^2 + b^2}</math> <br> br not work. <test>and test.</test>`
            }]
        }],
        selectedIdentifier: null
    },
    getters: {
        fileDownload: state => {
            const json = {}

            state.identifiers.forEach(i => {
                json[i.name] = i.messages.map(m => m.text)
            })

            return {
                name: state.fileName,
                json
            }
        },
        selectedIdentifier: state => state.selectedIdentifier,
        getIdentifiers: state => state.identifiers,
        getIdentifierByName: state => name => state.identifiers.find(i => i.name === name)
    },
    mutations: {
        selectIdentifier: (state, identifier) => {
            state.selectedIdentifier = identifier
        },
        removeIdentifier: (state, identifier) => {
            state.identifiers.splice(state.identifiers.indexOf(identifier), 1)
            if (state.selectedIdentifier === identifier) {
                state.selectedIdentifier = null
            }
        },
        removeMessage: (state, message) => {
            state.selectedIdentifier.messages.splice(state.selectedIdentifier.messages.indexOf(message), 1)
        },
        createIdentifier: (state, name) => {
            state.identifiers.unshift({
                name, messages: []
            })
        },
        changeMessage: (state, {message, text}) => {
            Vue.set(message, 'text', text)
        },
        addMessage: (state) => {
            state.selectedIdentifier.messages.unshift({
                text: ''
            })
        },
        fileUpload: (state, {name, json}) => {
            state.fileName = name
            state.identifiers.splice(0, state.identifiers.length)
            state.selectedIdentifier = null

            Object.keys(json).forEach(key => {
                state.identifiers.push({
                    name: key,
                    messages: json[key].map(m => ({text: m}))
                })
            })
        },
    }
})

export default store
