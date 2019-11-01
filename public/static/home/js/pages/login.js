
$(function () {
    $('input,textarea').placeholder();

    $('.sui-form').on('submit', function (e) {
        e.preventDefault();
        let loginname = $('[name=phone]').val();
        let password = $('[name=password]').val();
        var remlogin = Number($('[name = remlogin]').prop('checked'));
        let validate = new Validate();
        if (!(validate.phone(loginname) || validate.email(loginname) || validate.name(loginname))) {
            layer.msg('登录名称格式错误', { icon: 5 });
            return;
        } else if (!validate.password(password)) {
            layer.msg('密码格式错误', { icon: 5 });
            return;
        }
        $.ajax({
            type: "post",
            url: "https://www.digou.ltd/user/login",
            data: {
                loginname,
                password,
                remlogin
            },
            dataType: "json",
            success: function (response) {
                if (response.code == 200) {
                    console.log(response);
                    location.href = response.data;
                } else {
                    console.log(response);
                    layer.msg('用户名或密码错误', { icon: 5 });
                }
                console.log(response);
            },
            error: function (e, code) {
                layer.msg('发生未知错误', { icon: 5 });
            }
        });
    })
    $('#qq').on('click',function(e){
       location.href = 'https://www.digou.ltd/plugins/tencent/qq/example/oauth/index.php';
    })
    $('#zfb').on('click',function(e){
        location.href = 'https://www.digou.ltd/plugins/ali/zfb/index.php';
     })
})