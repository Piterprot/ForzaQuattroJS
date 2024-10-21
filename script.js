let turno = false;

var matrice = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null]
];

function CreoTabella(){
    let table = document.createElement("table");
    table.style.borderCollapse = "collapse"; 
    let tbody = document.createElement("tbody");

    for (let i = 0; i < 6; i++) {  // Corretto per creare 6 righe
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {  // Corretto per creare 7 colonne
            let cell = document.createElement("td");
            cell.id = `cell-${i}-${j}`; 
            cell.style.width = "50px"; 
            cell.style.height = "50px"; 
            cell.style.border = "1px solid black"; 
            cell.addEventListener("click", handleCellClick); 
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    document.body.appendChild(table);
}

function handleCellClick(event) {
    const cell = event.target; 
    const eventId = event.target.id;
    var [prep, x, y] = eventId.split('-'); 
    y = parseInt(y);

    // Trova il primo punto null nella colonna y
    const primoPuntoNull = trovaPrimoPuntoNull(matrice, y);

    if (primoPuntoNull !== -1) { // Controllo che la colonna non sia piena
        if (turno === false) {
            const imgRosso = document.createElement('img'); 
            imgRosso.src = 'Rosso.png'; 
            imgRosso.style.width = "100%"; 
            imgRosso.style.height = "100%";
            // Posiziona l'immagine nella cella corretta
            matrice[primoPuntoNull][y] = true; // Aggiorna la matrice (true = rosso)
            document.getElementById(`cell-${primoPuntoNull}-${y}`).appendChild(imgRosso);  
            turno = true;  
        } else {
            const imgGiallo = document.createElement('img'); 
            imgGiallo.src = 'Giallo.png'; 
            imgGiallo.style.width = "100%"; 
            imgGiallo.style.height = "100%";
            // Posiziona l'immagine nella cella corretta
            matrice[primoPuntoNull][y] = false; // Aggiorna la matrice (false = giallo)
            document.getElementById(`cell-${primoPuntoNull}-${y}`).appendChild(imgGiallo);    
            turno = false; 
        }

        // Controllo di vittoria
        if (controllaVittoria(primoPuntoNull, y)) {
            setTimeout(() => {
                alert(`Il giocatore ${turno ? "Rosso" : "Giallo"} ha vinto!`);
                resetMatrice();
            }, 100);
        }
        
        // DEBUG
        console.log(matrice);
    } else {
        console.log("La colonna è piena");
    }
}

function trovaPrimoPuntoNull(matrice, colonna) {
    // Scorri la colonna dalla prima riga partendo dal basso
    for (let i = matrice.length - 1; i >= 0; i--) {
        if (matrice[i][colonna] === null) {
            console.log(`primoPuntoNull ${i}`);
            return i;
        }
    }
    return -1; // La colonna è piena
}

function controllaVittoria(riga, colonna) {
    const giocatoreCorrente = matrice[riga][colonna];

    // Controlla orizzontale
    if (contaInDirezione(riga, colonna, 0, 1) + contaInDirezione(riga, colonna, 0, -1) >= 3) {
        return true;
    }

    // Controlla verticale
    if (contaInDirezione(riga, colonna, 1, 0) >= 3) {
        return true;
    }

    // Controlla diagonale (su-destra e giù-sinistra)
    if (contaInDirezione(riga, colonna, 1, 1) + contaInDirezione(riga, colonna, -1, -1) >= 3) {
        return true;
    }

    // Controlla diagonale (su-sinistra e giù-destra)
    if (contaInDirezione(riga, colonna, 1, -1) + contaInDirezione(riga, colonna, -1, 1) >= 3) {
        return true;
    }

    return false;
}

function contaInDirezione(riga, colonna, deltaRiga, deltaColonna) {
    const giocatoreCorrente = matrice[riga][colonna];
    let conta = 0;

    for (let i = 1; i < 4; i++) {
        const nuovaRiga = riga + deltaRiga * i;
        const nuovaColonna = colonna + deltaColonna * i;

        if (
            nuovaRiga >= 0 && nuovaRiga < matrice.length &&
            nuovaColonna >= 0 && nuovaColonna < matrice[0].length &&
            matrice[nuovaRiga][nuovaColonna] === giocatoreCorrente
        ) {
            conta++;
        } else {
            break;
        }
    }

    return conta;
}

function resetMatrice() {
    matrice = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null]
    ];

    // Ripulisci il DOM
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            cell.innerHTML = ""; // Svuota le celle
        }
    }

    turno = false; // Ricomincia con il turno del giocatore Rosso
}

// Inizializza la tabella quando il DOM è pronto
window.onload = function() {
    CreoTabella();
};
