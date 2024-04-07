

import { Todo } from "src/todos/entities/todo.entity"
import { User } from "src/users/entities/user.entity"
import {DataSource, DataSourceOptions} from "typeorm"

export const dataSourceOptions: DataSourceOptions = {
    type : 'postgres',
    host : 'localhost',
    username : 'postgres',
    password : 'password',
    database : 'todos',
    entities: [Todo,User],
    migrations : ['dist/db/migrations/*.js'],
    synchronize: true
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;