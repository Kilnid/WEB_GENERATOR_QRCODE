//URL

//Valeur de l'URL a mettre en QRCODE

var displayqrcode = document.getElementById("displayqrcode");
var url = document.getElementById("url");
function urlQrCodeGenerator() {
    displayqrcode.innerHTML = "";
    var valeururl = url.value;
    new QRCode(displayqrcode, valeururl);
    console.log(url);
}




//WIFI

function wifiQrCodeGenerator() {
    function updateQRCode() {
        var ssid = document.getElementById("ssid").value;
        var pw = document.getElementById("password").value;
        var enc = document.getElementById("enc").value;
        var hidden = document.getElementById("hidden").checked;
        var qrcode = document.getElementById("qrcode");

        var text =
            "WIFI:S:" + ssid + ";T:" + enc + ";P:" + pw + ";H:" + hidden + ";;";

        qrcode.replaceChild(showQRCode(text), qrcode.lastChild);
    }

    document.getElementById("form").onchange = updateQRCode;
}