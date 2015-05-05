(function($) {

    $.fn.tableMobilize = function() {

        this.each( function() {
            var $arr_titles = [];
            $(this).find('thead tr').each(function(row_key, row){
                $(row).children().each(function(col_key, col){
                    $arr_titles.push( $(col).text() );
                });
            });
                
            $(this).find('tbody tr').each(function(row_key, row){
                $(row).children().each(function(col_key, col){
                    if( $arr_titles[col_key] ){
                        $(col).attr('data-title', $arr_titles[col_key]);
                    }
                });
            }); 
        });

    }

}(jQuery));