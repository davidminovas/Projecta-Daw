# Exercici: Càlcul del temps d'entrega

## Prompt inicial

Una plataforma d'entrega online vol saber quan tardarà en rebre el producte. 
La funció rebrà un llistat de productes que hi ha al carro de la compra, on cada 
producte té un temps determinat que dependrà del productor i del tipus 
d'entrega seleccionat.

Només hi ha dos tipus d'entrega:
- Express: la comanda s'entregarà en un temps mínim.
- Estàndard: la comanda es rebrà quan l'hagi de rebre segons el productor.

Les dades venen de la base de dades, però no són 100% segures.

## Modificació 1

Cal comprovar que el carro no estigui buit, que els preus no siguin negatius 
i que el temps tampoc sigui negatiu.

## Modificació 2

Afegir també la funció per calcular el temps total d'entrega de la comanda.

## Resultat final

```typescript
type TipusEntrega = "express" | "estandar";

interface Producte {
    nom: string;
    preu: number;
    tempsProductor: number;
}

function calcularTempsEntrega(
    productes: Producte[],
    tipusEntrega: TipusEntrega
): number {

    // Comprovem que el carro no estigui buit.
    if (productes.length === 0) {
        throw new Error("El carro de la compra no pot estar buit.");
    }

    // Només acceptem els dos tipus d'entrega.
    if (tipusEntrega !== "express" && tipusEntrega !== "estandar") {
        throw new Error(
            "El tipus d'entrega ha de ser 'express' o 'estandar'."
        );
    }

    let tempsTotal = 0;

    for (const producte of productes) {

        // Les dades de la base de dades poden ser incorrectes,
        // per això comprovem que el preu i el temps no siguin negatius.
        if (producte.preu < 0) {
            throw new Error(
                `El preu del producte "${producte.nom}" no pot ser negatiu.`
            );
        }

        if (producte.tempsProductor < 0) {
            throw new Error(
                `El temps d'entrega del producte "${producte.nom}" no pot ser negatiu.`
            );
        }

        let tempsEntrega: number;

        if (tipusEntrega === "express") {
            // En express s'utilitza el temps mínim establert.
            tempsEntrega = 1;
        } else {
            // En estàndard s'utilitza el temps indicat pel productor.
            tempsEntrega = producte.tempsProductor;
        }

        // La comanda es rebrà quan hagi arribat l'últim producte.
        if (tempsEntrega > tempsTotal) {
            tempsTotal = tempsEntrega;
        }
    }

    return tempsTotal;
}