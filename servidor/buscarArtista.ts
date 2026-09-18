//utilitzan el filter returnar totes les cancos d'un determinat artista

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


function buscarCancoArtista(artista: string, cancoList: Canco[]): Canco[] {
    return cancoList.filter(canco => canco.artista === artista);
}

const canconsArtista: Canco[] = buscarCancoArtista("Fito", cancons);

console.log(canconsArtista);
