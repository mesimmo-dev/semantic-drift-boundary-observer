function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

function analyzeDrift() {
  const textA = document.getElementById("textA").value.trim();
  const textB = document.getElementById("textB").value.trim();

  if (!textA || !textB) {
    alert("Enter both text inputs.");
    return;
  }

  const charsA = textA.length;
  const charsB = textB.length;

  const wordsA = new Set(tokenize(textA));
  const wordsB = new Set(tokenize(textB));

  const intersection = [...wordsA].filter(word => wordsB.has(word));
  const union = new Set([...wordsA, ...wordsB]);

  const similarity = union.size === 0 ? 0 : intersection.length / union.size;
  const drift = 1 - similarity;

  let severity = "Low";
  if (drift >= 0.75) severity = "Severe";
  else if (drift >= 0.5) severity = "High";
  else if (drift >= 0.25) severity = "Moderate";

  document.getElementById("charsA").textContent = charsA.toLocaleString();
  document.getElementById("charsB").textContent = charsB.toLocaleString();
  document.getElementById("similarity").textContent = similarity.toFixed(2);
  document.getElementById("drift").textContent = drift.toFixed(2);
  document.getElementById("severity").textContent = severity;
}
