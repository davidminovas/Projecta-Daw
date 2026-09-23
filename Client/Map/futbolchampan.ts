interface Equip {
    name: string;
    players: Player[];
}

interface Player {
    nom: string;
    numer: number;
    titular: boolean;
}
const match: Equip[] = [
    {
        name: 'Gemplus FC',
        players: [
            {
                nom: 'Jordi',
                numer: 5,
                titular: true,
            },
            {
                nom: 'Eloi',
                numer: 3,
                titular: true,
            },
            {
                nom: 'David',
                numer: 4,
                titular: true,
            },
            {
                nom: 'Gerald',
                numer: 7,
                titular: false,
            }
        ]
    },
    {
        name: 'Trampus FC',
        players: [
            {
                nom: 'Isac',
                numer: 5,
                titular: false,
            },
            {
                nom: 'Ayoub',
                numer: 3,
                titular: true,
            },
            {
                nom: 'Miquel',
                numer: 4,
                titular: true,
            },
            {
                nom: 'Vernat',
                numer: 7,
                titular: false,
            },
        ]
    }
]

function alineacioTitular(
    titular: boolean,
    titulars: Equip[]
): Equip[] {
    return titulars.map(equip => ({
        ...equip,
        players: equip.players.filter(
            jugador => jugador.titular === titular
        )
    }));
}
const resultat = alineacioTitular(true, match);
console.log(resultat);