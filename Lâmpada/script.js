const lamp = document.getElementById("lamp");
let isOn = false; // Estado da lâmpada

lamp.addEventListener("click", () => {
    isOn = !isOn; // Alterna o estado

    if (isOn) {
        lamp.src = "assets/lamp_on.png"; // Lâmpada acesa
    } 
    else {
        lamp.src = "assets/lamp_off.png"; // Lâmpada apagada
    }
});
