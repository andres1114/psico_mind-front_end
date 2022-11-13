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
        let trNode = $("<tr>").attr({"class": "clickeable"}).attr('data-user-id', matchingUserObject[x].data.username);
        let thNode = $("<th>").html("<img src=\"img/pngtree-user-mysterious-anonymous-account-vector-png-image_7997894.png\" height=\"40px\"/>");
        let tdNode = $('<td>').html(matchingUserObject[x].data.name + " (@" + matchingUserObject[x].data.username + ")");
        trNode.append([thNode,tdNode]);
        trNode.bind("click touchstart", function() {
            performSentimentAnalisys({
                userId: $(this).attr("data-user-id"),
                rrss: 'twitter',
                postLimitNumber: 10
            });
        });

        trNodeAray.push(trNode);
    }

    tbodyNode.append(trNodeAray);
}

function performSentimentAnalisys(args) {
    let runId = uniqId({
        prefix: "_run_"
    });
    $("#run-id-holder").val(runId);
    var Busquedausuario = new Object();

    Busquedausuario.checksumId = "";
    Busquedausuario.userId = args.userId;
    Busquedausuario.postLimitNumber = args.postLimitNumber;
    Busquedausuario.rrss = args.rrss;
    Busquedausuario.action = "findTweetsAndPerformSentimentAnalysis";
    Busquedausuario.runId = $("#run-id-holder").val();

    var objetoDeBusquedaJSON = JSON.stringify(Busquedausuario);

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

function uniqId(args) {
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Kankrelune (http://www.webfaktory.info/)
    // %        note 1: Uses an internal counter (in php_js global) to avoid collision
    // *     example 1: uniqid();
    // *     returns 1: 'a30285b160c14'
    // *     example 2: uniqid('foo');
    // *     returns 2: 'fooa30285b1cd361'
    // *     example 3: uniqid('bar', true);
    // *     returns 3: 'bara20285b23dfd1.31879087'

    var retId;
    var formatSeed = function(seed, reqWidth) {
        seed = parseInt(seed, 10).toString(16); // to hex str
        if (reqWidth < seed.length) { // so long we split
            return seed.slice(seed.length - reqWidth);
        }
        if (reqWidth > seed.length) { // so short we pad
            return Array(1 + (reqWidth - seed.length)).join('0') + seed;
        }
        return seed;
    };

    // BEGIN REDUNDANT
    if (!this.php_js) {
        this.php_js = {};
    }
    // END REDUNDANT
    if (!this.php_js.uniqidSeed) { // init seed with big random int
        this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
    }
    this.php_js.uniqidSeed++;

    if (typeof(args.prefix) !== "undefined") {
        retId = args.prefix; // start with prefix, add current milliseconds hex string
    } else {
        retId = "";
    }

    retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
    retId += formatSeed(this.php_js.uniqidSeed, 5); // add seed hex string
    if (typeof(args.addEntropy) !== "undefied") {
        if (args.addEntropy == true) {
            // for more entropy we add a float lower to 10
            retId += (Math.random() * 10).toFixed(8).toString();
        }
    }

    if (typeof(args.onFunctionDone) !== "undefined") {
        args.onFunctionDone();
    }

    return retId;
}