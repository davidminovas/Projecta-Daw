# Funció per calcular el temps d'entrega

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

        // Com que les dades de la base de dades poden ser incorrectes,
        // comprovem que el preu i el temps no siguin negatius.
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