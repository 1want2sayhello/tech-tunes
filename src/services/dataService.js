export const fetchData = async (fileName) => {
  const res = await fetch(`/data/${fileName}.json`);

  if (!res.ok) {
    throw new Error(`failed to fetch ${fileName} data.`);
  }

  return res.json();
};
