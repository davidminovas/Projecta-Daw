interface Canco {
    id: string;
    titol: string;
    artista: string;
    durada: number;
}

interface Track {
    title: string;
    duration: number
}


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



const tracks: Track[] = cancons.map(
    (c: Canco) => {
        return {
            title: c.titol,
            duration: c.durada
        }
    }
)



tracks.forEach(
    (t: Track) => {
        console.log(t);
    }
)

const songsString: string[] = cancons.map(
    (c: Canco) => {
        let tempsMinuts = Math.floor(c.durada / 60);
        let tempsSegoons = c.durada - tempsMinuts * 60;
        let text: string = ` ${c.titol}(${c.artista} - durada:${tempsMinuts}:${tempsSegoons})`;

        console.log(text)
        return text.trim();
    }
)
