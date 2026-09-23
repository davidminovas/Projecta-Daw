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

const nomEquip = 'Trampus FC';


function alineacioTitular(titulars: Equip[], equip: string): Player[] {
    const equipSeleccionat: Equip | undefined = titulars.find(
        (e: Equip) => { return e.name === equip }
    );

    if (equipSeleccionat === undefined) {
        return [];
    }

    return equipSeleccionat.players.filter(
        (jugador: Player) => { return jugador.titular === true }
    );
}

const JugadorsTitulars: Player[] = alineacioTitular(match, nomEquip);

console.log(JugadorsTitulars);