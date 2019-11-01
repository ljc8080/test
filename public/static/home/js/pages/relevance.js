$(function () {
    $('input,textarea').placeholder();
    $('#reg_form').submit(function (e) {
        e.preventDefault();
        let phone = $('#phone').val();
        let username = $('#username').val();
        let email = $('#email').val();
        let vaildate = new Validate();
        if (!vaildate.phone(phone)) {
            layer.msg('手机号格式错误', { icon: 5 });
            return;
        } else if (username == '') {
            layer.msg('用户名不能为空', { icon: 5 });
            return;
        } else if (username.length > 10) {
            layer.msg('用户名过长', { icon: 5 });
            return;
        } else if (!vaildate.email(email)) {
            layer.msg('邮箱格式错误', { icon: 5 });
            return;
        }
        $.ajax({
            type: "post",
            url: "http://www.pyg.com/home/login/relevance",
            data: {
                'username': username,
                'phone': phone,
                'email': email,
            },
            dataType: "json",
            success: function (response) {
                if (response.code != 200) {
                    console.log(response);
                    layer.msg('关联失败', { icon: 5 });
                } else {
                    location.href = 'http://www.pyg.com';
                }
            },
            error: function (e, code) {
                console.log(e,code);
                layer.msg('发生未知错误', { icon: 5 });
            }
        });
    });
})