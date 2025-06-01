document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let calculadoraLigada = true;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === 'OFF') {
                display.textContent = 'Calculadora desligada';
                calculadoraLigada = false;

                buttons.forEach(btn => {
                    if (btn.textContent !== 'OFF' && btn.textContent !== 'ON') {
                        btn.disabled = true;
                        btn.classList.add('disabled');
                    }
                });
                return;
            }

            if (value === 'ON') {
                display.textContent = '';
                calculadoraLigada = true;

                buttons.forEach(btn => {
                    btn.disabled = false;
                    btn.classList.remove('disabled');
                });
                return;
            }

            if (!calculadoraLigada) return;

            switch (value) {
                case 'C':
                    display.textContent = '';
                    break;
                case '<':
                    display.textContent = display.textContent.slice(0, -1);
                    break;
                case '=':
                    try {
                        const expression = display.textContent.replace(/x/g, '*');
                        display.textContent = eval(expression);
                    } catch (error) {
                        display.textContent = 'Erro';
                    }
                    break;
                default:
                    display.textContent += value;
                    break;
            }
        });
    });
});
