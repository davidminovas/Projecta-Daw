export function crearBotoCerca(
    getValueSearch: () => string,
    cercar: (textABuscar: string) => void
): HTMLButtonElement {
    const botoCerca: HTMLButtonElement = document.createElement("button");
    botoCerca.type = "button";
    botoCerca.textContent = "button";
    botoCerca.addEventListener("click",
        () => {

          cercar(getValueSearch());
        })
    return botoCerca;

}
