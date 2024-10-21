let turno = false;

var matrice = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null]
]

function CreoTabella(){
    let table = document.createElement("table");
    table.style.borderCollapse = "collapse"; 
    let tbody = document.createElement("tbody");
    for (let i = 0; i < 7; i++) {
      let row = document.createElement("tr");
      for (let j = 0; j < 6; j++) {
        let cell = document.createElement("td");
        cell.id = `cell-${i}-${j}`; 
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
  x = parseInt(x); 
  y = parseInt(y);

  // Trova il primo punto null nella colonna y
  const primoPuntoNull = trovaPrimoPuntoNull(matrice, y);

  if (primoPuntoNull !== -1) { // Controllo che non sia piena
      if (turno === false) {
          const imgRosso = document.createElement('img'); 
          imgRosso.src = 'Rosso.png'; 
          // Posiziona l'immagine nella cella corretta
          matrice[primoPuntoNull][y] = true; // Aggiorna la matrice
          document.getElementById(`cell-${primoPuntoNull}-${y}`).appendChild(imgRosso);  
          turno = true;  
          //console.log(`Hai cliccato sulla cella ${primoPuntoNull} - ${y}`);

      } else {
          const imgGiallo = document.createElement('img'); 
          imgGiallo.src = 'Giallo.png'; 
          // Posiziona l'immagine nella cella corretta
          matrice[primoPuntoNull][y] = false; // Aggiorna la matrice
          document.getElementById(`cell-${primoPuntoNull}-${y}`).appendChild(imgGiallo);    
          turno = false; 
         // console.log(`Hai cliccato sulla cella ${primoPuntoNull} - ${y}`);
      }

      // DEBUG
      console.log(matrice.toString());
  } else {
      console.log("La colonna è piena");
  }
}

function trovaPrimoPuntoNull(matrice, colonna) {
  // Scorri la colonna dalla prima riga partendo dal basso
  for (let i = matrice.length - 1; i >= 0; i--) {
      if (matrice[i][colonna] === null) {
          return i;
      }
  }
}