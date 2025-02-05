import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Tag } from "./Tag";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  imageUrl: string;

  @Column()
  repoUrl: string;

  @Column()
  serviceUrl: string;

  @Column()
  isBackend: boolean;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
