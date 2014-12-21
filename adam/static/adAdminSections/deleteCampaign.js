(function ($) {
    $.fn.addDeleteCampaignHandler = function(idCampaign){ 

        $('#closeBtnCampaign'+idCampaign+'').click(function(){      
            $('#deleteCampaignInput'+idCampaign+'').attr('value',$.cookie('csrftoken'))
            var r = true
            if (r==true){
                var formRemove = $('#deleteCampaignForm'+idCampaign+'');
                $.ajax({
                    type: formRemove.attr('method'),
                    url: formRemove.attr('action'),
                    data: formRemove.serialize(),
                    cache: false,
                    beforeSend: function(){
                     
                        
                        
                    
                    },
                             
                    success: function (msg) {
                        if (msg == 1){
                            $('#campaign'+idCampaign+'').remove()
                            
                            for (var i = 0,len = $.gen.campaignsList.length; i < len;i++){
        
                                if ($.gen.campaignsList[i].idCampaign == idCampaign){
                                    $.gen.campaignsList.splice( $.inArray($.gen.campaignsList[i],$.gen.campaignsList), 1 );
                                    break
                                } 
                                        
                            }
                                                                 
                            var rowCount = $('#campaigns > tbody:last tr').length;
                            if (rowCount == 1){
                                
                                
                                $('#noCampaigns').show()
                                $('#campaignsList').hide()
                            }else{
                                var len = $.gen.campaignsList.length
                                $.fn.resetCamp(len)
                                $.fn.getCamp()
                                $.fn.checkNavigationPanelVisibility(len,'3','Camp')
                                $.fn.checkPagesNavigators(0)
                            }
                        
                        
                        
                            $('#succesfulCampaignDeletion').fadeIn()
                            setTimeout(function(){ $('#succesfulCampaignDeletion').fadeOut() }, 5000)        
                        }
                    },
                    error:function(){
                    },
                })
            }
            
            
            
            
        })
        

        
    }
})(jQuery);
