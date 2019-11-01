function Validate() {
    this.phone = function (phone) {
        var reg = /^1[3-9]\d{9}$/;
        if (!reg.test(phone)) {
            return false;
        } else {
            return true;
        }
    }
    this.email = function (email) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!reg.test(email)) {
            return false;
        } else {
            return true;
        }
    }
    this.code = function (code) {
        var reg = /^\d{4}$/;
        if (!reg.test(code)) {
            return false;
        } else {
            return true;
        }
    }
    this.password = function (password) {
        var reg = /^[a-zA-Z\d]{6,15}$/;
        if (!reg.test(password)) {
            return false;
        } else {
            return true;
        }
    }

    this.name = function (name) {
        var reg = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,13}$/;
        if (!reg.test(name)) {
            return false;
        } else {
            return true;
        }
    }

    this.codenum = function (phone, allow) {
        let dt = new Date();
        let now = dt.getTime() / 1000;
        //去除毫秒,取整
        now = Math.trunc(now);
        let lasttime = localStorage.getItem('code_time_' + phone);
        console.log(lasttime);
        if (!lasttime) {
            localStorage.setItem('code_time_' + phone, now);
            return true;
        } else {
            if (now - lasttime < allow) {
                console.log(now,lasttime,allow);
                return false;
            } else {
                localStorage.removeItem('code_time_' + phone);
                return true;
            }
        }
    }
}