(function ($) {
    $.fn.checkStep = function(){
        if ($.gen.curPage == 1){
            return 1
            $.checked.AdName = 0
            
            if ($.fn.checkField($('#adName'),$('#errName'),3) == 1){
                $.checked.adName = 1
            }
            
            $.checked.adBudget = 0
            if ($.fn.checkField($('#adBudget'),$('#errBudget'),1) == 1){
                $.checked.adBudget = 1
            }
            if ($.checked.adName == 1 && $.checked.adBudget == 1){
            
            return 1
            
            }else{

                return 0
            }
                 
                      
            
        }
        if ($.gen.curPage == 2){
            return 1
            $.checked.adTitle = 0
            $.checked.adDescription1 = 0
            $.checked.adDescription2 = 0
            $.checked.adUrl1 = 0
            var checkFields = [$.checked.adTitle,$.checked.adDescription1,$.checked.adDescription2,$.checked.adUrl1]
            
            
            var inputFields = [$('#adTitle'),$('#adDescription1'),$('#adDescription2'),$('#adUrl1')]
            var errFields = [$('#errTitle'),$('#errDescription1'),$('#errDescription2'),$('#errUrl1')]
            
            var k = 0
            for (var i = 0,len = checkFields.length;i<len;i++){
                
                if ($.fn.checkField(inputFields[i],errFields[i],0) == 1){
                    checkFields[i] = 1;
                    k = k + 1
                    
                }
                
                
            }
            if ($.gen.flag == 1){
                k = k + 1
            }
            if (k == (checkFields.length + 1)){
                return 1
            }else{
                return 0
            }
        
        
        
        }
        
        if ($.gen.curPage == 3){
            return 1
            var value = $('#chosenWords tr').length;
            
            if (value > 1){
                $('#errKeyword').text('')
                return 1
            }else{
                $('#errKeyword').text('Je potrebné pridať aspoň 1 kľúčové slovo')
                return 0
            } 
            
        }
        if ($.gen.curPage == 4){
            return 1;
        }
        
    }
})(jQuery);
