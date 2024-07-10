const API_FACT = `https://catfact.ninja/fact`;

async function getCatFact() {
  const result = await fetch(API_FACT);
  const { fact } = await result.json();
  //Evitar pasar los estados fuera del componente
  //setFact(fact);
  return fact;
}

export { getCatFact };
