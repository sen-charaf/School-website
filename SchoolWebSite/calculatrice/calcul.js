function show(value) {
    let text_zone_cont = document.getElementById("val_app");
    let current_cont = text_zone_cont.textContent;
    //let text_zone_nb=parseInt(text_zone_cont);
    if (current_cont === '0') {
        if (!(value === "-" || value === "+" || value === "x" || value === "÷" || value === "."))
            text_zone_cont.textContent = value;

    } else {
        text_zone_cont.textContent = current_cont + value;
        anti_overflow();
    }
}

function anti_overflow() {
    let container = document.querySelector(".text_zone");
    let text = document.getElementById("val_app");
    let containerWidth = container.clientWidth;
    let textWidth = text.clientWidth;
    while (textWidth > containerWidth - 20) {
        let fontSize = parseFloat(getComputedStyle(text, null).getPropertyValue('font-size'));
        text.style.fontSize = (fontSize - 1) + "px";
        textWidth = text.clientWidth;
    }
}

function C_delete() {
    let text_zone_cont = document.getElementById("val_app");
    text_zone_cont.textContent = 0;
}

function E_delete() {
    let text_zone_cont = document.getElementById("val_app");
    let current_cont = text_zone_cont.textContent;
    let i = current_cont.length - 1;
    if (i <= 0)
        text_zone_cont.textContent = "0";
    else {
        current_cont = current_cont.substring(0, i);
        text_zone_cont.textContent = current_cont;
    }
}

function CE_delete() {
    let text_zone_cont = document.getElementById("val_app");
    let current_cont = text_zone_cont.textContent;
    let i = current_cont.length - 1;
    /** */
    while (i >= 0 && current_cont[i] !== "+" && current_cont[i] !== "-" && current_cont[i] !== "x" && current_cont[i] !== "÷") {
        E_delete();
        i--;
    }
    if (i < 0)
        text_zone_cont.textContent = "0";
}

function mk_polinom_arr() {
    let text_zone_cont = document.getElementById("val_app");
    let current_cont = text_zone_cont.textContent;
    let text_length = current_cont.length;
    //console.log(text_length);
    const polinome = [];
    const buffer = [];
    let float_nb;

    for (let i = 0; i < text_length; i++) {
        console.log(current_cont[i], "", i);
        if (current_cont[i] === '.')                   // Skiping the . to be as '.'
            continue;

        if (isNaN(current_cont[i]))
            polinome.push(current_cont[i]);             //if its an oppratore

        else if (current_cont[i + 1] === '.') {             // if its a float number (X.Y)
            /* the X part in the X.Y float number */
            let j = i;
            buffer.length = 0;
            while (!isNaN(current_cont[j]) && j >= 0) {
                buffer.unshift(current_cont[j]);
                j--;
            }
            buffer.push(current_cont[i + 1]); // ???
            j = i + 2;
            while (!isNaN(current_cont[j]) && j < text_length) {
                /* the Y part in the X.Y float number */
                buffer.push(current_cont[j]);
                j++;
            }
            float_nb = parseFloat(buffer.join(""));
            polinome.push(float_nb);
            i = --j;                                     // to make the i just as the j when the i gets incremanted

        } else if (!isNaN(current_cont[i])) {
            let j = i;
            buffer.length = 0;
            /*Cheacking if its a decimal number */
            while (!isNaN(current_cont[j]) && j < text_length)
                j++;
            if (current_cont[j] === ".")
                continue;
            j = i;
            while (!isNaN(current_cont[j]) && j < text_length) {
                /* storing the number till we counter an NaN */
                buffer.push(current_cont[j]);
                console.log(current_cont[j], "", j);
                j++;
            }
            float_nb = parseFloat(buffer.join(""));
            polinome.push(float_nb);
            console.log(" befor i: " + i + " befor j: " + j);
            i = --j;
            console.log(" after i: " + i + " after j: " + j);
        }

    }

    console.log("from mk_polinome_arr fun: ");
    console.log(polinome);
    return polinome;
}
function calulate() {
    let text_zone_cont = document.getElementById("val_app");
    const polinome = mk_polinom_arr();
    console.log("from calulate fun: ");
    console.log(polinome);
    /*calculating the * and / first  */
    let flag = 1;
    while (flag) {
        flag = 0;
        if (polinome.includes("x")) {
            let mult_ind = polinome.indexOf("x");
            let pro;
            if (!polinome.includes("÷") || (polinome.includes("÷") && polinome.indexOf("÷") > mult_ind)) {
                pro = polinome[mult_ind - 1] * polinome[mult_ind + 1];
                polinome.splice(mult_ind - 1, 3, pro);
                flag = 1;
            }
        }
        if (polinome.includes("÷")) {
            let div_ind = polinome.indexOf("÷");
            let div;
            if (!polinome.includes("x") || (polinome.includes("x") && polinome.indexOf("x") > div_ind)) {
                div = polinome[div_ind - 1] / polinome[div_ind + 1];
                polinome.splice(div_ind - 1, 3, div);
                flag = 1;
            }
        }
    }
    console.log("After the calulation of * and /: ");
    console.log(polinome);

    let result = polinome[0];
    let poli_length = polinome.length;
    for (let i = 1; i < poli_length; i++) {
        if (polinome[i] === "+") {
            result += polinome[i + 1];
            i++;
        } else if (polinome[i] === "-") {
            result -= polinome[i + 1];
            i++;
        }
    }
    console.log("After the calulation of + and -: ");
    console.log(result);
    if (result === Infinity)
        text_zone_cont.textContent = 'ERROR';
    else
        text_zone_cont.textContent = result;
}