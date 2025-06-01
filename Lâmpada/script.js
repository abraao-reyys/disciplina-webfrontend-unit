const lamp = document.getElementById('lamp');
const bg = document.querySelector('body');

lamp.addEventListener('click', interruptor);

function interruptor() {
    const imgAtual = lamp.getAttribute('src');
    if (imgAtual == 'assets/lamp_off.png') {
        lamp.setAttribute('src', 'assets/lamp_on.png');
        bg.style.background = 'radial-gradient(circle, white 8%, yellow 100%)';
    } else {
        lamp.setAttribute('src', 'assets/lamp_off.png');
        bg.style.background = 'radial-gradient(circle, white 8%, black 100%)';
    }
}