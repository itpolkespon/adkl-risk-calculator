console.log("script.js loaded");

function hitungRisiko() {

  const C  = parseFloat(document.getElementById("C").value);
  const R  = parseFloat(document.getElementById("R").value);
  const tE = parseFloat(document.getElementById("tE").value);
  const fE = parseFloat(document.getElementById("fE").value);
  const Dt = parseFloat(document.getElementById("Dt").value);
  const Wb = parseFloat(document.getElementById("Wb").value);

  const jenis = document.getElementById("jenisRisiko").value;

  if ([C,R,tE,fE,Dt,Wb].some(v => isNaN(v) || v <= 0)) {
    alert("Semua parameter pajanan wajib diisi dengan benar");
    return;
  }

  // avgT otomatis (standar ADKL)
  const avgT = (jenis === "non") ? Dt * 365 : 70 * 365;

  const intake = (C * R * tE * fE * Dt) / (Wb * avgT);

  const hasil = document.getElementById("hasil");
  hasil.className = "result";

  let output = `
    <b>Intake ADKL:</b> ${intake.toExponential(3)} mg/kg/hari<br>
  `;

  if (jenis === "non") {
    const RfD = parseFloat(document.getElementById("RfD").value);
    if (isNaN(RfD) || RfD <= 0) {
      alert("Masukkan nilai RfD yang valid");
      return;
    }

    const HQ = intake / RfD;

    hasil.classList.add(HQ <= 1 ? "safe" : "risk");

    output += `
      <b>Hazard Quotient (HQ):</b> ${HQ.toFixed(2)}<br>
      <b>Status Risiko:</b> ${HQ <= 1 ? "AMAN" : "TIDAK AMAN"}
    `;
  } else {
    output += `<i>Mode karsinogenik: gunakan Slope Factor (SF) & ECR</i>`;
  }

  hasil.innerHTML = output;
}
