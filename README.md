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
| `BD_URL`    | `string` | **Required**. database URL                       |
| `JWT_SECRET`             | `string` | **Required**. key to validate the jwt refresh token |

## Colaboradores Requests

CRIAR COLABORADOR
```http
POST /colaborador/create
```

| Parameter   | Type      | Description                                                      | from |
| :---------- | :-------- | :--------------------------------------------------------------- | :--- |
| `nome`      | `string`  | **Required**. Nome colaborador                                         | body |
| `matricula` | `string`  | **Required**. Matricula colaborador                                    | body |
| `perfil`    | `string`  | Pefil do colaborador na empresa ['colaborador', 'admin', 'gestor'] | body |
| `senha`     | `string`  | **Required**. Senha colaborador                                   | body |
| `isActive`  | `boolean` | **default: true**. Informativo se colaborador esta ativo na empresa  | body |

Responses

- _400_ - `"All inputs are required"`
- _409_ - `"Colaborador ja existe"`
- _201_ - User information generated in object format :

```javascript
{ 
    "idcolaborador": idcolaborador,
    "nome": nome, 
    "matricula": matricula,  
    "idgestor": idgestor, 
    "perfil": perfil, 
    "senha": senha 
}
```

LOGIN COLABORADOR
```http
POST /login
```

| Parameter  | Type     | Description                 | from |
| :--------- | :------- | :-------------------------- | :--- |
| `matricula`    | `string` | **Required**. Matricula colaborador   | body |
| `senha` | `string` | **Required**. Senha colaborador | body |

Responses

- _400_ - `"Invalid matricula or password"`
- _200_ - User information stored in database :

```javascript
{ 
    "matricula": matricula,  
    "perfil": perfil, 
    "token": token 
}
```

ATUALIZAR DADOS COLABORADOR
```http
PUT /colaborador/update
```
| Parameter  | Type      | Description                                                      | from |
| :----------| :-------- | :--------------------------------------------------------------- | :--- |
| `nome`     | `string`  | . Nome colaborador                                         | body |
| `perfil`   | `string`  | Pefil do colaborador na empresa ['colaborador', 'admin', 'gestor'] | body |
| `idgestor` | `string`  | Identificador do Gestor responsavel pelo colaborador           | body |
| `idcolaborador`  | `string` |  Identificador do colaborador  | body |
| `token`    | `string`  |  Token JWT de autenticação  | Authentication header |

Responses: 

```javascript
{ 
    "idcolaborador": idcolaborador,
    "nome": nome, 
    "matricula": matricula,  
    "idgestor": idgestor, 
    "perfil": perfil, 
    "senha": senha 
}
```

LISTAR COLABORADORES
```http
GET /colaborador/:perfil
```
| Parameter | Type     | Description                                                      | from |
| :---------| :--------| :--------------------------------------------------------------- | :--- |
| `perfil`  | `string` | Pefil do colaborador na empresa ['colaborador', 'admin', 'gestor'] | req.params |

Responses: 

```javascript
{ 
    listagem de todos os colaboradores de acordo com o perfil desejado informado na url do request
}
```

## Horas Extras Requests

CRIAR HORA EXTRA
```http
POST /horaextra/create
```

| Parameter   | Type      | Description                                                      | from |
| :---------- | :-------- | :--------------------------------------------------------------- | :--- |
| `entrada`   | `string`  | Dia e hora da entrada do colaborador                             | body |
| `saida` | `string`  | Dia e hora da saida do colaborador                                   | body |
| `description`    | `string`  | Descrição da Hora Extra a ser cadastrada                    | body |
| `idcolaborador`     | `string`  | Identificador do colaborador                             | body |
| `isApproved`     | `boolean`  | **Default: false** Aprovação da hora extra                 | body |
| `token`  | `string` | Token JWT para autenticação                         | Authentication header |

entrada, saida, description, idcolaborador
Responses

- _400_ - `"All inputs are required"`
- _201_ - Hora Extra information generated in object format :

```javascript
{ 
    "idhoraextra": idhoraextra,
    "idcolaborador": idcolaborador,
    "entrada": entrada, 
    "saida": saida,
    "description": descriçao,
    "isApproved": false 
}
```

EDITAR HORA EXTRA
```http
PUT /horaextra/update
```

| Parameter   | Type      | Description                                                      | from |
| :---------- | :-------- | :--------------------------------------------------------------- | :--- |
| `entrada`   | `string`  | Dia e hora da entrada do colaborador                             | body |
| `saida` | `string`  | Dia e hora da saida do colaborador                                   | body |
| `description`    | `string`  | Descrição da Hora Extra a ser cadastrada                    | body |
| `idcolaborador`     | `string`  | Identificador do colaborador                             | body |
| `isApproved`     | `boolean`  | **Default: false** Aprovação da hora extra                 | body |
| `idhoraextra`     | `string`  | Identificador hora extra                                   | body |
| `token`  | `string` | Token JWT para autenticação                         | Authentication header |

Responses

- _400_ - `"All inputs are required"`
- _201_ - Returned Hora Extra in object format :

```javascript
{ 
    "idhoraextra": idhoraextra,
    "idcolaborador": idcolaborador,
    "entrada": entrada, 
    "saida": saida,
    "description": descrição,
    "isApproved": false 
}