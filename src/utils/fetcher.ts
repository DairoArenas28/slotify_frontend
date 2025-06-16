export const fetcher = async (url: string) => {
  //console.log(url)
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Error al hacer fetch");
  }

  return res.json();
};