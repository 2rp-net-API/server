import AppDataSource from "../data-source";
import { Request, Response } from "express";
import { Sobreaviso } from "../entities";
import { Colaborador } from "../entities";

class SobreavisoController {
  public async create(req: Request, res: Response): Promise<Response> {
    let { entrada, saida, description, idcolaborador } = req.body;

    if (!entrada || entrada.trim() === "" || !saida || saida.trim() === "") {
      return res.json({ error: "Forneça a entrada e a saída do colaborador" });
    }

    const isColaborador = await AppDataSource.manager.findOneBy(Colaborador, {
      idcolaborador,
    });

    if (!isColaborador || isColaborador.status === "inativo") {
      return res.json({ error: "Colaborador não localizado ou inativo" });
    }

    const object = new Sobreaviso();
    object.entrada = entrada;
    object.saida = saida;
    object.description = description;
    object.colaborador = idcolaborador;
    object.isApproved = false;

    const sobreaviso: any = await AppDataSource.manager
      .save(Sobreaviso, object)
      .catch((e) => {
        return e.message;
      });
    return res.json(sobreaviso);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { idsobreaviso } = req.body;
    if (!idsobreaviso || idsobreaviso.trim() === "") {
      return res.json({ error: "Forneça o identificador do Sobreaviso" });
    }
    const object: any = await AppDataSource.manager.findOneBy(Sobreaviso, {
      idsobreaviso,
    });
    if (object && object.idsobreaviso) {
      const r = await AppDataSource.manager
        .remove(Sobreaviso, object)
        .catch((e) => e.message);
      return res.json(r);
    } else {
      return res.json({ error: "Sobreaviso não localizado" });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      idsobreaviso,
      entrada,
      saida,
      description,
      colaborador,
      isApproved,
    } = req.body;
    if (!idsobreaviso || idsobreaviso.trim() === "") {
      return res.json({ error: "Forneça o identificador do Sobreaviso" });
    }
    const object: any = await AppDataSource.manager.findOneBy(Sobreaviso, {
      idsobreaviso,
    });
    if (object && object.idsobreaviso) {
      object.entrada =
        !entrada || entrada.trim() === "" ? object.entrada : entrada.trim();
      object.saida =
        !saida || saida.trim() === "" ? object.saida : saida.trim();
      object.description =
        !description || description.trim() === ""
          ? object.description
          : description.trim();
      object.colaborador =
        !colaborador || colaborador.trim() === ""
          ? object.colaborador
          : colaborador.trim();
      object.isApproved =
        !isApproved || isApproved.trim() === ""
          ? object.isApproved
          : isApproved.trim();
      const sobreaviso = await AppDataSource.manager
        .save(Sobreaviso, object)
        .catch((e) => {
          return e.message;
        });
      return res.json(sobreaviso);
    } else {
      return res.json({ error: "Sobreaviso não localizado" });
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const object: any = await AppDataSource.getRepository(Sobreaviso).find({});
    return res.json(object);
  }

  public async approve(req: Request, res: Response): Promise<Response> {
    const { idsobreaviso } = req.body;

    if (!idsobreaviso || idsobreaviso.trim() === "") {
      return res.json({ error: "Forneça o identificador do sobreaviso" });
    }
    const object: any = await AppDataSource.manager.findOneBy( Sobreaviso, {
      idsobreaviso,
    });

    if (!object.isApproved) {
      object.isApproved = true;
    } else {
      object.isApproved = false;
    }

    const sobreaviso = await AppDataSource.manager
      .save(Sobreaviso, object)
      .catch((e) => {
        return e.message;
      });
    return res.json(sobreaviso);
  }
}

export default new SobreavisoController();
