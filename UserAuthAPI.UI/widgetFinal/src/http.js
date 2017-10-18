export default class Http {
    static get(url, data, headers, parseMethod) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function() {
                if (this.status == 200) {
                    if(parseMethod)
                        {
                            resolve(parseMethod(this.response));
                        }
                        else{
                            resolve(JSON.parse(this.response));
                        }
                    
                } else {
                    var error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };
            xhr.onerror = function() {
                reject(new Error("Network Error"));
            };
            if(data){
                xhr.send(data)
            }
            else{
                xhr.send();
            }
            
        });

    }
    static post(url, data, headers) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            if (headers) {
                for (var key in headers) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
            xhr.onload = function() {
                if (this.status === 200) {
                    if(this.response){
                        resolve(JSON.parse(this.response));
                    }
                    resolve();
                    
                } else {
                    var error = new Error(this.statusText);
                    error.code = this.status;
                    console.error(this.status)
                    reject(error);
                }
            };
            xhr.onerror = function(error) {
                reject("Server error");
            };

            xhr.send(data);
        });

    }

}