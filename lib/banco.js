const sqlite = require('sqlite')
const path = require('path')

const dbConnection = sqlite.open(path.resolve(__dirname, '../banco.sqlite'), { Promise })

const init = async() => {
    const db = await dbConnection
    await db.run('create table if not exists esfera(id INTEGER PRIMARY KEY, tipo TEXT);')
    await db.run('create table if not exists estado(id INTEGER PRIMARY KEY, nome TEXT, sigla TEXT, pasta TEXT);')
    await db.run('create table if not exists cidade(id INTEGER PRIMARY KEY, estado TEXT, nome TEXT, sigla TEXT, pasta TEXT);')
    await db.run('create table if not exists orgao(id INTEGER PRIMARY KEY, esfera TEXT, estado TEXT, cidade TEXT, nome TEXT, logo TEXT);')
    const tipo = ['Federal','Estadual','Municipal']
    await tipo.map( key => (db.run(`insert into esfera(tipo) values('${key}')`)))
    
    const estado = "Bahia"
    const estado_sigla = "BA"
    const estado_pasta = estado_sigla+"/"
    await db.run(`insert into estado(nome, sigla, pasta) values('${estado}', '${estado_sigla}', '${estado_pasta}')`)
    
    const cidade = "Feira de Santana"
    const cidade_sigla = "FSA"
    const cidade_pasta = cidade_sigla+"/"
    await db.run(`insert into cidade(estado, nome, sigla, pasta) values('${estado}', '${cidade}', '${cidade_sigla}', '${cidade_pasta}')`)
    
    const orgao = "SMT"
    const logo = "smt.png"
    await db.run(`insert into orgao(esfera, estado, cidade, nome, logo) values('${tipo[2]}', '${estado}', '${cidade}', '${orgao}', '${logo}')`)
}

module.exports = {
    init
}