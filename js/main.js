$(document).ready(main());

function main() {
    $('#form-1').bind("submit", function(event){
        event.preventDefault();
        event.stopImmediatePropagation();

        var texto = $('#search-input').val();
        buscar(texto, red= 'twitter');
    });
}

function buscar(texto,red){
    var objetoDeBusqueda = new Object();

    objetoDeBusqueda.checksumId = "";
    objetoDeBusqueda.action = "fetchMatchingUser";
    objetoDeBusqueda.rrssUserName = texto;
    objetoDeBusqueda.rrssList = new Array();
    objetoDeBusqueda.rrssList.push(red);

    var objetoDeBusquedaJSON = JSON.stringify(objetoDeBusqueda);

    $.ajax({
        contentType: "application/x-www-form-urlencoded",
        url: "php/main.php",
        type: "POST",
        data: objetoDeBusquedaJSON,
        dataType: "json",
        success: function(objetoDeRespuestaJSON){
            //
        },
        complete: function(){
            //
        }

    });
}
