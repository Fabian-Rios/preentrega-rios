function calcularInteres(cuotas) {
    switch (cuotas) {
        case 3: return 1.15;
        case 6: return 1.3;
        case 12: return 1.6;
        default: return null;
    }
}

function simularCredito() {
    const monto = parseFloat(document.getElementById("monto").value);
    const cuotas = parseInt(document.getElementById("cuotas").value);
    const resultado = document.getElementById("resultado");

    if (isNaN(monto) || monto <= 0 || ![3, 6, 12].includes(cuotas)) {
        resultado.innerHTML = "<p id='error'>Por favor ingresa un monto válido y selecciona una cantidad de cuotas válida.</p>";
        return;
    }

    const interes = calcularInteres(cuotas);
    const total = monto * interes;
    const cuotaMensual = total / cuotas;

    const simulacion = {
        monto,
        cuotas,
        total: total.toFixed(2),
        cuotaMensual: cuotaMensual.toFixed(2)
    };

    localStorage.setItem("ultimaSimulacion", JSON.stringify(simulacion));

    Swal.fire({
        title: "Simulación completada",
        text: `Total a pagar: $${simulacion.total}\nCuota mensual: $${simulacion.cuotaMensual}`,
        icon: "success",
        confirmButtonText: "Ver Detalle"
    }).then(() => {
        let detalle = `<h3>Resultado de la Simulación</h3>`;
        detalle += `<p>Total a pagar: $${simulacion.total}</p>`;
        detalle += `<p>Cuota mensual: $${simulacion.cuotaMensual}</p>`;
        detalle += `<ul>`;
        for (let i = 1; i <= cuotas; i++) {
            detalle += `<li>Cuota ${i}: $${simulacion.cuotaMensual}</li>`;
        }
        detalle += `</ul>`;

        resultado.innerHTML = detalle;

        resultado.classList.remove("animate__animated", "animate__fadeIn");
        void resultado.offsetWidth;
        resultado.classList.add("animate__animated", "animate__fadeIn");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("simularBtn").addEventListener("click", simularCredito);
});