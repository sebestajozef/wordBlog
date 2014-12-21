(function ($) {
    $.fn.buildEditCampaignsForms = function(data){
        var i = 0
        var addon = []
        for (var key in data){
            if (data.hasOwnProperty(key)){
                addon[i++] = $.fn.buildFillCampaignForm(key,2)
            }
            
        }
        
        $('#fillCampaignContentForms').append(addon.join(''))
        
        
        return addon.join('')
    }



    $.fn.addEditCampaignClickHandlers = function(data){
        for (var key in data){
            if (data.hasOwnProperty(key)){
        
                $.fn.addEditCampaignHandler(key,data[key].name)
            }
        }
    }

    $.fn.buildCampaignsAdmin = function(data){

        var i = 0
        var addon = []
        addon[i++] = '<div id="remarkPlaceholder" style="height:20px">'
        addon[i++] = '</div>'
        addon[i++] = '<table id="userDetailTable" cellpadding="0" cellspacing="0" border="0" style=";position:relative;margin-top:25px">'
            addon[i++] = '<thead>'
                addon[i++] = '<tr>'
                    addon[i++] = '<th class="addWord">'
                        addon[i++] = '<div>'
                            addon[i++] = 'ID'
                        addon[i++] = '</div>'
                    addon[i++] = '</th>'
                    addon[i++] = '<th class="addWord">'
                        addon[i++] = '<div>'
                            addon[i++] = 'Name'
                        addon[i++] = '</div>'
                    addon[i++] = '</th>'
                    addon[i++] = '<th class="addWord">'
                        addon[i++] = '<div>'
                            addon[i++] = 'Status'
                        addon[i++] = '</div>'
                    addon[i++] = '</th>'
                    addon[i++] = '<th class="addWord" style="width:140px;text-align:left">'
                        addon[i++] = '<div>'
                            addon[i++] = 'Sum of days of duration'
                        addon[i++] = '</div>'
                    addon[i++] = '</th>'
                addon[i++] = '</tr>'
            addon[i++] = '</thead>'
            addon[i++] = '<tbody>'
            
            for (var key in data){
                if (data.hasOwnProperty(key)){
                    alert(key) 
                    addon[i++] = $.fn.buildCampaignRecordAdmin(key,data[key].name,data[key].status,data[key].timePeriod)     
                }
            }
            
            addon[i++] = '</tbody>'
        addon[i++] = '</table>'

        addon[i++] = '<div id="fillCampaignContentForms">'
        addon[i++] = '</div>'
        
        $('#menuCampaigns').children().remove()
        
        $('#menuCampaigns').append(addon.join(''))
        $.fn.buildEditCampaignsForms(data)
        $.fn.addEditCampaignClickHandlers(data)
     
    }

    $.fn.buildCampaignRecordAdmin = function(idCampaign,name,status,timePeriod){
        var i = 0
        var addon = []
        addon[i++] = '<tr>'
            addon[i++] = '<td class="addWord">'
                addon[i++] = '<div>'
                    addon[i++] = idCampaign
                addon[i++] = '</div>'
            addon[i++] = '</td>'
            addon[i++] = '<td class="addWord">'
                addon[i++] = '<div id="editCampaign'+idCampaign+'" style="cursor:pointer;opacity:0.8;text-decoration: underline;" class="tyrkys">'
                    addon[i++] = name
                addon[i++] = '</div>'
            addon[i++] = '</td>'
            if (status == 2){
                
                var color = '#A9F5A9'
             
            }
            if (status == 1){

                var color = '#D8D8D8'
            }
            if (status == 3){

                var color = '#F7BE81'
            }
            
            
            
            addon[i++] = '<td class="addWord" style="background-color:'+color+'">'   
                addon[i++] = '<div id="statusCampaign'+idCampaign+'" style="cursor:default" value="'+status+'">'
                    var statusText = $.fn.giveMeStatus(status)

                    addon[i++] = statusText
                addon[i++] = '</div>'
            addon[i++] = '</td>'
            addon[i++] = '<td class="addWord" style="text-align:center">'
                addon[i++] = '<div id="timePeriodCampaign'+idCampaign+'" value="'+timePeriod+'">'

                    addon[i++] = timePeriod
                addon[i++] = '</div>'
            addon[i++] = '</td>'
        addon[i++] = '</tr>'
        
        return addon.join('')
     
        
    }
})(jQuery);


