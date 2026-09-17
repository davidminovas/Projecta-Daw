interface Usuari {
    contrasenya: string;
    correu: string;
    edat: number;
}


function autentificar(usuari: Usuari): boolean {
    let correcte: boolean = false;
    if (usuari.correu === "totcorrecta" && usuari.contrasenya === "contrasenyaok" && usuari.edat > 14) {
        correcte = true;
    }
    return correcte;


}

function imprimir(auth: boolean) {
    if (auth) {
        console.log("Usuari identificat de forma correcta")
    } else {
        console.log("Usuari, contrasenya o edat no valid")
    }
}
const usuariCorrecte: Usuari = {
    contrasenya: "contrasenyaok",
    correu: "totcorrecta",
    edat: 15

}
let autOk: boolean = autentificar(usuariCorrecte);

imprimir(autOk);

const usuariinCorrecte: Usuari = {
    contrasenya: "contrasenyaok",
    correu: "totcorrecta",
    edat: 15

}
autOk = autentificar(usuariinCorrecte);

imprimir(autOk);