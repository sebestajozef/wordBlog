(function ($) {
    $.fn.sortKeywords = function(){
        $('.keyw').sortElements(function(a, b){
            return $(a).find('.keywName').text() > $(b).find('.keywName').text() ? 1 : -1;
        });
    }

    $.fn.addWordButHandler = function(){
        $('#addWordBut').click(function(){
           
            
            var value = $.trim($('#adKeyword').val())
            $('#wordForPricing').attr('value',value)
            $('#pricingInput').attr('value',$.cookie('csrftoken'))
            var frm = $('#pricingForm');
            $.ajax({
                type: frm.attr('method'),
                url: frm.attr('action'),
                data: frm.serialize(),
                cache: false,
                beforeSend: function(){
                    $('#errKeyword').text('')
                    if ($.fn.checkKeywordDuplicity(value) == 0){
                        $('#errKeyword').text('Dané slovo sa už v kľúčových slovách nachádza')
                        return false;
                    }


                },
                
                
                
                         
                success: function (msg) {
                    
                    
                    $('#saveKeywords').prop('disabled',false)
                    $('#saveKeywords').css('cursor','pointer')
                    var data = $.parseJSON(msg);
                    if (data.isWord == 1){
                        
                        $.fn.buildKeyword(data.idWord,value,data.cpm,data.cpc,2,1)
                        
                        $.fn.sortKeywords()

                        
                        
                    }else{
                        var j = 0
                        
                        var addon = []
                        if (data.isSuggestion == 1){
                            
                            $('#errKeyword').text('Dané slovo sa v databázi nenachádza')
                            $('#possibleSuggestions').children().remove()
                            for(var k = 0,len=data.suggestions.length; k<len; k++){
                                if ($('#keyword_'+data.suggestions[k].id+'').length == 0){
                                    
                                    var m = 0
                                    var str = []
                                    str[m++] = '<div id="suggestion_'+data.suggestions[k].id+'" value="'+data.suggestions[k].id+'">'
                                        str[m++] = '<div id="nameSuggestion_'+data.suggestions[k].id+'" style="display:inline-block;cursor:pointer">'
                                            str[m++] = data.suggestions[k].name
                                        str[m++] = '</div>'
                                        str[m++] = '<div id="cpmSuggestion_'+data.suggestions[k].id+'" style="display:none">'
                                            str[m++] = data.suggestions[k].cpm
                                        str[m++] = '</div>'
                                        str[m++] = '<div id="cpcSuggestion_'+data.suggestions[k].id+'" style="display:none">'
                                            str[m++] = data.suggestions[k].cpc
                                        str[m++] = '</div>'
                                    str[m++] = '</div>'
                                    $('#possibleSuggestions').append(str.join(''))
                                    
                                    $.fn.addBuildKeywordHandler(data.suggestions[k].id,data.suggestions[k].name,data.suggestions[k].cpm,data.suggestions[k].cpc,1)
                                }
                                
                            }
                        }else{
                            
                            $('#errKeyword').text('Dané slovo sa v databázi nenachádza a nie sú k nemu ani žiadne podobné slová')
                        }
                    }

                },
                error: function (msg) {
                },
            }).done(function(){
                $('#adKeyword').val('')
                $('#adKeywordSpan').show()
                $('#countAdKeywordSpan').text(35)
                $('#addWordBut').prop('disabled',true)
                $('#addWordBut').css('cursor','default')
                
            })
            
        })
    }

    $.fn.addBuildKeywordHandler = function(id,name,cpm,cpc,flag){
        $('#nameSuggestion_'+id+'').click(function(){
            $.fn.buildKeyword(id,name,cpm,cpc,flag,1)
            $('#suggestion_'+id+'').remove()
            $.fn.sortKeywords()
        
        })
    }
})(jQuery);
