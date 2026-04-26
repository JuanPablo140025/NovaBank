// Ticket 1
class Cuenta {
  constructor(numeroCuenta, titular, correo, tipoCuenta, saldoInicial) {
    this.numeroCuenta = numeroCuenta;
    this.titular = titular;
    this.correo = correo;
    this.tipoCuenta = tipoCuenta;
    this.saldo = saldoInicial;
    this.movimientos = [];
  }
}

// Ticket 2
class Transaccion {
  constructor(tipo, monto) {
    this.tipo = tipo;
    this.monto = monto;
    this.fecha = new Date().toLocaleString("es-CO");
  }
}

let cuentaNova = null;

// Elementos
const usuarioInput = document.getElementById("usuario");
const loginBtn = document.getElementById("loginBtn");
const dashboard = document.getElementById("dashboard");
const loginCard = document.querySelector(".login-card");
const bienvenida = document.getElementById("bienvenida");
const saldoTexto = document.getElementById("saldo");
const lista = document.getElementById("listaMovimientos");
const montoInput = document.getElementById("monto");

// Mostrar datos
function actualizarUI() {
  saldoTexto.textContent =
    "$" + cuentaNova.saldo.toLocaleString("es-CO");

  bienvenida.textContent =
    "Hola, " + cuentaNova.titular;

  lista.innerHTML = "";

  cuentaNova.movimientos
    .slice()
    .reverse()
    .forEach((mov) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <span>${mov.tipo} - ${mov.fecha}</span>
        <strong>$${mov.monto.toLocaleString("es-CO")}</strong>
      `;

      lista.appendChild(li);
    });
}

// Ticket 3
function depositar(monto) {
  if (monto <= 0 || isNaN(monto)) {
    alert("Monto inválido");
    return;
  }

  cuentaNova.saldo += monto;
  cuentaNova.movimientos.push(
    new Transaccion("Depósito", monto)
  );

  actualizarUI();
}

// Ticket 4
function retirar(monto) {
  if (monto <= 0 || isNaN(monto)) {
    alert("Monto inválido");
    return;
  }

  if (monto > cuentaNova.saldo) {
    alert("Saldo insuficiente");
    return;
  }

  cuentaNova.saldo -= monto;
  cuentaNova.movimientos.push(
    new Transaccion("Retiro", monto)
  );

  actualizarUI();
}

// Login / registro
loginBtn.addEventListener("click", () => {
  const nombre = usuarioInput.value.trim();

  if (!nombre) {
    alert("Escribe tu nombre");
    return;
  }

  // ahora crea la cuenta con el nombre ingresado
  cuentaNova = new Cuenta(
    "NB-" + Math.floor(Math.random() * 999999),
    nombre,
    `${nombre.toLowerCase()}@novabank.com`,
    "Ahorros",
    250000
  );

  loginCard.classList.add("hidden");
  dashboard.classList.remove("hidden");

  actualizarUI();
});

// Botones
document
  .getElementById("depositarBtn")
  .addEventListener("click", () => {
    depositar(Number(montoInput.value));
    montoInput.value = "";
  });

document
  .getElementById("retirarBtn")
  .addEventListener("click", () => {
    retirar(Number(montoInput.value));
    montoInput.value = "";
  });