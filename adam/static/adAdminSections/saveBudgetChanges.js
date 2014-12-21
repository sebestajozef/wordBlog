(function ($) {
    $.fn.addSaveBudgetHandler = function(idCampaign){
        $("#saveBudget").click(function(){
            
            var value = $.trim($('#adBudget').val())
            $('#budget'+idCampaign+'').attr('value',value)
            $('#saveBudgetChangesInput'+idCampaign+'').attr('value',$.cookie('csrftoken'))
            var frm = $("#saveBudgetChangesForm"+idCampaign+"")
            $.ajax({
                type: frm.attr('method'),
                url: frm.attr('action'),
                data: frm.serialize(),
                cache: false,
                beforeSend: function(){
                   
                    if ($.fn.checkField($('#adBudget'),$('#errBudget'),1) == 0){
                        $('#saveBudget').prop('disabled',true)
                        $('#saveBudget').css('cursor','default')
                        return false
                    }
                    
                    
                
                },
                         
                success: function (msg) {
               
                },
                error:function(msg){
                },
        
        
            }).done(function(){
                $('#saveBudget').prop('disabled',true)
                $('#saveBudget').css('cursor','default')
            })

        })
    }
})(jQuery);
