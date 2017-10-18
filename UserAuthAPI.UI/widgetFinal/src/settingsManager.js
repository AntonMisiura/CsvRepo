import Http from './http'
var Settings = "";
var IP = "";
export class SettingsManager {

    static connection(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();
        if (xhr.status == 200) {
            var r = xhr.response;
            Settings = JSON.parse(r);
            return JSON.parse(r);
            console.log(r);
        } else {
            var error = new Error(xhr.statusText);
            error.code = xhr.status;

        }



    }
    static ipReader() {
        Http.get('//freegeoip.net/json/?callback=?', null, null, function (data) {
            var cutted = data.substring(2, data.length - 2)
            return JSON.parse(cutted, null, 2)

        }).then((res) => { IP = res.ip });
    }
    static ReadSettings(settingsFetcher) {
        var set = this.connection('/widget-settings.json');
        settingsFetcher(set)
    }

}
export { IP }
export { Settings }