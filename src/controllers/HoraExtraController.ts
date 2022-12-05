import AppDataSource from "../data-source";
import { Request, Response } from "express";
import { HoraExtra } from "../entities";
import { Colaborador } from "../entities";

class HoraExtraController {
  public async createhoraextra(req: Request, res: Response): Promise<Response> {
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

    const object = new HoraExtra();
    object.entrada = entrada;
    object.saida = saida;
    object.description = description;
    object.colaborador = isColaborador;
    object.isApproved = false;

    const response: any = await AppDataSource.manager
      .save(HoraExtra, object)
      .catch((e) => {
        return e.message;
      });
    return res.json(response);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { idhoraextra } = req.body;
    if (!idhoraextra || idhoraextra.trim() === "") {
      return res.json({ error: "Forneça o identificador da hora extra" });
    }
    const object: any = await AppDataSource.manager.findOneBy(HoraExtra, {
      idhoraextra,
    });
    if (object && object.idhoraextra) {
      const r = await AppDataSource.manager
        .remove(HoraExtra, object)
        .catch((e) => e.message);
      return res.json(r);
    } else {
      return res.json({ error: "Hora Extra não localizada" });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      idhoraextra,
      entrada,
      saida,
      description,
      idcolaborador,
      isApproved,
    } = req.body;
    if (!idhoraextra || idhoraextra.trim() === "") {
      return res.json({ error: "Forneça o identificador da hora extra" });
    }
    const object: any = await AppDataSource.manager.findOneBy(HoraExtra, {
      idhoraextra,
    });
    if (object && object.idhoraextra) {
      object.entrada =
        !entrada || entrada.trim() === "" ? object.entrada : entrada.trim();
      object.saida =
        !saida || saida.trim() === "" ? object.saida : saida.trim();
      object.description =
        !description || description.trim() === ""
          ? object.description
          : description.trim();
      object.colaborador =
        !idcolaborador || idcolaborador.trim() === ""
          ? object.colaborador
          : idcolaborador.trim();
      object.isApproved =
        !isApproved || isApproved.trim() === ""
          ? object.isApproved
          : isApproved.trim();
      const horaextra = await AppDataSource.manager
        .save(HoraExtra, object)
        .catch((e) => {
          return e.message;
        });
      return res.json(horaextra);
    } else {
      return res.json({ error: "Hora Extra não localizada" });
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const object: any = await AppDataSource.getRepository(HoraExtra)
      .createQueryBuilder("horaextra")
      .leftJoinAndSelect("horaextra.colaborador", "idcolaborador")
      .getMany();
    console.log(object);
    return res.json(object);
  }

  public async approve(req: Request, res: Response): Promise<Response> {
    const { idhoraextra } = req.body;

    if (!idhoraextra || idhoraextra.trim() === "") {
      return res.json({ error: "Forneça o identificador da hora extra" });
    }
    const object: any = await AppDataSource.manager.findOneBy(HoraExtra, {
      idhoraextra,
    });

    if (!object.isApproved) {
      object.isApproved = true;
    } else {
      object.isApproved = false;
    }

    const horaextra = await AppDataSource.manager
      .save(HoraExtra, object)
      .catch((e) => {
        return e.message;
      });
    return res.json(horaextra);
  }
}

export default new HoraExtraController();
