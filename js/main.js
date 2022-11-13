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
            showMatchingUsers({
                responseObject: objetoDeRespuestaJSON
            });
        },
        complete: function(){
            //
        }

    });
}

function showMatchingUsers(args) {
    let tableNode = $("#table-1");
    let tbodyNode = tableNode.find("tbody");

    tbodyNode.empty();
    let matchingUserObject;

    if (Array.isArray(args.responseObject.response.rrss.twitter.users)) {
        matchingUserObject = args.responseObject.response.rrss.twitter.users;
    } else {
        matchingUserObject = [];
        matchingUserObject.push(args.responseObject.response.rrss.twitter.users);
    }

    let trNodeAray = [];
    for (let x = 0; x < matchingUserObject.length; x++) {
        let trNode = $("<tr>").attr({"class": "clickeable"});
        let thNode = $("<th>").html("<img src=\"img/pngtree-user-mysterious-anonymous-account-vector-png-image_7997894.png\" height=\"40px\"/>");
        let tdNode = $(`<td data-user-id="${matchingUserObject[x].data.id}">`).html(matchingUserObject[x].data.name + " (@" + matchingUserObject[x].data.username + ")");
        trNode.append([thNode,tdNode]);
        trNodeAray.push(trNode);
    }

    tbodyNode.append(trNodeAray);
}
