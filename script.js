// Initialisation du tableau d'historique
let compteur = 0;
let histoTab = new Array(13).fill(null); // Initialisation d'un tableau vide de taille 13

function generateHashes() {
  // Vérifier si des hachages précédents existent pour les ajouter à l'historique
  if (compteur > 0) {
    addToHistory("MD5", histoTab[0], histoTab[1], histoTab[2]);
    addToHistory("SHA-256", histoTab[3], histoTab[4], histoTab[5]);
    addToHistory("SHA-3", histoTab[6], histoTab[7], histoTab[8]);
    addToHistory("Bcrypt", histoTab[9], histoTab[10], histoTab[11]);
    addToHistoryInput(histoTab[12]);
  }
  compteur++;

  const inputValue = document.getElementById("inputValue").value;

  // Mesurer le temps de début
  const startTime = performance.now();

  // MD5
  const md5Hash = CryptoJS.MD5(inputValue).toString();
  const md5Time = performance.now() - startTime;
  document.getElementById("md5Result").innerText = md5Hash;
  document.getElementById("md5Time").innerText = `${md5Time.toFixed(2)} ms`;
  document.getElementById("md5Size").innerText = `${md5Hash.length} `;

  // SHA-256
  const sha256Hash = CryptoJS.SHA256(inputValue).toString();
  const sha256Time = performance.now() - startTime;
  document.getElementById("sha256Result").innerText = sha256Hash;
  document.getElementById("sha256Time").innerText = `${sha256Time.toFixed(
    2
  )} ms`;
  document.getElementById("sha256Size").innerText = `${sha256Hash.length} `;

  // SHA-3 (Keccak)
  const sha3Hash = sha3_256(inputValue);
  const sha3Time = performance.now() - startTime;
  document.getElementById("sha3Result").innerText = sha3Hash;
  document.getElementById("sha3Time").innerText = `${sha3Time.toFixed(2)} ms`;
  document.getElementById("sha3Size").innerText = `${sha3Hash.length} `;

  // Bcrypt
  const bcryptHash = dcodeIO.bcrypt.hashSync(inputValue, 10);
  const bcryptTime = performance.now() - startTime;
  document.getElementById("bcryptResult").innerText = bcryptHash;
  document.getElementById("bcryptTime").innerText = `${bcryptTime.toFixed(
    2
  )} ms`;
  document.getElementById("bcryptSize").innerText = `${bcryptHash.length} `;

  document.getElementById("argon2Result").innerText =
    "Bibliotheque non trouvée !";
  // Ajouter les résultats au tableau d'historique
  histoTab[0] = md5Hash;
  histoTab[1] = `${md5Time.toFixed(2)} ms`;
  histoTab[2] = `${md5Hash.length}`;
  histoTab[3] = sha256Hash;
  histoTab[4] = `${sha256Time.toFixed(2)} ms`;
  histoTab[5] = `${sha256Hash.length}`;
  histoTab[6] = sha3Hash;
  histoTab[7] = `${sha3Time.toFixed(2)} ms`;
  histoTab[8] = `${sha3Hash.length}`;
  histoTab[9] = bcryptHash;
  histoTab[10] = `${bcryptTime.toFixed(2)} ms`;
  histoTab[11] = `${bcryptHash.length}`;
  histoTab[12] = inputValue;
}

// Fonction pour ajouter au tableau d'historique
function addToHistory(algorithm, hashResult, elapsedTime, hashLength) {
  const historyBody = document.getElementById("historyBody");

  // Supprimer jusqu'à 4 lignes existantes
  while (historyBody.rows.length >= 4) {
    historyBody.deleteRow(0);
  }

  // Créer une nouvelle ligne de tableau pour le nouvel historique
  const newRow = historyBody.insertRow(historyBody.rows.length);

  // Insérer les cellules dans la nouvelle ligne
  const algorithmCell = newRow.insertCell(0);
  const resultCell = newRow.insertCell(1);
  const timeCell = newRow.insertCell(2);
  const lengthCell = newRow.insertCell(3);

  // Remplir les cellules avec les données
  algorithmCell.textContent = algorithm;
  resultCell.textContent = hashResult;
  timeCell.textContent = elapsedTime;
  lengthCell.textContent = hashLength;
}
// Fonction pour ajouter au tableau d'historique
function addToHistoryInput(inputValue) {
  const historyInput = document.getElementById("historyInput");

  // Supprimer toutes les lignes existantes
  while (historyInput.firstChild) {
    historyInput.removeChild(historyInput.firstChild);
  }

  // Créer un nouveau <p> pour chaque nouvelle entrée
  const newEntry = document.createElement("p");
  newEntry.textContent = inputValue;

  // Ajouter la nouvelle entrée à historyInput
  historyInput.appendChild(newEntry);
}
