const express = require('express');
const app = express();
const cors = require('cors');

const Usuario = require('./models/Usuario');

const valida = require('./middlewares/validaStr');
const { where } = require('sequelize');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

app.get('/', (req, res)=>{
    res.json({mensagem: 'Teste de api'});
})


app.get('/ler', (req, res)=>{

})


app.post('/mensagem', (req, res)=>{
    let {texto, pessoa} = req.body;
    if(texto!==''){
        texto = valida.toLowerF(texto);
        texto = valida.trimF(texto);
        const dataAtual = new Date();
        dataAtual.setHours(dataAtual.getHours() - 3);

        let dataFormatada = dataAtual.toLocaleDateString('pt-BR');
        let hour = dataAtual.getHours();
        let min = dataAtual.getMinutes();

        dataFormatada = dataFormatada + ' ' + hour + 'h' + (min < 10 ? '0' + min : min);
        pessoa = valida.toLowerF(pessoa);
        
        Usuario.create({
            nome: pessoa,
            mensagem: texto,
            data: dataFormatada
        }).then(()=>{
            console.log('Usuario e seu texo criados!');
        }).catch((err)=>{
            console.log('Erro! '+err);
        })

        console.log(texto)
        console.log(pessoa)
        res.json({sucesso: true, mensagem: texto, pessoa: pessoa, data: dataFormatada})
    }
    else{
        console.log('Ta vazio');
        res.json({sucesso: false, mensagem: texto, pessoa: pessoa, data:null})
    }
        
})

app.get('/lermensagem', (req, res)=>{
    Usuario.findAll({ order: [['createdAt', 'DESC']]}).then((valores)=>{
        if(valores.length > 0){

            res.json({usuarios: valores.map(valores => valores.toJSON())});
        }
        else
            res.json({usuarios: []});
    }).catch((err)=>{
        console.log(err);
    })

})

app.post('/update', (req, res)=>{
    let mensagem = req.body.msg;
    let nome = req.body.nome;
    let id = req.body.id;
    if(mensagem){
        console.log('recebido a mensagem');
    }
    else
        console.log('nao recebido a mensagem');
    const dataAtual = new Date();
    // subtrair 3 horas
    dataAtual.setHours(dataAtual.getHours() - 3);

    let dataFormatada = dataAtual.toLocaleDateString('pt-BR');
    let hour = dataAtual.getHours();
    let min = dataAtual.getMinutes();

    dataFormatada = dataFormatada + ' ' + hour + 'h' + (min < 10 ? '0' + min : min);
    mensagem = valida.trimF(mensagem);
    Usuario.update({
        nome: nome,
        mensagem: mensagem,
        data_edicao: dataFormatada
    },{
        where: {
            id:id
        }
    }).then(()=>{
        if(mensagem !==''){
            res.json({sucesso: true})
            console.log('mensagem salva!')
        }
        else{
            res.json({sucesso: false});
        }
    }
    ).catch((err)=>{
        res.json({sucesso: false})
        if(err){
            console.log('erro ao fazer o update' + err)
        }
    })
})

app.post('/excluir', (req, res)=>{
    const {id} = req.body;
    Usuario.destroy({
        where:{
            id:id
        }
    }).then(
        res.json({sucesso:true})
    ).catch((err)=>{
        if(err){
            res.json({sucesso:false})
            console.log("Erro ao excluir: "+err)
        }
    })
})

app.listen(PORT, (err)=>{
    if(err){
        throw err;
    }
    else
        console.log(`Server rodando em http://localhost:${PORT}`);
})
