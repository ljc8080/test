var num = 10;
var timeid = null;
$(function () {
    $('#dyMobileButton').click(function () {
        var phone = $('#phone').val();
        var reg = /^1[3-9]\d{9}$/;
        if (!reg.test(phone)) {
            $(this).next().text('手机号码格式不正确');
            return;
        }
        //错误提示标签有文字，结束代码执行
        if($('#phone').next().text()!=''){
            
         }
        //验证发送频率
        //获取当前的时间到本地存储中比对
        var dt = new Date().getTime() / 1000
        dt = Math.trunc(dt);
        var lasttime = localStorage.getItem(phone + 'codetime');
        if (!lasttime) {
            //如果没有本地存储，就设置一个当前的时间
            localStorage.setItem(phone + 'codetime', dt);
        } else {
            //当前时间减去本地存储的时间大于规定的描述，那么就提示发送的太频繁
            if (dt - lasttime <= 5) {
                alert('你发送的太频繁');
                num = dt - lasttime
                //重新设置定时器倒计时的时间
                timeid = setInterval(fn, 1000)
                return;
            } else {
                //更新本地存储存储的时间为当前的时间
                localStorage.setItem(phone + 'codetime', dt)
            }
        }
        //设置定时器倒计时效果
        timeid = setInterval(fn, 1000)
        
        $.get("https://www.digou.ltd/home/code/send",
            { 'phone': phone,'moudle':'register' },
            function (data, textStatus, jqXHR) {
                console.log(data);
                if (data.code != 200) {
                    alert('发送失败，请重试');
                    return;
                }
                if (data.code != 10000) {
                    alert('发送失败，' + data.data.msg);
                }
            },
            "json"
        );
    })
    $('#reg_form').on('submit', function (e) {
        e.preventDefault();
        if($('#phone').next().text()!=''){
            return;
        }
        let phone = $('#phone').val();
        let code = $('#code').val();
        let password = $('#password').val();
        let repassword = $('#repassword').val();
        let validate = new Validate;
        if (!validate.code(code)) {
            alert('验证码格式不正确');
            return;
        } else if (!validate.password(password)) {
            alert('密码格式不正确');
            return;
        } else if (password !== repassword) {
            alert('两次密码输入的不一致');
            return;
        }
        $.ajax({
            type: "post",
            url: "https://www.digou.ltd/user/register",
            data: {
                'phone':phone,
                'code':code,
                'password':password,
                'repassword':repassword
            },
            //dataType: "json",
            success: function (response) {
                console.log(response);
                if(response.code!=200){
                    //alert(response.msg);
                }else{
                    location.href = 'https://www.digou.ltd/user/login';
                }
            }
        });
    })

    $('#phone').blur(function () {
        $('#phone').next().text('');
        var phone = $(this).val();
        let validate = new Validate;
        if (!validate.phone(phone)) {
            $('#phone').next().text('手机号格式不正确');
            return;
        }
        $.get("https://www.digou.ltd/user/is_reg", "phone="+phone,
            function (data, textStatus, jqXHR) {
                console.log(data)
                switch (data.code) {
                    case 200:
                        $('#phone').next().text('手机号格式正确');
                        break;
                    case 400:
                        $('#phone').next().text(data.msg);
                        break;
                    case 500:
                        $('#phone').next().text('系统异常');
                        break
                }
            },
            "json"
        );
    })
})
function fn() {
    if (num <= 1) {
        clearInterval(timeid);
        $('#dyMobileButton').prop('disabled', false).text('获取验证码');
    } else {
        $('#dyMobileButton').prop('disabled', 'true');
        num--;
        $('#dyMobileButton').text(num + '秒后继续获取');
    }
}