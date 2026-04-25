class Cuenta {
    constructor(titular, numero, saldo, tipo, activa) {
        this.titular = titular;
        this.numero = numero;
        this.saldo = saldo;
        this.tipo = tipo;
        this.activa = activa;
        this.movimientos = [];
    }

    depositar(monto) {
        if (monto > 0) {
            this.saldo += monto;
            this.movimientos.push(new Transaccion("Deposito", monto));
            return true;
        }
        return false;
    }

    retirar(monto) {
        if (monto > 0 && this.saldo >= monto) {
            this.saldo -= monto;
            this.movimientos.push(new Transaccion("Retiro", monto));
            return true;
        }
        return false;
    }
}

class Transaccion {
    constructor(tipo, monto) {
        this.tipo = tipo;
        this.monto = monto;
        this.fecha = new Date().toLocaleString();
    }
}

let cuenta = new Cuenta("Juan", "123", 1000, "ahorros", true);

function actualizarUI() {
    document.getElementById("saldo").innerText = "Saldo: $" + cuenta.saldo;

    let log = document.getElementById("movimientos");
    log.innerHTML = "";

    cuenta.movimientos.forEach(m => {
        let p = document.createElement("p");
        p.innerText = `${m.tipo}: $${m.monto} - ${m.fecha}`;
        log.appendChild(p);
    });
}

function depositar() {
    let monto = parseFloat(document.getElementById("monto").value);
    if (!cuenta.depositar(monto)) {
        alert("Monto inválido");
    }
    actualizarUI();
}

function retirar() {
    let monto = parseFloat(document.getElementById("monto").value);
    if (!cuenta.retirar(monto)) {
        alert("Saldo insuficiente o monto inválido");
    }
    actualizarUI();
}

actualizarUI();
