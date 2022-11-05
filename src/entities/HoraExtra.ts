import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Colaborador from "./Colaborador";

@Entity("hora-extra")
export default class HoraExtra {
  @PrimaryGeneratedColumn()
  idhoraextra: number;

  @Column({ type: "varchar" })
  entrada: string;

  @Column({ type: "varchar" })
  saida: string;

  @Column({ type: "boolean", default: false })
  isApproved: boolean;

  @Column({ type: "varchar" })
  description: string;

  @ManyToOne(() => Colaborador, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({
    //Defines which side of the relation contains the join column with a foreign key
    name: "idcolaborador",
    referencedColumnName: "idcolaborador",
    foreignKeyConstraintName: "fk_colaborador_id",
  })
  colaborador: Colaborador;
}
