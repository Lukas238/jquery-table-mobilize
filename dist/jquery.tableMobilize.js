/*!
 * jquery-table-mobilizer
 * Adds responsive view to HTML tables automatically.
 * @URL https://github.com/Lukas238/jquery-table-mobilize.git
 * @author Lucas Dasso
 * @version 1.0.0
 * Copyright 2015. ISC licensed.
 */
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

    };

}(jQuery));