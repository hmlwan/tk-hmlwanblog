"use strict";function getTuzki(e){e=$(e).siblings(".b-tuzki");if(tuzkiNumber){e.show();for(var t=["Kiss","Love","Yeah","啊！","背扭","顶","抖胸","88","汗","瞌睡","鲁拉","拍砖","揉脸","生日快乐","摊手","睡觉","瘫坐","无聊","星星闪","旋转","也不行","郁闷","正Music","抓墙","撞墙至死","歪头","戳眼","飘过","互相拍砖","砍死你","扔桌子","少林寺","什么？","转头","我爱牛奶","我踢","摇晃","晕厥","在笼子里","震荡"],a="",l=1;l<41;l++){var i=formatNum(l,4);a+='<img src="http://'+window.location.host+"/Public/emote/tuzki/t_"+i+'.gif" title="'+t[l-1]+'" alt="白俊遥博客">'}e.html(a),tuzkiNumber=0}else e.hide(),tuzkiNumber=1}function formatNum(e,t){for(var a="",l=1;l<=t-e.toString().length;l++)a+="0";return a+e}function insertHtmlAtCaret(e){var t,a;if(window.getSelection){if((t=window.getSelection()).getRangeAt&&t.rangeCount){(a=t.getRangeAt(0)).deleteContents();var l=document.createElement("div");l.innerHTML=e;for(var i,s,n=document.createDocumentFragment();i=l.firstChild;)s=n.appendChild(i);a.insertNode(n),s&&((a=a.cloneRange()).setStartAfter(s),a.collapse(!0),t.removeAllRanges(),t.addRange(a))}}else document.selection&&"Control"!=document.selection.type&&document.selection.createRange().pasteHTML(e)}function comment(r){$.post(check_login,function(e){var n,o,c;1==e?""!=(n=$(r).parents(".b-box-textarea").eq(0).find(".b-box-content").html())&&"请先登录后发表评论"!=n&&(o=$(r).attr("aid"),c=$(r).attr("pid"),e=$(r).parents(".b-box-textarea").eq(0).find("input[name='email']").val(),e={aid:o,pid:c,content:n,email:e},layer.load(1),$.post(ajaxCommentUrl,e,function(e){var t,a=e,l=$(r).attr("username"),i=new Date,s=i.getFullYear()+"-"+(i.getMonth()+1<10?"0":"")+(i.getMonth()+1)+"-"+(i.getDate()<10?"0":"")+i.getDate()+"&emsp;"+(i.getHours()<10?"0":"")+i.getHours()+":"+(i.getMinutes()<10?"0":"")+i.getMinutes()+":"+(i.getSeconds()<10?"0":"")+i.getSeconds(),e=$("#b-login-word .b-head_img").attr("src"),i=$("#b-login-word .b-nickname").text();0==c?(t='<div class="row b-user b-parent"><div class="col-xs-2 col-sm-1 col-md-1 col-lg-1 b-pic-col"><img title="白俊遥博客" alt="白俊遥博客" src="'+e+'" class="b-user-pic"></div><div class="col-xs-10 col-sm-11 col-md-11 col-lg-11 b-content-col"><p class="b-content"><span class="b-user-name">'+i+"</span>："+n+'</p><p class="b-date">'+s+' <a onclick="reply(this)" username="'+i+'" pid="'+a+'" aid="'+o+'" href="javascript:;">回复</a></p><div class="b-clear-float"></div></div></div>',$(".b-user-comment").prepend(t)):(t='<div class="row b-user b-child"><div class="col-xs-2 col-sm-1 col-md-1 col-lg-1 b-pic-col"><img title="白俊遥博客" alt="白俊遥博客" src="'+e+'" class="b-user-pic"></div><ul class="col-xs-10 col-sm-11 col-md-11 col-lg-11 b-content-col"><li class="b-content"><span class="b-reply-name">'+i+'</span><span class="b-reply">回复</span><span class="b-user-name">'+l+"</span>："+n+'</li><li class="b-date">'+s+' <a onclick="reply(this)" pid="'+a+'" aid="'+o+'" username="'+l+'" href="javascript:;">回复</a></li><li class="b-clear-float"></li></ul></div>',$(r).parents(".b-content-col").eq(0).append(t),$(r).parents(".b-box-textarea").eq(0).remove()),$(r).parents(".b-box-textarea").eq(0).find(".b-box-content").html(""),layer.closeAll()})):$("#b-modal-login").modal("show")})}function reply(e){var t=$(".b-user-comment").find(".b-box-textarea");1==t.length&&t.remove();var a=$(e).attr("aid"),l=$(e).attr("pid"),t=$(e).attr("username"),t='<div class="b-box-textarea"><div class="b-box-content" contenteditable="true" onfocus="delete_hint(this)">请先登录后回复评论</div><ul class="b-emote-submit"><li class="b-emote"><i class="fa fa-smile-o" onclick="getTuzki(this)"></i><input class="form-control b-email" type="text" name="email" placeholder="接收回复的email地址" value="'+userEmail+'"><div class="b-tuzki"></div></li><li class="b-submit-button"><input type="button" value="评 论" aid="'+a+'" pid="'+l+'" username="'+t+'" onclick="comment(this)"></li><li class="b-clear-float"></li></ul></div>';$(e).parents(".b-cc-first").eq(0).append(t)}function delete_hint(e){var t=$(e).text();"请先登录后发表评论"!=t&&"请先登录后回复评论"!=t||($(e).text(""),$(e).css("color","#333"))}$("html").on("click",".b-tuzki img",function(e){var t=$(this).prop("outerHTML");$(this).parents(".b-box-textarea").eq(0).find(".b-box-content").focus(),insertHtmlAtCaret(t),$(this).parents(".b-tuzki").hide(),tuzkiNumber=1});