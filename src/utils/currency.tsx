export const $n = (value: number) => {
  return `R$ ${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const toRawString = (val: number): string => {
  return Math.round(val * 100).toString();
};

export const formatDisplay = (raw: string): string => {
  const cleanRaw = raw.replace(/^0+/, "") || "0";
  const padded = cleanRaw.padStart(3, "0");

  const reais = padded.slice(0, -2);
  const centavos = padded.slice(-2);

  const formattedReais =
    reais.length > 0 ? parseInt(reais).toLocaleString("pt-BR") : "0";

  return `${formattedReais},${centavos}`;
};
