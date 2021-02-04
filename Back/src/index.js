import express from 'express';
import bodyParser from 'body-parser';

const server = express();

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json())

let users = [];                     //lista de usuarios

//************  C.R.U.D ************

//Funcao que retorna todos os usuarios
server.get("/Users", (req,res) => {
  return res.status(200).send(users);   //retorna toda a lista de usuarios
})

//Funcao que retorna um usuario
server.get("/Users/:user_name", (req,res) => {
  const user_name = req.params.user_name;       //pega o username para fazer a busca
  let searched_user;                            //variavel que salvara o usuario buscado

  users.forEach(user => {                 //loop que passa por cada usuario 
    if(user.user_name === user_name){           //caso os nomes de usuarios batam, do loop com o do requirido
      searched_user = user;                     //salva o usuario
    }
  })

  return res.status(200).send(searched_user); //retorna o usuario
})

//Funcao que adiciona um usuario
server.post("/Users", (req,res) => {
  const {user_name, name, sold, working, weeks_10h} = req.body;       //salva o username,nome,se vendeu este mes,se esta em um projeto,e quantas semanas trabalhou
  const sum = 0;                                                      //saldo zerado

  const user = {user_name, name, sold, working, weeks_10h, sum}       //cria o usuario com os dados coletados
  users.push(user);                                                   //insere na lista

  return res.status(202).send(user);                                  //retorna o usuario adicionado
})

//Funcao que atualiza um usuario
server.put("/Users/:user_name", (req,res) => {
  const user_name2 = req.params.user_name;                                 //username a ser atualizado
  const {user_name, name, sold, working, weeks_10h, sum} = req.body;      //info do usuario atualizado
  let new_users = [];                                                     //nova lista com o usuario atualizado
  const updated_user = {user_name, name, sold, working, weeks_10h, sum}   //usuario atualizado

  users.forEach(user => {                           //loop que adiciona os usuarios na nova lista
    if(user.user_name === user_name2){                     //se for igual ao username 
      new_users.push(updated_user);                       //adiciona o atualizado
    }
    else{                                                 //caso contrario
      new_users.push(user);                               //adiciona o antigo
    }        
  })

  users = new_users;                            //atualiza a lista

  return res.status(200).send(updated_user);    //retorna o usuario atualizado

})

//Funcao que deleta um usuario
server.delete("/Users/:user_name", (req,res) => {
  const user_name = req.params.user_name;         //username do usuario a ser deletado
  let new_users = [];                             //nova lista de usuarios
  
  users.forEach(user => {                   //loop que passa por toda a lista
    if(user.user_name !== user_name){             //caso os usernames sejam diferentes
      new_users.push(user);                       //adiciona na lista excluindo assim somente o usario deletado
    }
       
  })

  users = new_users;                      //atualiza a lista

  return res.status(200).send(users);     //retorna a lista atualizada
})

//****************** Botões *****************

//funcao que atualiza o saldo de todos
server.put("/Admin/Saldo", (req,res) => {
  let new_users = [];                               //nova lista com o usuario atualizado

  users.forEach(user => {                           //loop que adiciona os usuarios na nova lista
    user.sum += (40 +(5 * user.weeks_10h) * (1 + (user.sold && 0.2) + (user.working && 0.1)));
    new_users.push(user);                           //adiciona o atualizado
  })

  users = new_users;                            //atualiza a lista

  return res.status(200).send(users);    //retorna o usuario atualizado

})

//funcao de zerar o saldo de todos os usuarios
server.put("/Admin/Zera", (req,res) => {
  let new_users = [];                               //nova lista com o usuario atualizado

  users.forEach(user => {                           //loop que adiciona os usuarios na nova lista
    user.sum = 0;
    new_users.push(user);                           //adiciona o atualizado
  })

  users = new_users;                            //atualiza a lista

  return res.status(200).send(users);    //retorna o usuario atualizado

})

/*
*Ainda falta fazer a atualização do saldo
*atualização do sistema com o mes passa, setando as weeks_10h para zero
*zerar os saldos
*/

server.listen(3000,function(){
  console.log("rodando");
});