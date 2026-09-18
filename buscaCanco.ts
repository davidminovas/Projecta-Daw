interface Canco {
    titol: string;
    artista: string;
    durada: number;
    id: string;
}
const cancoBuscar: Canco = {
    id: "2B-CA",
    titol: "Antes de que cuente diez",
    artista: "Fito",
    durada: 300
};

const cancons: Canco[] = [
    {
        id: "2B-CA",
        titol: "Antes de que cuente diez",
        artista: "Fito",
        durada: 300
    },
    {
        id: "3E-DF",
        titol: "Mustafa",
        artista: "Bull",
        durada: 249
    }
]

console.log(cancoBuscar);
function imprimir(canco: Canco): void {
    if (canco !== null) {
        console.log("Existeix")
    } else {
        console.log("No Existeix")
    }
}


function buscarCanco(canco: Canco, cancoList: Canco[]): Canco | null {
    const totalcancons: number = cancoList.length;
    let i: number = 0;
    let trobat: boolean = false;
    while (trobat && i < totalcancons) {
        if (canco.titol === cancoList[i].titol) {
            trobat = true;
        }
        i++;

    }
    if (trobat) {
        return cancoList[i]
    } else {
        return null;
    }
    ;
}
function imprimirArray(canco: Canco[]): void {
    for (let i: number = 0; i < cancons.length; ++i) {
        (cancons[i])
    }
}
function buscarCancoLlarga(durada: number, cancoList: Canco[]): Canco[] {
    const totalcancons: number = cancons.length;
    const cancoLlargues: Canco[] = [];
    for (let i: number = 0; i < totalcancons; i++) {
        if (cancoList[i].durada >= durada) {
            cancoLlargues.push(cancoList[i]);
        }
    }
    return cancoLlargues;
}

const canconsLl: Canco[] = buscarCancoLlarga(30, cancons);
imprimirArray(canconsLl);

export { };



function buscarCancoArtista(artista: string, cancoList: Canco[]): Canco[] {
    return cancoList.filter(canco => canco.artista === artista);
}

const canconsArtista: Canco[] = buscarCancoArtista("Fito", cancons);

console.log(canconsArtista);


tinc varios usuaris que tenen varies llistes de reproducio que cada llista tenen varies canconc, returnar totoes les cancons d'un artista que estan dins les llistes de reproducio d'un determinat usuari