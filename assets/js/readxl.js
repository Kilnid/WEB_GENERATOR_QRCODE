//file
var arrayofdivpdf = [];


input.addEventListener('change', jsonParseXL);
function jsonParseXL() {

    readXlsxFile(input.files[0]).then(function (data) {

        //initalisation d'un compteur
        let count = 0;
        //Récuperation de chaque éléments de data
        //data etant un array des lignes de l'excel
        data.forEach(element => {
            //verification que le compteur n'est pas lv0 & que element[44] est different de null
            //objectif : prendre que les éléments existant avec une adresse ip
            if (count > 0 && element[44] != null) {
                //Preparation à la Creation des qrcode
                //Récupération adresse ip & création url
                var valeururl = "https//:" + element[44] + ".com";
                //Récupération encryptage
                var enc = element[51];
                //Récupération ssid
                var ssid = element[52];
                //Récupération de etat (caché ou visible)
                var hidden = element[53];
                //Récupération mdp
                var pw = element[55];

                //creation de la connexion au wifi en implementant les éléments nécessaire
                var wifi =
                    "WIFI:S:" + ssid + ";T:" + enc + ";P:" + pw + ";H:" + hidden + ";;";


                //creation des div de format
                var newDivP = document.createElement("div");
                var newDivToPrint = document.createElement("div");
                var newDivblockname = document.createElement("div");
                var newDivblockqr = document.createElement("div");
                var newDivqrdisplaywifi = document.createElement("div");
                var newDivqrcode1 = document.createElement("div");
                var newDivqrdisplayurl = document.createElement("div");
                var newDivqrcode2 = document.createElement("div");




                //instanciation des id 
                newDivP.id = "divp" + count;
                newDivToPrint.id = "toprint";
                newDivblockname.id = "blockname";
                newDivblockqr.id = "blockqr";
                newDivqrdisplaywifi.id = "displaywifi";
                newDivqrcode1.id = "qrcode1";
                newDivqrdisplayurl.id = "displayurl";
                newDivqrcode2.id = "qrcode2";




                //injection de la div principale dans le code html
                var currentDiv = document.getElementById('div');
                document.body.insertBefore(newDivP, currentDiv);
                var qrcenter = document.getElementById("qrcenter")
                qrcenter.appendChild(newDivP);

                //mise en place de chaque div a sa postion
                newDivP.appendChild(newDivToPrint);
                newDivToPrint.appendChild(newDivblockname);
                newDivToPrint.appendChild(newDivblockqr);
                newDivblockqr.appendChild(newDivqrdisplaywifi);
                newDivblockqr.appendChild(newDivqrdisplayurl);
                newDivqrdisplaywifi.appendChild(newDivqrcode1);
                newDivqrdisplayurl.appendChild(newDivqrcode2);


                //Mise en place des qrcodes
                newDivqrcode1.appendChild(showQRCode(wifi));
                newDivqrcode2.appendChild(showQRCode(valeururl));


                //Ajout texte
                titleQR = document.createElement("h3");
                newDivblockname.appendChild(titleQR);
                titleQR.innerHTML += element[0];


                //Création du bouton
                var btn = document.createElement("BUTTON");             // Créer un élément <button>
                var textbtn = document.createTextNode("PDF/Imprimer");  // Créer un noeud textuel
                btn.appendChild(textbtn);                               // Ajouter le texte au bouton
                newDivP.appendChild(btn);
                btn.setAttribute("onClick", "imprimer('" + newDivP.id + "')")
                btn.id = "button";


                //ajout des div dans l'array
                arrayofdivpdf.push(newDivP.id)





            }
            count++;  //count+1
        });


    }, function (error) {
        console.error(error)
        // alert("Error while parsing Excel file. See console output for the error stack trace.")

        document.getElementById('error').style.display = 'block'
        document.getElementById('error').innerText = error.message
    })
}

//fonction qui permet d'imprimer/mettre en PDF toute les div contenant des QRCODES
function imprimertout() {
    arrayofdivpdf.forEach(element => {
        imprimer(element)
    });
}

//fonction qui permet d'imprimer/mettre en PDF  la div choisi uniquement
function imprimer(divName) {
    var printContents = document.getElementById(divName).innerHTML; //recuperation de la div
    var originalContents = document.body.innerHTML; //Recupère la page originalContents en entier
    document.body.innerHTML = printContents; //transforme la page en la div recupéré
    document.getElementById("button").style.visibility = "hidden";//cache le bouton dans la div
    window.print(); //propose l'impression/PDF de la page
    document.body.innerHTML = originalContents; // remet la page original en place
}