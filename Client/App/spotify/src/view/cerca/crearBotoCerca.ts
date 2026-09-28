export function crearBotoCerca(getValueSearch: () => string): HTMLButtonElement {
    const botoCerca: HTMLButtonElement = document.createElement("button");
    botoCerca.type = "button";
    botoCerca.textContent = "button";
    botoCerca.addEventListener("click",
        () => {

            console.log("Buscar: " + getValueSearch());
        })
    return botoCerca;

}
