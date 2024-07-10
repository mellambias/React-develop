const API_CAT_IMAGE = `https://cataas.com/cat/says/`;

async function getImage(fact) {
  const firstword = fact.split(' ', 3).join(' ').concat('...');
  const result = await fetch(`${API_CAT_IMAGE}${firstword}?fontColor=white`);
  return result.url;
}

export { getImage };
