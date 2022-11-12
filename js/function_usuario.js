function usuario(texto,red){
    var Busquedausuario = new Object();

    Busquedausuario.checksumId = "";
    Busquedausuario.UserName = texto;
    Busquedausuario.POSTLIMITNUMBER = int;

    var objetoDeBusquedaJSON = JSON.stringify(Busquedausuario);

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