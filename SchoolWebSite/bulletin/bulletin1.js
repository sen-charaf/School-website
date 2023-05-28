function ChangeButton() {
    let oldButton = document.getElementById("idsubmit");
    let newButton = document.getElementById("idPDF");
    oldButton.style.display = "none";
    newButton.style.display = "inline-block";
}

function CheckTable() {
    let InputZone;
    let elementId;
    let InputContent;
    for (let i = 1; i <= 8; i++) {
        elementId = "" + i;
        InputZone = document.getElementById(elementId);
        InputContent = InputZone.value;
        if (InputContent === "") {
            alert("Veuillez remplir toutes les cellules");
            return;
        } else if (isNaN(InputContent) || InputContent < 0 || InputContent > 20) {
            alert("Veuillez remplir les cellules correctement");
            return;
        } else
            continue;
    }
    ChangeButton();
    CalculNoteAvr();
    CalculTotalAvr();
}

function CalculTotalAvr() {
    let totalAvr = document.getElementById("noteMoyenne");
    let Somme = 0;
    let elemntId;
    for (let i = 9; i <= 12; i++) {
        elemntId = "" + i;
        Somme += parseFloat(document.getElementById(elemntId).textContent);
        console.log(Somme);
    }
    let Avr = Somme / 4
    totalAvr.textContent = Avr.toFixed(2)
}

function CalculNoteAvr() {
    let InputAvrZone;
    let elementAvrId;
    let elementId1;
    let elementId2;
    let InputContent1;
    let InputContent2;
    for (let i = 9, j = 1; i <= 12, j <= 8; i++, j += 2) {
        elementAvrId = "" + i;
        elementId1 = "" + j;
        elementId2 = "" + (parseInt(elementId1) + 1);
        console.log("ELEM 1: " + elementId1);
        console.log("ELEM 2: " + elementId2);
        InputAvrZone = document.getElementById(elementAvrId);
        InputContent1 = document.getElementById(elementId1).value;
        InputContent2 = document.getElementById(elementId2).value;
        InputAvrZone.textContent = (parseFloat(InputContent1) + parseFloat(InputContent2)) / 2;
    }
}