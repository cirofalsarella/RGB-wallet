import express, { response } from 'express';
import bodyParser from 'body-parser';
import json from 'body-parser/lib/types/json';

const cors = require('cors');
const connection = require('./database/connection');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = "ICMCJR";

const server = express();

server.use(cors({}));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json())


/*
  GET:    '/Users' -> retorna todos os usuários
  GET:    '/Users/:user_name' -> retorna o usuario com esse user_name
  POST:   '/Users' -> adiciona um usuário
  PUT:    '/Users' -> atualiza um usuário
  DELETE: '/Users:user_name' -> deleta um usuário
  PUT:    '/Admin/Saldo' -> faz a soma dos saldos
  PUT:    '/Admin/Zera' -> zera os saldos
*/


//************  C.R.U.D ************

//Funcao que retorna todos os usuarios
server.get("/Users", async (req, res) => {
  const users = await connection('users').select('*');

  return res.status(200).send(users);   //retorna toda a lista de usuario do DB
})

//Funcao que retorna um usuario
server.get("/Users/:user_name", async (req, res) => {
  try {
    const searched_user_name = req.params.user_name;       //pega o username para fazer a busca
    const user_db = await connection('users').where('user_name', searched_user_name).first();  //busca no DB

    console.log(user_db);

    return res.status(200).json(user_db); //retorna o usuario
  } catch (err) {
    return res.status(404);
  }

})

//Funcao que adiciona um usuario  
server.post("/Users", async (req, res) => {
  const { user_name, name, sold, working, weeks_10h } = req.body;       //salva o username,nome,se vendeu este mes,se esta em um projeto,e quantas semanas trabalhou
  const sum = 0;                                                      //saldo zerado
  const user = { user_name, name, sold, working, weeks_10h, sum }       //cria o usuario com os dados coletados
try{
  const response = await connection('users').insert({
    user_name,
    name,
    sold,
    working,
    weeks_10h,
    sum,
  })
  return res.status(200).send(user);
 
}catch(err){
  return res.status(400).send(err);
}
  

});

//Funcao que atualiza um usuario
server.put("/Users/:user_name", async (req, res) => {
  const user_name2 = req.params.user_name;                                 //username a ser atualizado

  const { user_name, name, sold, working, weeks_10h, sum } = req.body;      //info do usuario atualizado
  const user_db = { user_name, name, sold, working, weeks_10h, sum };
  try{
    const response =  await connection('users').where('user_name', user_name2).update({ user_name, name, sold, working, weeks_10h, sum }); //atualiza no DB

    return res.status(200).send(user_db);    //retorna o usuario atualizado

  }catch(err){
    return res.status(400).send(err);
  }
  
})

//Funcao que deleta um usuario
server.delete("/Users/:user_name", async (req, res) => {
  const user_name = req.params.user_name;         //username do usuario a ser deletado
  const user_db = await connection('users').where('user_name', user_name).delete(); //deleta no DB

  return res.status(204).send();     //retorna a lista atualizada
})




//****************** Botões ******************

//funcao que atualiza o saldo de todos
server.put("/Admin/Saldo", async (req, res) => {
  let users = await connection('users').select('*');      //resgata a lista do DB

  //altera no DB o valor do saldo de cada usuario
  users.forEach(async user => {
    user.sum += (40 + (5 * user.weeks_10h) * (1 + (user.sold && 0.2) + (user.working && 0.1)));
    await connection('users').where('user_name', user.user_name).update({
      sum: user.sum
    })
  })

  return res.status(204).send();    //retorna o usuario atualizado

})

//funcao de zerar o saldo de todos os usuarios
server.put("/Admin/Zera", async (req, res) => {
  await connection('users').select('*').update({            //passa pela lista do DB zerando o saldo
    sum: 0
  });

  return res.status(204).send();    //retorna o usuario atualizado

})





//****************** Login *******************

//funcao que adiciona um admin
server.post("/login/add", (request, response, next) => {''
  bcrypt.hash(request.body.password, 10)
    .then(hashedPassword => {
      return connection('admin').insert({
        username: request.body.username,
        password: hashedPassword
      })
        .then(users => {
          response.json(users[0])
        })
        .catch(error => next(error))
    })
})

//funcao que retorna todos os admin
server.get("/login/all", (request, response, next) => {
  connection('admin')
    .then(users => {
      response.json(users)
    })
})

//funcao que faz o login
server.post("/login", async (request, response, next) => {
  await connection('admin')
    .where({ username: request.body.username })
    .first()
    .then(user => {
      if (!user) {
        response.status(401).json({
          error: "No user by that name"
        })
      } else {
        return bcrypt
          .compare(request.body.password, user.password)
          .then(isAuthenticated => {
            if (!isAuthenticated) {
              response.status(401).json({
                error: "Unauthorized Access!"
              })
            } else {
              return jwt.sign(user, SECRET, (error, token) => {
                response.status(200).json({ token })
              })
            }
          })
      }
    })
})

//verificacao do token
server.get("/login/verify", (request, response, next) => {
  const token = request.headers.authorization.split(" ")[0]
  jwt.verify(token, SECRET, (error, decodedToken) => {
    if (error) {
      response.status(401).json({
        username: "$$$$$$$$"
      })
    } else {
      response.status(200).json({
        id: decodedToken.id,
        username: decodedToken.username
      })
    }
  })
})

server.listen(3001, function () {
  console.log("rodando");
});