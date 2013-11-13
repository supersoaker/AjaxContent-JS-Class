AjaxContent-JS-Class
====================

jQuery Plugin for easy contentchange


Mann muss jegliche Links, die statt eines normalen links nun mit ajax geladen werden sollen, mit dem Plugin aktivieren
 z.B.
  ```JavaScript
    $('#header-bottom a').each(function(){
        $(this).addAjaxContent({
            container : $('#index'),
            html : '<div id="notfound-container">\
                         <h1> 404 Seite nicht gefundenn ! </h1>\
                         </div>'
        });
    });
  ```
 ODER
  ```JavaScript
    $('#blub').addAjaxContent({
        container : $('#index'),
        link : 'http://localhost/ajax_contentchange/ajax/404',
        loadNew : true
    });
  ```
 Variablen:
    loadNew : ob bei jedem Klick auf dem Link ein neuer Ajax aufruf gemacht werden soll,
            oder der Content nur einmal per Ajax am Anfang geladen werden soll
    link        : der Link, an der Ajax-aufruf gestarten werden soll, beim weglassen,
            zieht sich das Plugin den Link aus dem a-tag
    html         : wenn kein Ajax aufruf gemacht werden soll, sondern nur der Inhalt dieser
            Variable ausgetauscht werden soll
