export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Error al hacer fetch");
  }

  return res.json();
};