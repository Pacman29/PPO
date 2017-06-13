/**
 * Created by pacman29 on 13.06.17.
 */
(function () {
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function setCookie(name, value, options) {
        options = options || {};

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    let flag = false;
    function plugin(object) {
        if(flag) {
            return;
        }
        let div = document.createElement("div");
        div.setAttribute("class","background_plugin row");
        div.innerHTML=`<span>Фон: </span>
                       <input type="text" class="background_input">
                       <button class="background_button">Установить</button>`;
        document.getElementsByTagName("body")[0].appendChild(div);

        document.getElementsByClassName("background_button")[0].addEventListener("click",function () {
            let color = document.getElementsByClassName("background_input")[0].value;
            document.body.style.background = color;
            setCookie("back_color",color);
        }.bind(this));
        flag = true;
    }

    function clear(department) {
        if(!flag){
            return;
        }
        let del = document.getElementsByClassName("background_plugin")[0];
        del.parentNode.removeChild(del);
        flag = !flag;
    }
    document.plugin_back = {plugin: plugin, clear: clear};
}());