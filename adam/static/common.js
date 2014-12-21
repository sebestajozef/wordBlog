(function ($) {
    console.log('FFFFFFFFFFFFFFFFFFFFFFF')
    $.general = new Object();
    $.general.prefixReg = '/accounts'
    $.general.prefix = '/adam'

    $.general.token = $.cookie('csrftoken')
    $.general.errMsg = 'Toto pole nesmie zostať prázdne.'
    $.general.noResultsSK =  'Pre vybrané časové obdobie nie sú k dispozícii žiadne štatistické údaje'
    $.general.noResultsEN =  'No statistical data available for the given period'


    $.dom = new Object();
    $.dom.domains = ['hotmail.com', 'gmail.com', 'aol.com','zoznam.sk','azet.sk','centrum.sk'];
    $.dom.topLevelDomains = ["com", "net", "org","sk","cz"];


    $.fn.copyInputFieldValues = function(str,strHid){
        var selector = $('#'+str+'')
        var selectorHid = $('#'+strHid+'')
        
        if (selector.css('display') == 'inline-block'){
            console.log('awd')
            var value = ($.trim( selector.val()))
            selectorHid.val(value) 
        }
        if (selectorHid.css('display') == 'inline-block'){
            console.log('awdww')
            var value = ($.trim( selectorHid.val()))
            selector.val(value) 
        } 
    }




    $.fn.centerDiv = function(){ 
        var a = parseInt($('#authent').width())/2
        $('#authent').css('margin-left','-'+a+'px')
    }




    $.fn.countDecimals = function (value) {
        if(Math.floor(value) === value) return 0;
        return value.toString().split(".")[1].length || 0; 
    }

    $.fn.validateName = function(value){
        if ($.inArray(value,$.gen.adNamesList) == - 1){
            return 1
        }else{
            return 0
        }
    }

    $.fn.addCloseButtonHandler = function(){ 
        $('#close-btn').click(function(){
            $.fn.unlockBackground()
            
            
            
        })
    }


    $.fn.checkEquality = function(ok1,item1,ok2,item2,input,inputHid,errDiv){
        console.log('ok1',ok1,'ok2',ok2)
        if (ok1 == 1 && ok2 == 1 ){
            console.log('proslo1')
                 

            errDiv.text('')
            inputHid.removeClass('errBorder')
            input.removeClass('errBorder')
            if (item1 != item2){
                console.log('proslo2')  
                errDiv.append('Heslá sa nezhodujú')
                input.addClass('errBorder')
                inputHid.addClass('errBorder')
                flag = 1
            }
        }
      
    }

    $.fn.addPasswordFocusHandler = function(input,inputHid,span,errDiv){
        $.fn.addPasswordFocus(input,inputHid,span,errDiv)
        $.fn.addPasswordFocus(inputHid,input,span,errDiv)
        
    }

    $.fn.addPasswordFocus = function(input,inputHid,span,errDiv){
        input.focus(function(){
            $.fn.changeOpacity(0,span)
            errDiv.text('')

        })
        
        input.focusout(function(event){

            $.fn.changeOpacity(1,span)
            $.fn.checkPass(0,input,inputHid,errDiv)

            
        })
        

    }



    $.fn.addReturnHandler = function(){
        $('#return').click(function(){
            window.location.replace("http://localhost/py/hello.py");
        })
    }

    $.fn.lockBackground = function(num){
        $('#authent').children().remove()
        $("body").css("overflow", "hidden");
        if (num == 1){
            $('#root').children().remove()
        }
        $('#authent').addClass("z")
        $('#authent').css('display','block')
        $('#overlay').css('display','block')
    }

    $.fn.unlockBackground = function(){
        
        $('#authent').children().remove()
        $("body").css("overflow", "auto");
        $('#authent').removeClass("z")
        $('#authent').css('display','block')
        $('#overlay').css('display','none')
        $(".imgareaselect-selection").parent().remove();
        $(".imgareaselect-outer").remove(); 
    }

    $.fn.checkCaptcha = function(flag){
        var input = $('#id_captcha_1')
        value = $.trim(input.val())
        $('#errCaptcha').text('')
        input.removeClass('errBorder')
            
        if (value.length == 0){
            
            $('#errCaptcha').append('Toto pole nesmie zostať prázdne.')
            
            input.addClass('errBorder')
            flag = 1
        }else{
            if(/^[a-zA-Z0-9]{4}$/.test(value) == false){
                
                $('#errCaptcha').append('Pole musí obsahovať 4 znaky, a to len pismená a čislice.')
                    
                            
                
                input.addClass('errBorder')
                flag = 1
            }
        
        
        }
        return flag

    }
    $.fn.checkUsername = function(flag){
        var input = $('#id_username')
        var value = ($.trim( input.val().replace(/\s/g, ""))).length 
        $('#errUsername').text('')
        input.removeClass('errBorder')
        if (value < 3){
            
           
            if (value === 0){
                $('#errUsername').append('Toto pole nesmie zostať prázdne.')

                
                
                
                input.addClass('errBorder')
            }else{
                $('#errUsername').append('Pole musí obsahovať aspoň 3 znaky (medzery sa nepočítajú)')


                input.addClass('errBorder')
                
            }
            
            flag = 1
        
        }else{
            
            if (/^[A-Za-z0-9]+(?:[@. _-][A-Za-z0-9]+)*$/.test($.trim(input.val())) == false){
                $('#errUsername').append('Užívateľské meno môže obsahovat len pismená,číslice a znaky: /@/./ /_/-/,nie však 2 a viac razy po sebe alebo na začiatku resp. na konci mena.')
                
                input.addClass('errBorder')
                
                flag = 1
            }
                
            
            
        }
    }
    $.fn.changeOpacity = function(num,div){
        if (num == 0){
            div.animate({
                opacity: 0.4,
            })
        }else{
            div.animate({
                opacity: 1.0,
            })
        }
    }

    $.fn.checkPass = function(flag,input,inputHid,errDiv){

        var ok = 0
        if (input.css('display') != 'none'){
            var value = ($.trim( input.val())).length
            var req = 1
        }else{
            var value = ($.trim(inputHid.val())).length
            var req = 0
        }
        
        errDiv.text('')
        
        input.removeClass('errBorder')
        inputHid.removeClass('errBorder')
       
        if (value === 0){
            
            errDiv.append('Toto pole nesmie zostať prázdne.')
            input.addClass('errBorder')
            inputHid.addClass('errBorder')
            flag = 1
        }else{
            if (req == 1){
               var item = $.trim(input.val())
               
            }else{
               var item = $.trim(inputHid.val())
            }
            if(/[\S]{6,}/g.test(item) == false){
                var errMsg = 'Heslo musí obsahovať aspoň 6 znakov (bez medzier).'
                errDiv.append(errMsg)                   
                inputHid.addClass('errBorder')
                input.addClass('errBorder')
                flag = 1
            }else{
                var ok = 1
            }
        }
        return [flag,ok,item]
    }


    $.fn.buildCaptcha = function(cap){    
        var i = 0
        var addon = [] 
        addon[i++]= '<table id ="captcha" class="captcha" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:5px;position:relative;" >'
            addon[i++]= cap
        addon[i++]= '</table>'
        addon[i++]= '<div id ="errCaptcha" class="block err"></div>'
        $('#showCaptcha').append(addon.join(''))
        var i = 0
        var addon = []
        addon[i++] = '<td style="padding-left:40px" valign="middle">'
            addon[i++] = '<label id="captchaLabel">'
            addon[i++] = '</label>'
        addon[i++] = '<td>'
        $('#id_captcha_1').wrap(addon.join(''))
        $('#captchaLabel').append('<span id="captchaSpan" class="plac" style="cursor:text;left:108px;top:6px">Zadaj text</span>')
        var i = 0
        var addon = []
        addon[i++] = '<td valign="middle">'
            addon[i++] = '<div style="width:60px;height:30px">'
            addon[i++] = '</div>'
        addon[i++] = '</td>'
        $('#captchaImg').wrap(addon.join(''))
        var el = document.getElementById('id_captcha_1')
        el.setAttribute('style','width:90px');
        var i = 0
        var addon = []
        addon[i++] = '<td style="padding-left:10px;" valign="middle">'
            addon[i++] = '<div>'
                addon[i++] = '<img id="ref" src="/wordBlog/adam/static/images6.jpeg" width=20px height=20px style="cursor:pointer">'
            addon[i++] = '</div>'
        addon[i++] = '</td>'
        $('#captcha > tbody:last').find('tr:last').append(addon.join(''))
        $.fn.addCaptchaHandler()
        $.fn.addFadeOutSpanHandler($('#id_captcha_1'),$('#captchaSpan'))
        $('#id_captcha_1').focus(function(){
            $.fn.changeOpacity(0,$( "#captchaSpan" ))
            $('#errCaptcha').text('')
        })
        $('#id_captcha_1').focusout(function(){
            $.fn.changeOpacity(1,$( "#captchaSpan" ))
            $.fn.checkCaptcha(0)
        })
    }



    $.fn.getErrsCaptcha = function(data){
        var input = $('#id_captcha_1')
        $('#id_captcha_1').val('')
        input.removeClass('errBorder')
                                    
        $('#captchaImg').attr('src','/app/captcha/image/'+data.newCaptcha+'')
        $('#id_captcha_0').attr('value',data.newCaptcha)
        $('#errCaptcha').text('')
        if (data.errors.captcha){
            $('#errCaptcha').append('Znaky z obrázka sú nesprávne opísané.')
            input.addClass('errBorder')
            
        }
    }

    $.fn.getErrsUsername = function(data){
        var input = $('#id_username')
        $('#errUsername').text('')
        input.removeClass('errBorder') 
        if (data.errors.username){
            $('#errUsername').append("Zadané úžívateľské meno už existuje.")

            input.addClass('errBorder') 
        }
    }



    $.fn.more = function(num,selector,flag,next){

        if (flag == 0){
            add = ' post'
        }
        if (flag == 1){
            add = ' komentár'
        }
        if (flag == 2){
            add = ' oznam'
        }
        if (next == 0){
            var word = ' ďalši'
        }else{
            var word = ' predchádzajúci'
        }

        if (num != 0){
            
        
            m = num
            
            var s1 = ''
            var s2 = ''
            
            if (m > 1 && m < 5){
            
                s1 = 'e'
                if (flag == 0 || flag == 2){
                    s2 = 'y'
                }
                if (flag == 1){
                    s2 = 'e'
                }
                
            }
            if (m > 4){
                s1 = 'ch'
                s2 = 'ov'
            }
        
            
            selector.attr('value','Zobraziť'+word+s1+' '+m+add+s2+'')
            
            selector.css('display','block');
            
        }else{
            
            
            selector.css('display','none');
            
        }
    }
    $.fn.swapButtonStyles = function(selector,parent){
        selector.css('opacity','0.4')
        selector.css('cursor','default')
        parent.children().not(selector).css('opacity','1.0')
        parent.children().not(selector).css('cursor','pointer') 
    }


    $.fn.addCaptchaHandler = function(){    
        var i = 0
        var addon = []
        
        addon[i++] = "<form id='refCaptcha' action = '/app/accounts/refreshCaptcha/' method='post'>"
            addon[i++] = "<input style='display:none' name='csrfmiddlewaretoken' value='' id ='captchaInput'>"
        addon[i++] = "</form>"

        $('#captchaForm').append(addon.join(''))
        $('#ref').click(function(){
            

            $('#id_captcha_1').val('')
            $('#captchaInput').attr('value',$.cookie('csrftoken'))

            var frm = $('#refCaptcha')
           
            $.ajax({
                type: frm.attr('method'),
                url: frm.attr('action'),
                data: frm.serialize(),
                cache: false,
                beforeSend: function(){
                    
                },   
                success: function (msg) {
                    $('#captchaImg').attr('src','/app/captcha/image/'+msg+'')
                    $('#id_captcha_0').attr('value',msg)
                },
                error:function(msg){
                },
            })         
        })
    }

    $.fn.addPicture = function(flag,isPicture,username){
        if (flag == 1){
            var selector = $('#photo')
        }else{
            var selector = $('#profilePic')
        }
        if (isPicture == true ){
            selector.attr('src','/pics/'+username+'.jpg?'+Math.random()+'')
        }else{
            selector.attr('src','/pics/default.jpg')
        }
    }




    $.fn.buildLoggedUser = function(data){
        
        var i = 0
        var addon = []
        addon[i++] = "<div id='loggedInUser' style='width:408px;border:0px solid black;height:36px;margin-right:40px;position:relative'>"
            addon[i++] = "<table cellpadding='0' cellspacing='0' border='0' id='authU' style=';float:right;display:block;border:0px solid black' class='authU'>";
                addon[i++] = "<tr>"
                    addon[i++] = "<td style='border:0px solid black;text-align:right;padding-right:40px'>"
                        addon[i++] = "<div id='user' style='font-size:18px;cursor:default' >";
                            addon[i++] = ""+data.user+""
                        addon[i++] = "</div>"
                        addon[i++] = "<div style='font-size:11px'>"
                            addon[i++] = data.email
                        addon[i++] = "</div>"
                    addon[i++] = "</td>"
                    
                    addon[i++] = "<td>"
                        addon[i++] = "<div id = 'notifics' style='width:31px;height:31px;border:1px solid #cccccc;display:table;cursor:default'>"
                            addon[i++] = "<div id = 'numOfNotifs' style='display:table-cell;text-align: center;font-size:17px;line-height:31px;color:#888888;'>"
                                addon[i++] = '0'
                            addon[i++] = "</div>"
                        addon[i++] = "</div>"
                    addon[i++] = "</td>"
                    
                    addon[i++] = "<td>" 
                        addon[i++]= "<div id='myPhoto' style='display:inline-block;padding-right:0px;padding-left:50px;'>"
                            addon[i++]= "<img id = 'photo' src='' style='width:31px;height:31px;cursor:pointer;' class='photo'>"
                        addon[i++]= "</div>"
                    addon[i++] = "</td>"
                
                addon[i++] = "</tr>"
            addon[i++] = "</table>"
            addon[i++] = "<div id='root' class='' style='width:408px;display:none;border:0px solid red;position:absolute;top:36px;'>"
                
            addon[i++] = "</div>" 
            addon[i++] = "<form id ='checkForNumOfNotifsForm' action='/app/adam/checkForNumOfNotifs/' method='post'>"
                addon[i++] = "<input style='display:none' name='csrfmiddlewaretoken' value='' id ='checkForNumOfNotifsInput'>";
            addon[i++] = "</form>"
            addon[i++] = "<form id ='checkForNotifsForm' action='/app/adam/checkForNotifs/' method='post'>"
                addon[i++] = "<input style='display:none' name='csrfmiddlewaretoken' value='' id ='checkNotifsInput'>";
                addon[i++] = "<input style='display:none' name='fromNotif' value='0' id ='fromNotif'>";
            addon[i++] = "</form>"
            addon[i++] = "<form id ='delNotifsForm' action='/app/adam/delNotifs/' method='post'>"
                addon[i++] = "<input style='display:none' name='csrfmiddlewaretoken' value='' id ='delNotifsInput'>";
            addon[i++] = "</form>"
        addon[i++] = "</div>"


        $('#authen').children().remove()
        $('#authen').append(addon.join(''));

        $.fn.addPicture(1,data.isPicture,data.username)
        $.pic.isPicture = data.isPicture
        
        
        $('#photo').click(function(e){
            if ($('#profileDiv').length == 0){
                var i = 0
                var addon = []
                addon[i++] = '<div id="profileDiv" class="miniWin" style="position:absolute;right:0">'
                    
                    
                    addon[i++] = "<div class='arrow' style='margin-left:90px'>"
                    addon[i++] = "</div>"
                    
                    
                    addon[i++] = "<div id='profileOptions' class='profileOptions'>"
                    
                        addon[i++] = '<div id="miniWinContent" style="margin-top:10px;margin-left:10px;margin-right:10px;margin-bottom:10px;border:0px solid red;">'
                            addon[i++] = "<center>"
                                addon[i++] = "<table cellpadding='0' cellspacing='0' border='0'>"
                                    addon[i++] = "<tr>"
                                        addon[i++] = "<td>" 
                                            addon[i++] = "<div id='profilePicDiv' style='position:relative'>"
                                                addon[i++]= "<img id ='profilePic' src='' style='width:70px;height:70px;' class='photo'>"
                                                addon[i++]= "<span id='uploadImage' style='width:72px;position:absolute;top:65px;left:0px;background-color:#c5c5c5;color:white;text-align:center;font-size:11px;cursor:pointer;line-height:20px'>Zmeniť fotku</span>"
                                            addon[i++] = "</div>"
                                        addon[i++] = "</td>"
                                    addon[i++] = "</tr>"
                                addon[i++] = "</table>"
                            addon[i++] = "</center>"
                            addon[i++] = '<div id="miniWinButtonDiv" style="border:0px solid black;padding-top:10px;margin-top:25px;position:relative">'
                                addon[i++] = '<center><input id ="changePassword" type="button" class="s"  value="Zmeniť heslo" style="width:86px;display:block;font-size:12px"></center>'
                                
                                addon[i++] = '<center><input id ="lout" type="button" class="s"  value="Odhlásiť " style="display:block;width:86px;display:block;font-size:12px;margin-top:10px;text-align:center"></center>'
                                addon[i++] = '<center><div id ="delAccount" style="cursor:pointer;margin-top:10px;font-size:11px">Zrušiť účet</div></center>'
                                addon[i++] = '<center><div id ="ad" style="cursor:pointer;margin-top:10px;font-size:11px">Reklama</div></center>'
                                addon[i++] = '<center><div id ="search" style="cursor:pointer;margin-top:10px;font-size:11px">Hladaj</div></center>'
                                if (data.isStaff == 1){
                                    addon[i++] = '<center><div id ="admin" style="cursor:pointer;margin-top:10px;font-size:11px">Admin</div></center>'
                                }
                                addon[i++] = '<center><div id ="cbv" style="cursor:pointer;margin-top:10px;font-size:11px">cbv</div></center>'
                            addon[i++] = '</div>'
                            addon[i++] = "<form id ='adminForm' action='/app/adam/admin/' method='post'>"
                                addon[i++] = "<input style='display:none' name='csrfmiddlewaretoken' value='' id ='adminInput'>";
                            addon[i++] = "</form>"
                            addon[i++] = "<form id ='searchForm' action='/app/adam/search/' method='post'>"
                                addon[i++] = "<input style='display:none' name='csrfmiddlewaretoken' value='' id ='searchInput'>";
                            addon[i++] = "</form>"
                            addon[i++] = "<form id ='adForm' action='/app/adam/ad/' method='post'>"
                                addon[i++] = "<input style='display:none' name='csrfmiddlewaretoken' value='' id ='adInput'>";
                            addon[i++] = "</form>"
                            addon[i++] = "<form id ='delAccountForm' action='/app/accounts/delAccount/' method='post'>"
                                addon[i++] = "<input style='display:none' name='csrfmiddlewaretoken' value='' id ='delAccountInput'>";
                            addon[i++] = "</form>"
                            addon[i++] = "<form id ='cbvForm' action='/app/adam/cbv/' method='post'>"
                                addon[i++] = "<input style='display:none' name='csrfmiddlewaretoken' value='' id ='cbvInput'>";
                            addon[i++] = "</form>"  
                            
                            
                            
                        addon[i++] = '</div>'
                        
                    
                    addon[i++] = '</div>'
                    
                addon[i++] = '</div>'
                
                $('#root').children().remove()
                $('#root').append(addon.join(''))
                $('#changePassword').click(function(){
                    $.fn.lockBackground(1)
                    $('#authent').load('/app/accounts/password/change/',function(){$.fn.centerDiv()})
                })
                $('#uploadImage').click(function(){
                    $.fn.lockBackground(1)
                    $('#authent').load('/app/adam/uploadImage/',function(){$.fn.centerDiv()})
                    
                })
                
                $('#profileDiv').click(function(e){

                    e.stopPropagation()
                })
                $.fn.addPicture(2,$.pic.isPicture,data.username)
                
                
                $('#root').css('display','block')
                $('#lout').click(function(){
                    $('#authent').removeClass('z')
                    $('#authent').children().remove()
                        
                    $.get( "/app/accounts/logout/",{}, function( data ) {

                        
                        if (data=='OK'){
                            $.fn.buildAnonymUser()
                            var num = parseInt($('#stuff').attr('value'))
                            if (num != 0){
                                $('#stuff').load('/app/adam/openTopic/domain/'+num+'');
                            }
                        }
                        
                    
                    })
            
            
                })
                $('#closeBtnProfileDiv').click(function(){
                    $('#root').children().remove()
                })
                $('#settings').click(function(){
                    $('#settingsInput').attr('value',$.cookie('csrftoken'))

                    var frm = $('#settingsForm')
                    frm.submit()
                })
                
                $('#search').click(function(){
                    $('#searchInput').attr('value',$.cookie('csrftoken'))

                    var frm = $('#searchForm')
                    frm.submit()  
                })
                
                $('#admin').click(function(){
                    $('#adminInput').attr('value',$.cookie('csrftoken'))
                    var frm = $('#adminForm')
                    frm.submit() 
                })
                
                
                
                
                $('#ad').click(function(){
                    $('#adInput').attr('value',$.cookie('csrftoken'))

                    var frm = $('#adForm')
                    frm.submit()  
                })
                $('#cbv').click(function(){
                    $('#cbvInput').attr('value',$.cookie('csrftoken'))
                    $('#cbvForm').submit()
                })
                $('#delAccount').click(function(){
                    var r=confirm("Chceš skutočne zrušiť tento účet ?");
                    if (r==true){
                        $('#delAccountInput').attr('value',$.cookie('csrftoken'))

                        var frm = $('#delAccountForm')
                        $.ajax({
                            type: frm.attr('method'),
                            url: frm.attr('action'),
                            data: frm.serialize(),
                            cache: false,
                            beforeSend: function(){
                                
                            },   
                            success: function (msg) {
                                window.location.replace("http://localhost/py/hello.py");
                                
                            },
                            error:function(msg){
                            },
                        })
                    }
                })
            }else{
                $('#root').children().remove()
                $('#root').css('display','none')
            }
            
            
          e.stopPropagation()  
        })

        

        

        checkForNotifs()



    } 
    $.fn.buildAnonymUser = function(){
        var i = 0
        var addon = []
        addon[i++] = "<div id='authL' style='display:block;'>";
            addon[i++] = "Pre prispievanie alebo komentovanie prosím";
            addon[i++] = "<div id='lin' style='cursor:pointer'>";
                addon[i++] = "<u>prihláste sa</u>";
                addon[i++] = "<form method='post' action='/app/accounts/register/' id='reginForm'>"
                addon[i++] = "</form>"
            addon[i++] = "</div>";
            addon[i++] = "Ak tu nemáte vytvorený účet, prosím, "
            addon[i++] = "<div id='rin' style='cursor:pointer'>"
                addon[i++] = "<u>zaregistrujte sa</u>";
            addon[i++] = "</div>";
        addon[i++] = "</div>";
        $('#authen').children().remove()
        $('#authen').append(addon.join(''));
        $('#lin').click(function(){
            
            $.fn.lockBackground(0)
            
            $('#authent').load('/accounts/login',function(){$.fn.centerDiv()})
            
            
            
        
        })
        $('#rin').click(function(){
            $('#reginForm').submit()
        })
    }

    $.fn.addWhispToInputFieldHandler = function(idcko,word){
        $('#whisp_'+idcko+'').click(function(){
            $('#adKeyword').val(word)
            $("#whisperWords tr").remove();
        })
    }
})(jQuery);
