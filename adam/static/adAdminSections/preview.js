(function ($) {
    $.fn.changePreview = function(value){
        if (value == 3){
            $('#previewSidePanel').show()
            $('#previewResults').hide()
            $('#adDescription1').attr('maxlength','70')
            $('#adDescription2').attr('maxlength','70')
            var maxChars = 70
            var txt = $.trim($('#adDescription1').val())
            var res = maxChars - txt.length
            $('#countAdDescription2Span').text(res)
            
            
            var txt = $.trim($('#adDescription2').val())
            var res = maxChars - txt.length
            $('#countAdDescription1Span').text(res)
            
            
            $.fn.addFadeOutSpanHandler($('#adDescription1'),$('#adDescription1Span'),5,$('#countAdDescription1Span'),2);
            $.fn.addFadeOutSpanHandler($('#adDescription2'),$('#adDescription2Span'),5,$('#countAdDescription2Span'),3);
               
        }else{
            $('#previewSidePanel').hide()
            $('#previewResults').show()
            $('#adDescription1').attr('maxlength','35')
            $('#adDescription2').attr('maxlength','35')
            
            var maxChars = 35
            var txt = $.trim($('#adDescription1').val())
            var res = maxChars - txt.length
            
            if (res < 0){
                var txt = txt.substring(0,35)
                $('#adDescription1').val(txt)
                res = 0
            }
            
            
            
            $('#countAdDescription2Span').text(res)
            
            var txt = $.trim($('#adDescription2').val())
            var res = maxChars - txt.length
            
            if (res < 0){
                var txt = txt.substring(0,35)
                $('#adDescription2').val(txt)
                res = 0
            }
            

            $('#countAdDescription1Span').text(res)
            
            
            
            $.fn.addFadeOutSpanHandler($('#adDescription1'),$('#adDescription1Span'),1,$('#countAdDescription1Span'),2);
            $.fn.addFadeOutSpanHandler($('#adDescription2'),$('#adDescription2Span'),1,$('#countAdDescription2Span'),3);
       
            
        }
    }

    $.fn.makePreview = function(typeOfCampaign,dataFields,sign){
        console.log('PP-----------------------')
        var flag = 0
        if (typeOfCampaign < 3){
            flag = 2;
        }
        if (typeOfCampaign == 3){
            flag = 3;
        } 
        
        $('#previewDiv').append($.fn.buildPreviewTable(flag,dataFields,0,sign))
    }


    $.fn.buildPreviewTable = function(flag,dataFields,isDefault,sign){
        var i = 0
        var addon = []
        console.log('Typ',flag)
        if (sign == 1){
            var names = ['Reklama v postrannom panely','Reklama vo výsledkoch']
        }else{
            var names = ['Ad in side panel','Ad in results']
        }
        if (isDefault == 1){
            var L = [$.default_.title,$.default_.url,$.default_.description1,$.default_.description2]
        }else{
            var L = dataFields
        }
        addon[i++] = '<table id="previewTable" cellpadding="0" cellspacing="0" border="0" style="position:relative;font-size:12px;margin-top:25px">'
            if (flag != 2){
                if (flag == 3){
                    var display = 'block'
                }else{
                    var display = 'none'
                }
                addon[i++] = '<tr id = "previewSidePanel" style="display:'+display+'">'
                    addon[i++] = '<td>'
                        addon[i++] = '<div class="previewHeader">'
                            addon[i++] = names[0]
                        addon[i++] = '</div>'
                        addon[i++] = '<div class="previewContent" style="float:left">'
                            addon[i++] = '<div style="border-right: none !important;min-width: 160px;border:0px solid black;display:block">'
                                addon[i++]= '<ul class="preview">'
                                    addon[i++] = '<li class="preview">'
                                        addon[i++] = '<a class="preview">'
                                            addon[i++] = L[0]
                                        addon[i++] = '</a>'
                                    addon[i++] = '</li>'
                                    addon[i++] = '<li class="preview url">'
                                        addon[i++] = L[1]
                                    addon[i++] = '</li>'
                                    addon[i++] = '<li class="preview">'
                                        addon[i++] = '<span class="description1">'+L[2]+'</span>'
                                    addon[i++] = '</li>'
                                    addon[i++] = '<li class="preview">'
                                        addon[i++] = '<span class="description2">'+L[3]+'</span>'
                                    addon[i++] = '</li>'
                                addon[i++]= '</ul>'
                            addon[i++] = '</div>'
                        addon[i++] = '</div>'
                    addon[i++] = '</td>'
                addon[i++] = '</tr>'
            }
            if (flag != 3){
                if (flag == 2){
                    var display = 'block'
                }else{
                    var display = 'none'
                }
                addon[i++] = '<tr id="previewResults" style="display:'+display+'">'
                    addon[i++] = '<td>'
                        addon[i++] = '<div class="previewHeader">'
                            addon[i++] = names[1]
                        addon[i++] = '</div>'
                        addon[i++] = '<div class="previewContent" style="float:left">'
                            addon[i++] = '<div style="border-right: none !important;min-width: 200px;">'
                                addon[i++]= '<ul class="preview">'
                                    addon[i++] = '<li class="preview">'
                                        addon[i++] = '<a class="preview">'
                                            addon[i++] = ''+L[0]+' - '+L[2]+''
                                        addon[i++] = '</a>'
                                    addon[i++] = '</li>'
                                    addon[i++] = '<li class="preview url">'
                                        addon[i++] = L[1]
                                    addon[i++] = '</li>'
                                    addon[i++] = '<li class="preview">'
                                        addon[i++] = '<span class="description1">'+L[2]+'</span><span class="description2" style="padding-left:10px">'+L[3]+'</span>'
                                    addon[i++] = '</li>'

                                addon[i++]= '</ul>'
                            addon[i++] = '</div>'
                        addon[i++] = '</div>'
                    addon[i++] = '</td>'
                addon[i++] = '</tr>'
            }
        addon[i++] = '</table>'
        return addon.join('')

    }

})(jQuery);

