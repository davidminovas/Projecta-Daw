function autentificar(correu: string, contrasenya: string, edat: number): boolean {
    if (correu === "") {
        console.log("Error: el camp del correu està buit.");
    }

    if (contrasenya === "") {
        console.log("Error: el camp de la contrasenya està buit.");
    }

    if (edat <= 14) {
        console.log("Error: has de tenir més de 14 anys per autentificar-te.");
    }

    return correu !== "" && contrasenya !== "" && edat > 14;
}