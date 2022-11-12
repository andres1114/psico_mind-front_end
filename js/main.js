function buscar(texto,red){
    var objetoDeBusqueda = new Object();

    objetoDeBusqueda.checksumId = "";
    objetoDeBusqueda.rrssUserName = texto;
    objetoDeBusqueda.rrssList = new Array();
    objetoDeBusqueda.rrssList.push(red)

    var objetoDeBusquedaJSON = JSON.stringify(objetoDeBusqueda);

    $.ajax({
        contentType: "application/x-www-form-urlencoded",
        url: "php/archivo_de_busqueda.php",
        type: "POST",
        data: objetoDeBusquedaJSON,
        dataType: "json",
        success: function(objetoDeBusquedaJSON){

        },
        complete: function(){

        }

    });
}
$('#button-1').bind("click", function(){
    var texto = $('#search-input').val();
    buscar(texto, red= 'twitter')
});