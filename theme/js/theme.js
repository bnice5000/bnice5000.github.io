// Highlight.JS
hljs.initHighlightingOnLoad();
document.querySelectorAll('code.lang').forEach((block) => {
  hljs.highlightBlock(block);
});

// Start Theme Specific Javascript for dealing with PyMDownX HTML

//Generic function for changing element type
(function($) {
    $.fn.changeElementType = function(newType) {
      if (this.length){
        var attrs = {};

        $.each(this[0].attributes, function(idx, attr) {
            attrs[attr.nodeName] = attr.nodeValue;
        });

        this.replaceWith(function() {
            return $("<" + newType + "/>", attrs).append($(this).contents());
        });
      }
    };
})(jQuery);

// Straight Forward Class Adds
$( "div.admonition" ).addClass( "alert" );
$( "dl" ).addClass( "card border-secondary mb-3" );
$( "dt" ).addClass( "card-header" );
$( "dd" ).addClass( "card-body" );
$( "blockquote" ).addClass( "blockquote text-justify me-5" );
$( "table" ).addClass( "table table-hover table-striped" );
$( "thead" ).addClass( "thead-light" );
$( "th[align=center]" ).addClass( "text-center" );
$( "th[align=right]" ).addClass( "text-right" );
$( "del.critic" ).addClass( "text-warning" );
$( "ins.critic" ).addClass( "text-success" );
$( "span.critic.comment" ).addClass( "text-info" );
$( "details" ).addClass( "my-1" );
$( "details>p" ).addClass( "card-body card-text" );
$( "details.note" ).addClass( "card text-white bg-secondary" );
$( "details.danger" ).addClass( "card text-white bg-danger" );
$( "details.success" ).addClass( "card text-white bg-success" );
$( "details.warning" ).addClass( "card text-white bg-warning" );
$( "details>details" ).addClass( "me-1" );
$( "img" ).addClass( "img-fluid" );
$( "figure" ).addClass( "figure" );
$( "figure>img" ).addClass( "figure-img rounded" );
$( "figure>figcaption" ).addClass( "figure-caption" );


// Stripped and Animated Progress Bar
$( "div.progress-bar-striped" ).children( "div" ).addClass( "progress-bar-striped" ).parent( "div" ).removeClass( "progress-bar-striped" );
$( "div.progress-bar-animated" ).children( "div" ).addClass( "progress-bar-animated" ).parent( "div" ).removeClass( "progress-bar-animated" );

// Tabs
let tabName = new Set();
$( "div.tabbed-set" ).addClass( "nav nav-tabs" ).changeElementType( "ul" );
$( "ul.tabbed-set>input" ).each(function() {
  var val = $(this).attr("name");
  $(this).next("label").addClass(val);
});
$( "ul.tabbed-set>input[type=radio]" ).remove();
$( "ul.tabbed-set>label" ).wrap( "<li class=\"nav-item\"></li>" );
$( "ul.tabbed-set>li>label" ).each(function(){
  $(this).changeElementType( "a" );
});
$( "ul.tabbed-set>li>a" ).each(function() {
  let val = $(this).text().replace(/ /g, '_');
  let serial = $(this).attr("class");
  $(this).attr("href", "#" + val).attr("data-toggle", "tab").removeAttr("for").addClass( serial + " nav-link" );
  $(this).parent().addClass(serial);
  $(this).parent().next(this).attr("id", val).addClass( serial );
  tabName.add(serial);
});
for (items of tabName) {
  $( `ul.tabbed-set>div.${items}`).wrapAll(`<div id=\"${items}\" class=\"tab-content\"></div>`);
};
$( "div.tab-content").each(function() {
    $(this).parent().after(this);
});
$( "div.tabbed-content" ).removeClass("tabbed-content").addClass("tab-pane fade");
$( "ul.tabbed-set>li:first>a" ).addClass("active");
$( "ul.tabbed-set>li>a" ).addClass("text-primary");
$( "div.tab-content>div.tab-pane:first").addClass("show active");

// Tasklists
$("li.task-list-item>input:checkbox").click(function() { return false; });
