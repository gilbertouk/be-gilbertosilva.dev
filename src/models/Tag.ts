import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Project } from "./Project";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Project, (project) => project.tags)
  projects: Project[];
}
