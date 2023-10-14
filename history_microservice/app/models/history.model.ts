import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
} from 'sequelize-typescript'

@Table
export default class User extends Model {
	@PrimaryKey
	@Column(DataType.INTEGER)
		id?: number
		
	@Column(DataType.INTEGER)
		userId!: number

	@Column(DataType.STRING)
		login!: string

	@Column(DataType.STRING)
		event!: string
}
