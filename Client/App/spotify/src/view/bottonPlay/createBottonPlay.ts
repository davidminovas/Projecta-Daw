export function crearBotoPlay() {

    let reproduccions: number = 0;
    const button: HTMLButtonElement = document.createElement("button");
    button.type = "button";
    button.textContent = "Play";
    let click: boolean = false;
    button.addEventListener("click", () => {
    
        if (click === false) {
            reproduccions++;
            button.textContent = "Playing"
            click = true;
        } else {
            button.textContent = "Play"
            click = false;
        }


    });
    return button
}