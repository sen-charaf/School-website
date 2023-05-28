var doc = new jsPDF();
var paperWidth = 210;
var paperHeight = 297;
var username = localStorage.getItem("username");
var email = localStorage.getItem("email");
document.getElementById("username").innerHTML = '@' + username;
function GeneratePDF() {
    /-------------------------------PRINTING USER INFOS------------------------------------------/
    doc.text(`Username: ${username}`, paperWidth / 8, paperHeight / 8, {
        font: "helvetica",
        fontStyle: "bold",
        fontSize: 25
    });
    doc.text(`Email: ${email}`, paperWidth / 8, paperHeight / 8 + 10, {
        font: "helvetica",
        fontStyle: "bold",
        fontSize: 25
    });
    /*-------------------------------INSERTING THE TABLE-------------------------- */
    let x_rect = paperWidth / 8;
    let y_rect = paperHeight / 5;
    let CellW = 40;
    let CellheadH = 10;
    let CellH = 20
    doc.setLineWidth(0.6);
    InsertHeaderRows(x_rect, y_rect, 4, CellW, CellheadH);
    y_rect += CellheadH;
    InsertHeaderColms(x_rect, y_rect, 4, CellW, CellH);
    doc.setLineWidth(0.4);
    x_rect += CellW;
    InsertTable(x_rect, y_rect, 2, 8, CellW, CellheadH);
    x_rect = paperWidth / 8;
    y_rect = paperHeight / 5;

    x_rect += CellW * 3;
    y_rect += CellheadH;
    InsertTable(x_rect, y_rect, 1, 4, CellW, CellH);
    /-------------------------------INSERTING THE TABLE CONTENT--------------------------------------------------/
    x_rect = paperWidth / 8;
    y_rect = paperHeight / 5;
    let RowText = ["Mod", "Elements", "Note", "Note.M"];
    for (let i = 0; i < RowText.length; i++) {
        InsertTextCell(RowText[i], x_rect, y_rect, CellW, CellheadH, "center", 15, "bold");
        x_rect += CellW;
    }
    /******************************/
    x_rect = paperWidth / 8;
    y_rect += CellheadH;
    let ModText = ["M1", "M2", "M3", "M4"];
    for (let i = 0; i < ModText.length; i++) {
        InsertTextCell(ModText[i], x_rect, y_rect, CellW, CellH, "center", 15, "bold");
        y_rect += CellH;
    }
    /*******************************/
    y_rect = paperHeight / 5;
    y_rect += CellheadH;
    x_rect += CellW;
    ElementText = ["Bases de données", "Systèmes d'information", "Structure de données", "Développement Web", "Système d'exploitation"
        , "Réseau informatique", "Analyse numérique", "Probabilité et statistique"];

    InsertTextCell(ElementText[0], x_rect + CellW / 5, y_rect, CellW, CellheadH, "center", 10, "normal");
    y_rect += CellheadH;  // if u didn't understand this block try to remove it and see!

    for (let i = 1; i < ElementText.length; i++) {
        InsertTextCell(ElementText[i], x_rect, y_rect, CellW, CellheadH, "center", 10, "normal");
        y_rect += CellheadH;
    }
    /********************************/
    y_rect = paperHeight / 5;
    y_rect += CellheadH;
    x_rect += CellW;
    let NoteText = GetNoteValues(1, 8, "value");
    console.log(NoteText);
    for (let i = 0; i < NoteText.length; i++) {
        InsertTextCell(NoteText[i], x_rect, y_rect, CellW, CellheadH, "center", 10, "normal");
        y_rect += CellheadH;
    }
    /********************************/
    y_rect = paperHeight / 5;
    y_rect += CellheadH;
    x_rect += CellW;
    let NoteMText = GetNoteValues(9, 12, "text")
    console.log(NoteMText);
    for (let i = 0; i < NoteMText.length; i++) {
        InsertTextCell(NoteMText[i], x_rect, y_rect, CellW, CellH, "center", 10, "normal");
        y_rect += CellH;
    }
    /-------------------------------INSERTING THE TOLTAL AVREGE-------------------------------------------------------/
    let Moyenne = document.getElementById("noteMoyenne").textContent;
    x_rect = paperWidth / 8;
    y_rect = paperHeight / 5;
    x_rect += CellW * 3;
    y_rect += CellheadH * 9;
    InsertHeaderColms(x_rect, y_rect, 1, CellW, CellheadH);
    InsertTextCell(Moyenne, x_rect, y_rect, CellW, CellheadH, "center", 10, "normal");
    /--------------------------------------------------------------------------------------------------------/
    x_rect -= CellW;
    InsertHeaderColms(x_rect, y_rect, 1, CellW, CellheadH);
    InsertTextCell("Moyenne: ", x_rect, y_rect, CellW, CellheadH, "center", 10, "bold");
    doc.save('bulletin.pdf');
}
/-----------------------------------FUNCTIONS--------------------------------------------------------/

function InsertHeaderRows(x, y, cellNB, width, hight) {
    for (let i = 0; i < cellNB; i++) {
        doc.rect(x, y, width, hight);
        x += width;
    }
}

function InsertHeaderColms(x, y, cellNB, width, hight) {
    for (let i = 0; i < cellNB; i++) {
        doc.rect(x, y, width, hight);
        y += hight;
    }
}

function InsertTable(x, y, rowNB, colNB, width, hight) {
    let indX = x, indY = y;
    for (let i = 0; i < rowNB; i++) {
        for (let j = 0; j < colNB; j++) {
            doc.rect(indX, indY, width, hight);
            indY += hight;
        }
        indY = y;
        indX += width;
    }
}

function InsertTextCell(text, xCell, yCell, Cellwidth, CellHeight, align, fontSize, fontStyle) {
    const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const textHeight = doc.getTextDimensions(text).h;
    let xText, yText;
    if (align === "center") {
        xText = xCell + (Cellwidth / 2) - textWidth / 2;
        yText = yCell + (CellHeight / 2) + textHeight / 9;
        doc.setFontSize(fontSize);
        doc.setFontStyle(fontStyle);
        doc.text(text, xText, yText,);
    }
}

function GetNoteValues(start, end, mod) {
    let ArrValues = [];
    let note;
    let elementId;
    for (let i = start; i <= end; i++) {
        elementId = "" + i;
        note = document.getElementById(elementId);
        if (mod === "value")
            ArrValues.push(note.value);
        if (mod === "text")
            ArrValues.push(note.textContent);
    }
    console.log(ArrValues);
    return ArrValues;
}
