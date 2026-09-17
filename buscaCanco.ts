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
export { };