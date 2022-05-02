import { ObjectLiteral, PrimaryGeneratedColumn, VersionColumn } from "typeorm";

export abstract class BaseEntity implements ObjectLiteral {
	@PrimaryGeneratedColumn("increment", { type: "bigint", unsigned: true })
	public id: string;

	@VersionColumn()
	public version: string;

	public toString() {
		return this.constructor.name + " [ID=" + this.id + "]";
	};
}
