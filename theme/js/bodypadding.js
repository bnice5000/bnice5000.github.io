$(document).ready(function(){
    $('body').css('padding-top', $('.navbar').height()+'px');
});

$(function() {
    setTimeout(delayedFragmentTargetOffset, 500);
});

// add scroll offset to fragment target (if there is one)
function delayedFragmentTargetOffset(){
    var offset = $(':target').offset();
    if(offset){
        var scrollto = offset.top - 95; // minus fixed header height
        $('html, body').animate({scrollTop:scrollto}, 0);
    }
}
