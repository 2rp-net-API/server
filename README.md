# API back-end

Exemplo de uso de migrations e autenticação de usuários (perfil: admin, gestor e colaborador).

## Modelo de dados da aplicação

![Texto alternativo para a imagem](https://github.com/arleysouza/api-scripts-2022-2-back/blob/master/imagens/modelo.png)

## Como utilizar

Execute o comando a seguir para criar o arquivo de migração com as cláusulas SQL para criar as tabelas e restrições no SGBD. O arquivo de migração será criado na pasta `src/migrations`:

```
npm run migration:generate
```

Execute o comando a seguir para submeter as cláusulas SQL do arquivo de migração no SGBD:

```
npm run migration:run
```

Execute o comando a seguir se desejar reverter a última migração. O comando a seguir precisará ser repetido até retornar em um ponto desejado:

```
npm run migration:revert
```

## API documentation

_for this project to work it is necessary to provide some key values in the .env file (if running locally)_

| Parameter                | Type     | Description                                         |
| :----------------------- | :------- | :-------------------------------------------------- |
| `PORT`                   | `string` | **Required**. Port where the API will run           |
| `TYPEORM_CONNECTTION`    | `string` | **Required**. database type                         |
| `TYPEORM_HOST`           | `string` | **Required**. database host                         |
| `TYPEORM_USERNAME`       | `string` | **Required**. database username                     |
| `TYPEORM_PASSWORD`       | `string` | **Required**. database password                     |
| `TYPEORM_DATABASE`       | `string` | **Required**. database name                         |
| `TYPEORM_PORT`           | `string` | **Required**. database port                         |
| `TYPEORM_MIGRATIONS`     | `string` | **Required**. src/database/migrations/\*.ts         |
| `TYPEORM_MIGRATIONS_DIR` | `string` | **Required**. src/database/migrations               |
| `JWT_SECRET`             | `string` | **Required**. key to validate the jwt refresh token |

## Users Requests

```http
POST /signup
```

| Parameter     | Type      | Description                                                     | from |
| :------------ | :-------- | :-------------------------------------------------------------- | :--- |
| `name`        | `string`  | **Required**. User name                                         | body |
| `email`       | `string`  | **Required**. User email                                        | body |
| `phone`       | `string`  | User phone                                                      | body |
| `matricula`   | `string`  | **Required**. User matricula                                    | body |
| `position`    | `string`  | Posição do usuario na empresa                                   | body |
| `password`    | `string`  | **Required**. User password                                     | body |
| `description` | `string`  | Descrição do funcionario                                        | body |
| `isActive`    | `boolean` | **default: true**. Informativo se usuario esta ativo na empresa | body |

Responses

- _400_ - `"All inputs are required"`
- _409_ - `"User already exists"`
- _201_ - User information generated in object format :

```javascript
{
    "name": name,
    "email": email,
    "phone": phone,
    "matricula": matricula,
    "position": position,
    "description": description,
    "isActive": true,
    "id": number
}
```

```http
POST /login
```

| Parameter  | Type     | Description                 | from |
| :--------- | :------- | :-------------------------- | :--- |
| `email`    | `string` | **Required**. User email    | body |
| `password` | `string` | **Required**. User password | body |

Responses

- _400_ - `"Invalid email or password"`
- _401_ - `"Invalid token"`
- _200_ - User information stored in database :

{
"user": {
"id": id,
"name": name,
"email": email,
"phone": phone,
"matricula": matricula,
"position": position,
"description": description,
"isActive": boolean
},
"token": jwtToken
}
