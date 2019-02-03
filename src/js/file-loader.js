
export default class FileLoader {

    constructor(handler, readAs = 'readAsText') {
        this.handler = handler
        this.readAs = readAs
        this.input = document.createElement('input')
        this.input.setAttribute('type', 'file')
        this.input.widget = this
        this.input.onchange = this.onchange.bind(this)
    }

    onchange() {
        let file = this.input.files[0]
        if (file) {
            let name = this.input.files[0].name
            let reader = new FileReader()

            this.handler(new Promise((res, rej) => {
                reader[this.readAs](file)

                reader.onloadend = function () {
                    res({name, data: reader.result})
                }

                reader.onerror = reader.onabort = function (e) {
                    rej(e)
                }
            }))
        }
        this.input.value = null
    }

    load() {
        this.input.click()
    }
}
