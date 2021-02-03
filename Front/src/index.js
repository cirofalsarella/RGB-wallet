import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/*
import express from 'express';
import bodyParser from 'body-parser';


const server = express();
server.use(budyParser.urlencoded({extended: true}));
server.use(bodyParser.json())

let users = [];                     //lista de usuarios
//************  C.R.U.D ************

//Funcao que retorna todos os usuarios
server.get("/Users", (req,res) => {
  return res.status(200).send(users);   //retorna toda a lista de usuarios
})

//Funcao que retorna um usuario
server.get("/Users/UserName", (req,res) => {
  const user_name = req.params.user_name;       //pega o username para fazer a busca
  let searched_user;                            //variavel que salvara o usuario buscado

  users.array.forEach(user => {                 //loop que passa por cada usuario 
    if(user.user_name === user_name){           //caso os nomes de usuarios batam, do loop com o do requirido
      searched_user = user;                     //salva o usuario
    }

    return res.status(200).send(searched_user); //retorna o usuario
  })

})

//Funcao que adiciona um usuario
server.post("/Users", (req,res) => {
  const user_name = req.body.user_name;       //armazena o username
  const name = req.body.name;                 //o nome do usuario
  const weeks_10h = req.body.weeks_10h;       //quantas semanas trabalhou por 10h
  const sold = false;                         //se vendeu projeto*******
  const working = false;                      //se esta trabalhando em algum projeto********
  const sum = "0";                            //saldo

  if(req.body.sold == "true"){                //ainda nao sei trabalho com boolean entao assumo que ele le um string 
    sold = true;                              //entao transformo em boolean para ser armazenado
  }
  if(req.body.working == "true"){
    working = true;
  }
  

  const user = {user_name, name, sold, working, weeks_10h, sum} //cria o usuario com os dados coletados
  users.push(user);                                             //insere na lista

  return res.status(202).send(user);                            //retorna o usuario adicionado
})

//Funcao que atualiza um usuario
server.put("/Users/UserName", (req,res) => {
  const user_name = req.params.user_name;                                 //username a ser atualizado
  const {user_name, name, sold, working, weeks_10h, sum} = req.body;      //info do usuario atualizado
  let new_users = [];                                                     //nova lista com o usuario atualizado
  const updated_user = {user_name, name, sold, working, weeks_10h, sum}   //usuario atualizado

  users.array.forEach(user => {                           //loop que adiciona os usuarios na nova lista
    if(user.user_name === user_name){                     //se for igual ao username 
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
server.delete("/Users/UserName", (req,res) => {
  const user_name = req.params.user_name;         //username do usuario a ser deletado
  let new_users = [];                             //nova lista de usuarios
  
  users.array.forEach(user => {                   //loop que passa por toda a lista
    if(user.user_name !== user_name){             //caso os usernames sejam diferentes
      new_users.push(user);                       //adiciona na lista excluindo assim somente o usario deletado
    }
       
  })

  users = new_users;                      //atualiza a lista

  return res.status(200).send(users);     //retorna a lista atualizada
})

/*
*Ainda falta fazer a atualização do saldo
*atualização do sistema com o mes passa, setando as weeks_10h para zero
*zerar os saldos
*/


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
