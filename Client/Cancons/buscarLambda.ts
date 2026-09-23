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



let titol: string = "Antes de que quente diez";

const songsSherch: Canco[] = cancons.filter(
    (c: Canco) => {
        return c.titol === titol;
    }

)