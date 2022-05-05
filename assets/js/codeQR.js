

//Récupération de l'élément <div id="displayqrcode"> qui va devoir afficher le qrcode
var displayqrcode = document.getElementById("displayqrcode");
//Récuperation de l'élément <input id="url" placeholder="URL"> qui va devoir donné la valeur de l'url
var url = document.getElementById("url");

var textqrdisplay = document.getElementsByTagName("h4");


function updateTextTitre() {
    var textTitre = document.getElementById("titretext");
    var textname = document.getElementById("textname").value;
    textTitre.innerText = textname;
}

//WIFI
//fonction permettant la creation d'un qrcode se connectant au wifi
function updateQRCode() {
    //Récupération de la valeur de l'element ssid
    var ssid = document.getElementById("ssid").value;
    console.log(ssid);
    //Récupération
    var pw = document.getElementById("password").value;
    //Récupération
    var enc = document.getElementById("enc").value;
    //Récupération
    var hidden = document.getElementById("hidden").checked;
    //Récupération
    var qrcode1 = document.getElementById("qrcode1");
    //creation de la connexion au wifi en implementant les éléments nécessaire
    var text =
        "WIFI:S:" + ssid + ";T:" + enc + ";P:" + pw + ";H:" + hidden + ";;";
    //Remplace le qrcode par le nouveau 
    qrcode1.replaceChild(showQRCode(text), qrcode1.lastChild);
    textqrdisplay[0].style.visibility = "";
}

//URL
/*
* fonction lancé au click sur le bouton de generation du qrcode
* elle doit vider l'emplacement du qrcode -> displayqrcode
* récupérer la valeur de l'éléments url
*/
function urlQrCodeGenerator() {
    var qrcode2 = document.getElementById("qrcode2");
    var valeururl = url.value;
    qrcode2.replaceChild(showQRCode(valeururl), qrcode2.lastChild);
    textqrdisplay[1].style.visibility = "";


}