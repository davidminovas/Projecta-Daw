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
function songsSerchArtist(artist: string, songs: Canco[]): Canco[] {
    return songs.filter(
        (s: Canco) => { return artist = s.artista }
    )
};
function songsPlayList(artista: string, playLists: LlistaReproduccio[]): Canco[] {
    let songs: Canco[] = [];
    for (let i: number = 0; i < playLists.length; i++) {
        const songsArtistas: Canco[] = songsSerchArtist(artista, playLists[i].cancons);
        songs = songs.concat(songsArtistas);
    }
    return songs;
}
function buscarCanconsArtista(usuarinom: string, artista: string, users: Usuari[]) {
    const user: Usuari[] = users.filter(
        (u: Usuari) => { return u.nom === usuarinom }
    );
    const playListUser: LlistaReproduccio[] = user[0].llistes;
    return songsPlayList(artista, playListUser)

}


const usuari: Usuari[] = [
    {
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
    },
    {
        nom: "Joan",
        llistes: [
            {
                nom: "Favoritas",
                cancons: [
                    {
                        id: "4",
                        titol: "Una cançó",
                        artista: "Fito",
                        durada: 280
                    }
                ]
            }
        ]
    }
];
let nameArtista: string = "Fito"
let nameUser: string = "David"

const songs: Canco[] = buscarCanconsArtista(nameUser, nameArtista, usuari);

console.log(songs);
export { };