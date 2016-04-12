var DmAjaxLoader = function (elements, options) {

    "use strict";

    var _$elements = elements || null;
    var _options = options || {};
    var _params = options.params || {};

    var _XMLHttpFactories = [
        function () {return new XMLHttpRequest()},
        function () {return new ActiveXObject("Msxml2.XMLHTTP")},
        function () {return new ActiveXObject("Msxml3.XMLHTTP")},
        function () {return new ActiveXObject("Microsoft.XMLHTTP")}
    ];

    function _DmAjaxLoader() {
        _$elements = document.querySelectorAll(elements);
        if(_$elements.length > 0) {
            [].forEach.call(_$elements, function(element) {
                var source = _options.source || (element.getAttribute('data-source') || '');
                var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/
                if(urlPattern.test(source) === false) {
                    throw "Bad source dude!";
                }
                _execute(element, source);
            });
        } else {
            throw "We could't locate the elements";
        }
    }

    function _execute(element, source) {
        _sendRequest(
            source,
            _params,
            function(data) {
                _feedHTML(element, data);
            }
        );
    }

    function _sendRequest (url, postData, callback) {
        var xhr = _createXMLHTTPObject();
        if (!xhr) return;
        var method = _options.method === "POST" ? "POST" : "GET";
        xhr.open(method,url,true);
        xhr.setRequestHeader('User-Agent','XMLHTTP/1.0');
        var params = _params;
        if (_params !== {}) {
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            params = Object.keys(_params).map(function(k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
            }).join('&');
        }
        xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
        xhr.setRequestHeader("Access-Control-Allow-Origin","*");
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200 && xhr.status != 304) {
                console.log(xhr, xhr.status);
                return;
            }
            callback(xhr.response);
        }
        if (xhr.readyState == 4) return;
        xhr.send(params);
    }

    function _createXMLHTTPObject() {
        var xmlhttp = false;
        for (var i=0;i<_XMLHttpFactories.length;i++) {
            try {
                xmlhttp = _XMLHttpFactories[i]();
            }
            catch (e) {
                continue;
            }
            break;
        }
        return xmlhttp;
    }

    function _feedHTML(element, data) {
        element.innerHTML = data;
    }

    function _cleanHTML(element) {
        element.innerHTML = "";
    }

    function _destroy() {
        [].forEach.call(_$elements, function(element) {
            _cleanHTML(element);
        });
    }

    _DmAjaxLoader();

    return {
        destroy: _destroy 
    }

};