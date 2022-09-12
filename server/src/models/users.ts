import { Table, Model, Column, DataType, Sequelize } from "sequelize-typescript";
import bcrypt from "bcryptjs";

@Table({
  timestamps: false,
  tableName: 'users',
})

export class Users extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!:number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!:string;

  @Column({
    type:DataType.STRING,
    allowNull: false,
  })
  lastname!:string;

  @Column({
    type:DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!:string;

  @Column({
    type:DataType.STRING,
  })
  gender!:string;

  @Column({
    type:DataType.STRING,
  })
  phonenumber!:string;

  @Column({
    type:DataType.STRING,
    allowNull: false,
  })
  password!:string;

  @Column({
    type:DataType.STRING,
  })
  picture!:string;
}

// Users.beforeCreate( async (password ) => {
//   const salt = await bcrypt.genSalt(10)
//   return bcrypt.hash(password, salt)
// })

