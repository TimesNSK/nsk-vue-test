
export default {

    downloadJSON(name, json) {
        const data = `text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(json, null, 2))}`;
        const a = document.createElement('a');
        a.href = 'data:' + data;
        a.download = name;
        a.click()
    }

}
