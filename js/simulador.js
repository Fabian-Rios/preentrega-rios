class Credito {
    constructor(monto, cuotas, total, cuotaMensual) {
        this.monto = monto;
        this.cuotas = cuotas;
        this.total = total;
        this.cuotaMensual = cuotaMensual;
        this.fecha = new Date();
    }
}

let creditosSimulados = [];

function calcularInteres(cuotas) {
    if (cuotas === 3) return 1.15;
    if (cuotas === 6) return 1.3;
    if (cuotas === 12) return 1.6;
    return null;
}

function simularCredito() {
    const monto = parseFloat(document.getElementById("monto").value);
    const cuotas = parseInt(document.getElementById("cuotas").value);
    const resultado = document.getElementById("resultado");

    const interes = calcularInteres(cuotas);

    if (interes === null || isNaN(monto) || monto <= 0) {
        resultado.innerText = "Por favor ingresa un monto válido y una cantidad de cuotas correcta (3, 6 o 12).";
        return;
    }

    const total = monto * interes;
    const cuotaMensual = total / cuotas;

    const credito = new Credito(monto, cuotas, total, cuotaMensual);
    creditosSimulados.push(credito);

    let detalleCuotas = "";
    for (let i = 1; i <= cuotas; i++) {
        detalleCuotas += `Cuota ${i}: $${cuotaMensual.toFixed(2)}\n`;
    }

    resultado.innerText = `Total a pagar: $${total.toFixed(2)}\n${detalleCuotas}`;
}

function buscarCreditoPorMonto(montoMinimo) {
    const creditosFiltrados = creditosSimulados.filter(credito => credito.monto >= montoMinimo);
    console.log("Créditos encontrados:", creditosFiltrados);
    return creditosFiltrados;
}
