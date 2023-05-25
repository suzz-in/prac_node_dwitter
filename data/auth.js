import SQ from "sequelize";
import { sequelize } from "../db/database.js";

//모델과 테이블 정의를 먼저 해야함
const DataTypes = SQ.DataTypes;
//user 라고 정의하면 s 붙어서 자동으로 테이블 만들어짐
export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: false }
);

export async function findByUsername(username) {
  return User.findOne({ where: { username: username } });
}

export async function findById(id) {
  return User.findByPk(id);
}

export async function createUser(user) {
  return User.create(user).then((data) => {
    return data.dataValues.id;
  });
  // const { username, password, name, email, url } = user;
  // return db
  //   .execute("INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)", [
  //     username,
  //     password,
  //     name,
  //     email,
  //     url,
  //   ])
  //   .then((res) => res[0].insertId);
}
