import express from 'express';
import bodyParser from 'body-parser';
const connection = require('./database/connection');

const server = express();

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json())


//************  C.R.U.D ************

//Funcao que retorna todos os usuarios
server.get("/Users", async (req,res) => {
  const users2 = await connection('users').select('*')
  return res.status(200).send(users2);   //retorna toda a lista de usuario do DB
})

//Funcao que retorna um usuario
server.get("/Users/:user_name", async (req,res) => {
  const user_name = req.params.user_name;       //pega o username para fazer a busca
  const user_db = await connection('users').where('user_name', user_name);  //busca no DB
  
  return res.status(200).send(user_db); //retorna o usuario
})

//Funcao que adiciona um usuario
server.post("/Users", async (req,res) => {
  try{
    const {user_name, name, sold, working, weeks_10h} = req.body;       //salva o username,nome,se vendeu este mes,se esta em um projeto,e quantas semanas trabalhou
    const sum = 0;                                                      //saldo zerado
  
    const user = {user_name, name, sold, working, weeks_10h, sum}       //cria o usuario com os dados coletados
    
    await connection('users').insert({
      user_name,
      name,
      sold,
      working,
      weeks_10h,
      sum,
    })                                                   //insere no DB
  
    return res.status(202).send("Usuario criado com sucesso");                                  //retorna o usuario adicionado

  }catch(error){
      return res.send("UserName já existe");
  }
 
})

//Funcao que atualiza um usuario
server.put("/Users/:user_name", async (req,res) => {
  const user_name2 = req.params.user_name;                                 //username a ser atualizado
  
  const {user_name, name, sold, working, weeks_10h, sum} = req.body;      //info do usuario atualizado
  const user_db = {user_name, name, sold, working, weeks_10h, sum};

  await connection('users').where('user_name', user_name2).update({user_name, name, sold, working, weeks_10h, sum}); //atualiza no DB
 
  return res.status(200).send(user_db);    //retorna o usuario atualizado

})

//Funcao que deleta um usuario
server.delete("/Users/:user_name", async (req,res) => {
  const user_name = req.params.user_name;         //username do usuario a ser deletado
  const user_db = await connection('users').where('user_name', user_name).delete(); //deleta no DB
  
  return res.status(204).send();     //retorna a lista atualizada
})

//****************** Botões *****************

//funcao que atualiza o saldo de todos
server.put("/Admin/Saldo", async (req,res) => {
  let users = await connection('users').select('*');      //resgata a lista do DB

  //altera no DB o valor do saldo de cada usuario
  users.forEach(async user => {       
    user.sum += (40 +(5 * user.weeks_10h) * (1 + (user.sold && 0.2) + (user.working && 0.1)));    
    await connection('users').where('user_name', user.user_name).update({                       
      sum: user.sum
    })
  })

  return res.status(204).send();    //retorna o usuario atualizado

})

//funcao de zerar o saldo de todos os usuarios
server.put("/Admin/Zera", async (req,res) => {
  await connection('users').select('*').update({            //passa pela lista do DB zerando o saldo
    sum:0
  });
  
  return res.status(204).send();    //retorna o usuario atualizado

})

/*
*atualização do sistema com o mes passa, setando as weeks_10h para zero
*/

server.listen(3001,function(){
  console.log("rodando");
});