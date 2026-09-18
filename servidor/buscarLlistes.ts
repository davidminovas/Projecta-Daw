interface Canco {
    titol: string;
    artista: string;
    durada: number;
    id: string;
}

interface LlistaReproduccio {
    nom: string;
    cancons: Canco[];
}

interface Usuari {
    nom: string;
    llistes: LlistaReproduccio[];
}

function buscarCanconsArtista(usuari: Usuari, artista: string): Canco[] {
    const cancons: Canco[] = [];

    for (const llista of usuari.llistes) {
        const canconsArtista = llista.cancons.filter(
            canco => canco.artista === artista
        );

        cancons.push(canconsArtista);
    }

    return cancons;
}

const usuari: Usuari = {
    nom: "David",
    llistes: [
        {
            nom: "Preferides",
            cancons: [
                {
                    id: "1",
                    titol: "Antes de que cuente diez",
                    artista: "Fito",
                    durada: 300
                },
                {
                    id: "2",
                    titol: "Mustafa",
                    artista: "Bull",
                    durada: 249
                }
            ]
        },
        {
            nom: "Rock",
            cancons: [
                {
                    id: "3",
                    titol: "Soldadito Marinero",
                    artista: "Fito",
                    durada: 270
                },
                {
                    id: "4",
                    titol: "Another Song",
                    artista: "Queen",
                    durada: 250
                }
            ]
        }
    ]
};

const resultat = buscarCanconsArtista(usuari, "Fito");

console.log(resultat);