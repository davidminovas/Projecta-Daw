//utilitzan el filter returnar totes les cancos d'un determinat artista


function buscarCancoArtista(artista: string, cancoList: Canco[]): Canco[] {
    return cancoList.filter(canco => canco.artista === artista);
}

const canconsArtista: Canco[] = buscarCancoArtista("Fito", cancons);

console.log(canconsArtista);