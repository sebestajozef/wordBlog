(function ($) {
    $.fn.addSelectSuccRateHandler = function(num){
        var names = ['Stat','Over','CPCs']
        $('select[class="selectSuccRate'+names[num]+'"]').on('change',function(){
            $.fn.getResults(num)
        })
    }
})(jQuery);
