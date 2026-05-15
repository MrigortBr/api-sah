import EstablishmentRepo from "./Repository";

export default class EstablishmentService {
  private repository = new EstablishmentRepo();

  async getByCnes(cnes: string) {
    const r = await this.repository.getByCnes(cnes);

    return r;
  }

  validarCNES(cnes: string | number): boolean {
    if (!cnes) throw new Error("ES-CI");

    const cnesStr = String(cnes).replace(/\D/g, "");

    if (cnesStr.length !== 7) throw new Error("ES-CI");

    if (/^(\d)\1+$/.test(cnesStr)) throw new Error("ES-CI");

    const pesos = [7, 6, 5, 4, 3, 2];
    const numeros = cnesStr
      .slice(0, 6)
      .split("")
      .map(Number);

    let soma = 0;

    for (let i = 0; i < pesos.length; i++) {
      soma += numeros[i] * pesos[i];
    }

    const resto = soma % 11;
    let digito = 11 - resto;

    if (digito === 10) digito = 0;
    if (digito === 11) digito = 0;

    return digito === Number(cnesStr[6]);
  }
}
