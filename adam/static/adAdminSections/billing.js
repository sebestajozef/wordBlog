

(function ($) {
    $.fn.buildBilling = function(billingInfoDic,billingInfoId){
        console.log('2',billingInfoDic)
        var i = 0
        var addon = []
        addon[i++] = '<div id="" class="block">'
            addon[i++] = '<div id="succesfulBillingInfoSave" style = "display:none" class="adNotif">'
                addon[i++] = 'Fakturačné údaje boli úspešne uložené !'
                addon[i++] = '<span style="color:#444">'
                    addon[i++] = ' Prejsť na <span class="tyrkys" id ="returnFromBillingInfoCompletion" style="color:blue;cursor:pointer;text-decoration: underline;">zoznam kampaní</span>'
                addon[i++] = '</span>'
            addon[i++] = '</div>'
        addon[i++] = '</div>'
        addon[i++] = '<div id="billingFields">'
            addon[i++] = '<form id="saveBillingInfoForm" action= "'+$.general.prefix+'/saveBillingInfo/" method="post">'
                addon[i++] = "<input style='display:none' name='csrfmiddlewaretoken' value='' id ='saveBillingInfoInput'>"
                addon[i++] = "<input style='display:none' name='billingInfoId' value='"+billingInfoId+"' id =''>"
                var textField = ['Meno a priezvisko (názov firmy)','Ulica','Mesto','PSČ','Telefón','Kontaktný email','IČ','DIČ']
                var idsCompany = ['companyName','companyStreet','companyTown','companyZIP','companyPhone','companyEmail','companyIC','companyDIC']
                $.gen.idsCompany = idsCompany
                var numero = textField.length
                for(var z = 0,len=numero;z<len;z++){
                    var k = 0
                    var str = []
                    var capitalizedIDs = $.fn.capitaliseFirstLetter(idsCompany[z])
            
            
                    
                    str[k++] = '<div style="position:relative;border:0px solid black" class="inpFSpace">'
                        str[k++] = '<div>'
                            str[k++] = '<input type = "text" name="'+idsCompany[z]+'" id="id_'+idsCompany[z]+'">'
                        str[k++] = '</div>'
                        str[k++] = '<span id="'+idsCompany[z]+'Span" class="plac" style="position:absolute;top:4px;left:8px">'
                            str[k++] = textField[z] + ' :'
                        str[k++] = '</span>'
                        str[k++] = "<div id ='err"+capitalizedIDs+"' class ='block err' style=''>"
                        str[k++] = "</div>"
                    str[k++] = '</div>'
                    addon[i++] = str.join('')
                }
            addon[i++] = '</form>'
        addon[i++] = '</div>'
        addon[i++] = '<div style="height:30px" class="inpFSpace">'
            addon[i++] = '<input id="saveBillingInfoButton" type="button" class="s" value="Uložiť" style="float:right;width:70px;cursor:default" disabled>'
        addon[i++] = '</div>'
        $('#menuBilling').children().remove()
        $('#menuBilling').append(addon.join(''))
        $.fn.addSaveBillingInfoHandler()
        $.fn.addReturnFromBillingInfoHandler()
        $.fn.addBillingInfoFieldsHandler(billingInfoDic)

    }

    $.fn.addBillingInfoFieldsHandler = function(billingInfoDic){
        console.log('1',billingInfoDic)
        var maxLength = [128,128,128,6,17,255,8,10]
        if (billingInfoDic != 0){
        
            var billingInfoDic = $.parseJSON(billingInfoDic)
            var billingInfoList = [billingInfoDic.name,billingInfoDic.street,billingInfoDic.town,billingInfoDic.zip,billingInfoDic.phone,billingInfoDic.email,billingInfoDic.ic,billingInfoDic.dic]
        }
        for(var z = 0,len=$.gen.idsCompany.length;z<len;z++){
            var selector = $('#id_'+$.gen.idsCompany[z]+'')
            var span = $('#'+$.gen.idsCompany[z]+'Span')
            var params = [0,0,0,4,5,6,7,8]
            $.fn.addFadeOutSpanHandler(selector,span)
            
            var capitalizedIDs = $.fn.capitaliseFirstLetter($.gen.idsCompany[z])
            
            
            $.fn.addFocusFieldsHandler(selector,params[z],$('#err'+capitalizedIDs+''))
            
            
            if (billingInfoDic != 0){
                console.log('val',billingInfoList[z])
                selector.val(billingInfoList[z])
                span.hide()
            }
            selector.attr('maxlength',maxLength[z])
            $.fn.enableBut('id_' + $.gen.idsCompany[z],$('#saveBillingInfoButton'))
            
            
        }
    }
})(jQuery);
