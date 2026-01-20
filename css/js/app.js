function hitung() {

    let C = +document.getElementById("C").value;
    let R = +document.getElementById("R").value;
    let tE = +document.getElementById("tE").value;
    let fE = +document.getElementById("fE").value;
    let Dt = +document.getElementById("Dt").value;
    let Wb = +document.getElementById("Wb").value;
    let RfD = +document.getElementById("RfD").value;
    let jenis = document.getElementById("jenis").value;

    if ([C,R,tE,fE,Dt,Wb,RfD].some(v => v <= 0)) {
        alert("Semua input harus diisi dengan benar");
        return;
    }

    let avgT = (jenis === "non") ? Dt * 365 : 70 * 365;

    let intake = (C * R * tE * fE * Dt) / (Wb * avgT);
    let RQ = intake / RfD;

    let hasil = document.getElementById("hasil");

    if (RQ <= 1) {
        hasil.className = "result safe";
        hasil.innerHTML = `
        Intake = ${intake.toExponential(3)} mg/kg/hari<br>
        RQ = ${RQ.toFixed(2)}<br>
        Status Risiko: AMAN
        `;
    } else {
        hasil.className = "result risk";
        hasil.innerHTML = `
        Intake = ${intake.toExponential(3)} mg/kg/hari<br>
        RQ = ${RQ.toFixed(2)}<br>
        Status Risiko: TIDAK AMAN
        `;
    }
}
