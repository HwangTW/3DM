var mobilecheckmsg = '', startpn=0;function errormessage(id, msg) {if($(id)) {try{showInputTip();} catch (e) {}msg = !msg ? '' : msg;if($('tip_' + id)) {if(msg == 'succeed') {msg = '';$('tip_' + id).parentNode.className = $('tip_' + id).parentNode.className.replace(/ p_right/, '');$('tip_' + id).parentNode.className += ' p_right';} else if(msg !== '') {$('tip_' + id).parentNode.className = $('tip_' + id).parentNode.className.replace(/ p_right/, '');}}if($('chk_' + id)) {$('chk_' + id).innerHTML = msg;}$(id).className = $(id).className.replace(/ er/, '');$(id).className += !msg ? '' : ' er';}}function checkusermobile(id) {errormessage(id);var umobile = trim($(id).value);if($(id).parentNode.className.match(/ p_right/) && (umobile == lastemail)) {return;} else {lastmobile = umobile;}if(umobile.substring(0,1)=="0"){errormessage(id, '请将手机号第一位"0"去掉');return false;}if(!umobile.match(/^\d+$/)) {errormessage(id, '请输入正确的手机号');return;}var uareacode = trim($('uareacode').value);var x = new Ajax();$('tip_' + id).parentNode.className = $('tip_' + id).parentNode.className.replace(/ p_right/, '');x.get('https://bbs.3dmgame.com/forum.php?mod=ajax&inajax=yes&infloat=bindmobile&handlekey=bindmobile&ajaxmenu=1&action=checkeumobile&umobile=' + umobile+ '&uareacode=' + uareacode, function(s) {if(!s.match(/成功/) &&  !s.match(/succeed/)){if(s.match('已被注册')){mobilecheckmsg = "该手机已注册，请更换手机号";}else{mobilecheckmsg = "手机号码无效";}}else{mobilecheckmsg = "";}errormessage(id, s);});$('smssend').style.display="";}function sendsms(formhash){if(startpn==1){return false;}var id = "umobile";errormessage(id);if(mobilecheckmsg != "") {errormessage(id, mobilecheckmsg);return false;}var umobile = trim($(id).value);if(umobile.substring(0,1)=="0"){errormessage(id, '请将手机号第一位"0"去掉');return false;}if(!umobile.match(/^\d+$/)) {errormessage(id, '请输入正确的手机号');return;}var uareacode = trim($('uareacode').value);if(uareacode != "86"){alert('暂只支持中国大陆(86)区号');return false;}if(uareacode!="86" && !confirm('您选择发送的手机号是'+uareacode+'-'+umobile+'是否继续发送？')){return false;}startpn = 1;$('sms_bta').innerHTML = "正在发送中，请稍后...";var x = new Ajax();x.get('https://bbs.3dmgame.com/plugin.php?id=member_sms:send_sms&inajax=yes&infloat=bindmobile&handlekey=bindmobile&ajaxmenu=1&act=bindmobile&formhash='+formhash+'&umobile=' + umobile + '&uareacode=' + uareacode, function(s) {startpn=0;$('sms_bta').innerHTML = "点击获取手机验证码";errormessage(id, s);});}
