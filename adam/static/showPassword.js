/*
 * jQuery Show Password Plugin
 * http://github.com/davist11/jQuery-Show-Password
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 0.3
 *
 * Example usage:
 * $(':password').showPassword({
 *   linkClass: 'show-password-link',
 *   linkText: 'Show',
 *   showPasswordLinkText: 'Hide',
 *   showPasswordInputClass: 'password-showing',
 *   linkRightOffset: 0,
 *   linkTopOffset: 0
 * });
 */
;(function($) {
// Add button to show password in input field
$.fn.showPassword = function(options) {
  var opts = $.extend({}, $.fn.showPassword.defaults, options);

  return this.each(function() {
    var $this = $(this),
        $parent = $this.parent(),
        parentHeight = $parent.height();
        

    // Support for the Metadata Plugin.
    var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
    
    //$parent.height(parentHeight);
    
        //Create the input to switch
    $('<input/>', {
      'class': o.showPasswordInputClass,
      css: {
        display: 'none',

      },
      type: 'text',
      id: o.idInput,
    }).prependTo($parent);
    
    
  
    //Create the link
    $('<a/>', {
      href: '#',
      'class': o.linkClass,
      'id':o.hrefId,
      click: function(e) {
        var $showPassInput = $parent.find('.'+o.showPasswordInputClass);
        if($this.css('display') === 'none') { //If the regular input is hidden, show it
          $(this).text(o.linkText);
          $this.val($showPassInput.val()).show();
          //$this.focus()
          $showPassInput.hide();
          
        } else { //If the showing password input is hidden, show it
          $(this).text(o.showPasswordLinkText);
          $showPassInput.val($this.val()).show();
          //$showPassInput.focus()
          $this.hide();
          
        }
        //e.preventDefault();

      },
      css: {

      },
      text: o.linkText
    //}).appendTo($parent);
    }).appendTo($('#'+o.appTo+''));
    

    

    
    //When form is submitted and password is hidden, update the password val
    $this.closest('form').bind('submit', function() {
      if($this.css('display') === 'none') {
        $this.val($this.siblings('.'+o.showPasswordInputClass).val());
      }
    });
    
  });
};

// default options
$.fn.showPassword.defaults = {
  appTo: 'showP',
  linkClass: 'show-password-link',
  linkText: 'Show',
  showPasswordLinkText: 'Hide',
  showPasswordInputClass: 'password-showing',
  idInput: 'idP',
  hrefId:'hrefId',
};

})(jQuery);
