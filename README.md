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

