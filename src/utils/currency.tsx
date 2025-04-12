export const $n = (value: number) => {
  return `R$ ${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const toRawString = (val: number): string => {
  return Math.round(val * 100).toString();
};

export const formatDisplay = (rawStr: string): string => {
  const padded = rawStr.padStart(3, "0");
  const reais = padded.slice(0, -2);
  const centavos = padded.slice(-2);
  const formattedReais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formattedReais},${centavos}`;
};
