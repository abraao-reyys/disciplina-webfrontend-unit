//* DOM

const myWallet = document.getElementById('balance-value');
const latestTransactionsArea = document.getElementById('latestTransactionsArea');
const pixArea = document.getElementById('pixArea');
const payArea = document.getElementById('payArea');
const investArea = document.getElementById('investArea');
const formButton = document.querySelector('form > button');
const pixReceiveBtn = document.querySelector('.pix-receive');
const pixTransferBtn = document.querySelector('.pix-transfer');
const pixForm = document.querySelector('.pix-form form');
const movementIn = document.getElementById('movement-in');
const movementOut = document.getElementById('movement-out');
const formMessage = document.querySelector('.form-message');
const transactionsContainer = document.querySelector('.latest-transactions-content');
const alertNoTransactions = document.querySelector('.area-alert');

//* Mostrar/esconder áreas

const areas = {
    latest: latestTransactionsArea,
    pix: pixArea,
    pay: payArea,
    invest: investArea
};

const showArea = (active) => {
    const isVisible = areas[active].style.display === 'flex';

    for (const [key, area] of Object.entries(areas)) {
        area.style.display = 'none';
    }

    if (!isVisible) {
        areas[active].style.display = 'flex';
    } else {
        areas.latest.style.display = 'flex';
    }
};

//* Adicionar/remover valor

let walletMoney = 0;

const formatToBRL = (valueInCents) => {
return `R$ ${(valueInCents / 100).toFixed(2).replace('.', ',')}`;
};

const updateWallet = () => {
myWallet.textContent = formatToBRL(walletMoney);
};

const addValue = (value) => {
    const valueInCents = Math.round(value * 100);
    walletMoney += valueInCents;
    totalIn += valueInCents;
    updateWallet();
    updateMovements();
};

const subtractValue = (value) => {
    const valueInCents = Math.round(value * 100);
    if (walletMoney >= valueInCents) {
        walletMoney -= valueInCents;
        totalOut += valueInCents;
        updateWallet();
        updateMovements();
    } else {
        console.log('saldo insuficiente');
    }
};

const valor = document.getElementById('ipixValue');
valor.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '');
    v = (parseInt(v, 10) || 0).toString();
    while (v.length < 3) v = '0' + v;
    v = v.replace(/(\d+)(\d{2})$/, '$1,$2');
    this.value = v;
});

//* Formulário

const handlePixTransaction = () => {
    const pixKeyInput = document.getElementById('ikey').value;
    const pixValueInput = document.getElementById('ipixValue').value;

    if (!pixKeyInput || !pixValueInput) {
        showFormMessage('Preencha todos os campos!');
        return;
    }

    const parsedValue = parseFloat(pixValueInput.replace(',', '.'));

    if (isNaN(parsedValue)) {
        showFormMessage('Valor inválido!');
        return;
    }

    if (pixForm.classList.contains('receive-active')) {
        addValue(parsedValue);
        showFormMessage('Transação realizada com sucesso', 'success');
    } else if (pixForm.classList.contains('transfer-active')) {
        const amountInCents = Math.round(parsedValue * 100);
        if (walletMoney >= amountInCents) {
            subtractValue(parsedValue);
            showFormMessage('Transação realizada com sucesso', 'success');
        } else {
            showFormMessage('Saldo insuficiente!');
            return;
        }
    }

    document.getElementById('ikey').value = '';
    document.getElementById('ipixValue').value = '';

    if (pixForm.classList.contains('receive-active')) {
        addValue(parsedValue);
        createTransactionCard('entrada', pixKeyInput, parsedValue);
        showFormMessage('Transação realizada com sucesso', 'success');
    } else if (pixForm.classList.contains('transfer-active')) {
        const amountInCents = Math.round(parsedValue * 100);
        if (walletMoney >= amountInCents) {
            subtractValue(parsedValue);
            createTransactionCard('saída', pixKeyInput, parsedValue);
            showFormMessage('Transação realizada com sucesso', 'success');
        } else {
            showFormMessage('Saldo insuficiente!');
            return;
        }
    }
};

formButton.addEventListener('click', function (event) {
    event.preventDefault();
    handlePixTransaction();
});

//* Toggle entre Receber e Transferir

pixReceiveBtn.addEventListener('click', () => {
    pixReceiveBtn.classList.add('active');
    pixTransferBtn.classList.remove('active');
    pixForm.classList.remove('transfer-active');
    pixForm.classList.add('receive-active');
    pixForm.querySelector('button').textContent = 'Receber';
});

pixTransferBtn.addEventListener('click', () => {
    pixTransferBtn.classList.add('active');
    pixReceiveBtn.classList.remove('active');
    pixForm.classList.remove('receive-active');
    pixForm.classList.add('transfer-active');
    pixForm.querySelector('button').textContent = 'Transferir';
});

//* Soma dos Recebimentos e das Saídas

let totalIn = 0;
let totalOut = 0;

const updateMovements = () => {
    movementIn.textContent = formatToBRL(totalIn);
    movementOut.textContent = formatToBRL(totalOut);
};

const showFormMessage = (message, type = 'error') => {
    formMessage.textContent = message;
    formMessage.style.color = type === 'success' ? 'green' : 'red';
};

//* Últimas transações

const generateTransactionID = () => {
    const now = new Date();

    const pad = (n) => n.toString().padStart(2, '0');

    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1);
    const day = pad(now.getDate());
    const hour = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    return `${year}${month}${day}${hour}${minutes}${seconds}`;
};

const getFormattedDateTime = () => {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    return `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} - ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
};

const createTransactionCard = (type, pixKey, value) => {
    const transactionCard = document.createElement('div');
    const isInput = type === 'entrada';
    const imageSrc = isInput ? './assets/images/_icon _receber_.png' : './assets/images/icon _enviar_.png';
    const className = isInput ? 'card-transaction input' : 'card-transaction output';

    const formattedDate = getFormattedDateTime();
    const transactionID = generateTransactionID();
    const formattedValue = formatToBRL(Math.round(value * 100));

    transactionCard.className = className;
    transactionCard.style.display = 'flex';

    transactionCard.innerHTML = `
        <img src="${imageSrc}" alt="Ícone de ${type}">
        <div class="card-content">
            <div class="card-wrap">
                <div class="card-title"><strong>${type.charAt(0).toUpperCase() + type.slice(1)} |</strong></div>
                <div class="card-transaction-date">${formattedDate}</div>
            </div>
            <div class="card-transaction-info"><strong>Tipo:</strong> Transferência ${isInput ? 'recebida' : 'enviada'}</div>
            <div class="card-transaction-info"><strong>Para:</strong> ${pixKey}</div>
            <div class="card-wrap">
                <div class="card-transaction-info"><strong>ID:</strong> ${transactionID}</div>
                <div class="card-transaction-info"><strong>Valor:</strong> ${formattedValue}</div>
            </div>
        </div>
    `;

    if (alertNoTransactions) {
        alertNoTransactions.style.display = 'none';
    }

    transactionsContainer.prepend(transactionCard);
};