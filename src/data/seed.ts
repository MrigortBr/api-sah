import { AppDataSource } from "./data-source";
import { seedDiligencias } from "./seed/DiligenciasSeed";
import { seedEstabelecimento } from "./seed/EstabelecimentoSeed";
import { seedMacrorregiaoSaude } from "./seed/MacroSeed";
import { seedMunicipio } from "./seed/MunicipioSeed";
import { seedPermission } from "./seed/PermissionSeed";
import { seedRegiaoSaude } from "./seed/RegiaoSaudeseed";
import { seedTipoHabilitacao } from "./seed/TipoHabilitacao";
import { seedUf } from "./seed/ufSeed";
import { seedUser } from "./seed/userSeed";

async function clearDatabase() {
  const queryRunner = AppDataSource.createQueryRunner();

  await queryRunner.connect();

  try {
    await queryRunner.query(`
      TRUNCATE TABLE
        estabelecimento,
        regiao_saude,
        macrorregiao_saude,
        municipio,
        uf,
        Diligencia, 
        tipo_habilitacao, 
        permission, 
        "user"
      RESTART IDENTITY CASCADE
    `);

    console.log("Banco limpo");
  } finally {
    await queryRunner.release();
  }
}

async function runSeeds() {
  try {
    await AppDataSource.initialize();

    console.log("Database conectada");

    await clearDatabase();

    await seedUf(AppDataSource);

    await seedMunicipio(AppDataSource);

    await seedMacrorregiaoSaude(AppDataSource);

    await seedRegiaoSaude(AppDataSource);

    await seedEstabelecimento(AppDataSource);
    await seedDiligencias(AppDataSource);

    await seedTipoHabilitacao(AppDataSource);

    await seedPermission(AppDataSource);

    await seedUser(AppDataSource);

    console.log("Seeds executadas com sucesso");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

runSeeds();
