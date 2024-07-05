// Fonction pour générer tous les hachages
function generateHashes() {
  const inputValue = document.getElementById("inputValue").value;

  // MD5
  const md5Hash = CryptoJS.MD5(inputValue).toString();
  document.getElementById("md5Result").innerText = md5Hash;

  // SHA-256
  const sha256Hash = CryptoJS.SHA256(inputValue).toString();
  document.getElementById("sha256Result").innerText = sha256Hash;

  // SHA-3 (Keccak)
  const sha3Hash = sha3_256(inputValue);
  document.getElementById("sha3Result").innerText = sha3Hash;

  // Bcrypt
  const bcryptHash = dcodeIO.bcrypt.hashSync(inputValue, 10);
  document.getElementById("bcryptResult").innerText = bcryptHash;
}
