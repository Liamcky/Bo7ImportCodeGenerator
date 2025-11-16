const assaultRifle = Object.freeze({
  "A01"	: "M15 MOD 0",
  "A02"	: "AK-27",
  "A03"	: "MXR-17",
  "A04"	: "X9 Maverick",
  "A05"	: "DS20 Mirage",
  "A06"	: "Peacekeeper MK1"
});
const submachinegun = Object.freeze({
  "S01" :	"Ryden 45K",
  "S02" :	"RK-9",
  "S03"	: "Razor 9mm",
  "S04"	: "Dravec 45",
  "S05"	: "Carbon 57",
  "S06"	: "MPC-25"
});
const shotgun = Object.freeze({
  "C01" :	"M10 Breacher",
  "C02" :	"Echo 12",
  "C03" :	"Akita"
});
const lightmachinegun = Object.freeze({
  "L01"	: "MK.78",
  "L02" :	"XM325"
});
const marksmanRifle = Object.freeze({
  "M01" :	"M8A1",
  "M02"	: "Warden 308",
  "M03"	: "M34 Novaline"
});
const sniper = Object.freeze({
  "R01" :	"VS Recon",
  "R02"	: "Shadow SK",
  "R03" :	"XR-3 Ion"
});
const pistol = Object.freeze({
  "P01"	: "Jager 45",
  "P02"	: "Velox 5.7",
  "P03"	: "Coda 9"
});
const categoryMap = Object.freeze({
  "ASSAULT RIFLES" : "A",
  "SUBMACHINE GUNS" : "S",
  "SHOTGUNS" : "C",
  "LIGHT MACHINE GUNS" : "L",
  "MARKSMAN RIFLES" : "M",
  "SNIPER RIFLES" : "R",
  "PISTOLS" : "P"
});

const optic = Object.freeze({
  "5XGZH-JLU91-1" : "",
  "8E7Z8-TX9D1-1" : "",
  "AUXYZ-48NH1-1" : "",
  "DBNYQ-DJ§L1-1" : "",   
  "FSEYG-MUHQ1-1" : ""
});
const muzzle = Object.freeze({
  "7AFKS-11" : "",
  "45QAW-11" : "",
  "2KD5Y-11" : "",
  "5Q3FU-11" : "",
  "8USQQ-11" : ""
});
const barrel = Object.freeze({
  "H11" : "",
  "2711" : "",
  "2F11" : "",
  "Y11" : "",
  "Q11" : ""
});
const underbarrel = Object.freeze({
  "6K2Z6-A311 : "",
  "7YBYY-3U11 : "",
  "2E9ZS-TS11 : "",
  "56SZD-GB11 : "",
  "3SIZK-MJ11 : "",
  "2DD7G-6R72R-B11 : "",
  "243YD-5L5UL-911 : "",
  "TTQA4-G4MG7-11 : "",
  "JJH73-B3FB5-11 : "",
  "9CKYQ-WL11 : ""
});
const magazine = Object.freeze({
  "6BQ11" : "",
  "4JH11" : "",
  "83Y11" : "",
  "9V711" : ""
});
const reargrip = Object.freeze({
  "CTRG7-Y11" : "",
  "IQM6T-F11" : "",
  "6WVQL-H11" : "",
  "9VBKW-Q11" : "",
  "FS7BI-711" :
});
const stock = Object.freeze({
  "G311" : "",
  "8J11" : "", 
  "CB11 : "",
  "NL11 : "",
  "JU11 : "",
  "AA942-62863-11" : ""
});
const laser = Object.freeze({
  "68XV7-YIW11" : "",
  "3LYXL-H9Y11 : "",
  "BGVQE-X2S11" : "",
  "8UWST-FSU11" : "",
  "E3UN1-EBQ11" : ""
});
const firemods = Object.freeze({
  "131" : "",
  "2JD6P-5HFUD-KB11" : "",
  "151" : "",
  "21WSG-FBYJX-2J11" : "",
  "UCS11" : ""
});

function customAddMultiple(...inputs) {
    if (inputs.length === 0) return '';

    const charset = "123456789ABCDEFGHIJKLMNPQRSTUVWXYZ"; //Base34 1-9 A-Z without O but 1 has value 0
    const baseValue = charset.length;

    const charToIndex = {};
    const indexToChar = {};

    for (let i = 0; i < charset.length; i++) {
        charToIndex[charset[i]] = i;
        indexToChar[i] = charset[i];
    }
    charToIndex['1'] = 0; // 1 = 0

    const maxLength = Math.max(...inputs.map(s => s.length));
    const padded = inputs.map(s => s.padStart(maxLength, '1'));

    let carry = 0;
    let result = '';

    for (let i = maxLength - 1; i >= 0; i--) {
        let sum = carry;
        for (const str of padded) {
            sum += charToIndex[str[i]] || 0; // Treat empty or invalid chars as 0
        }
        const digit = sum % baseValue;
        carry = Math.floor(sum / baseValue);
        result = indexToChar[digit] + result;
    }

    while (carry > 0) {
        const digit = carry % baseValue;
        carry = Math.floor(carry / baseValue);
        result = indexToChar[digit] + result;
    }

    return result;
}

function calculate() {
    const values = [
        document.getElementById('optic').value,
        document.getElementById('muzzle').value,
        document.getElementById('barrel').value,
        document.getElementById('underbarrel').value,
        document.getElementById('magazine').value,
        document.getElementById('rearGrip').value,
        document.getElementById('stock').value,
        document.getElementById('laser').value,
        document.getElementById('fireMods').value
    ];
     for (let i = 0; i < values.length; i++) {
        values[i] = values[i].replace(/-/g, '');
    }

    const result = customAddMultiple(...values);
    document.getElementById('result').innerText = "Result: " + result.match(/.{1,5}/g).join('-');
}
