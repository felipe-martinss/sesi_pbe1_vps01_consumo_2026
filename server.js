const express = require("express")
const equipamentos = require("./dados.json")
const cors = require("cors")


const rotaInicial = (req, res) => {
    res.json("Back-end respondendo")
}


function autoIncrement() {
    return Number(equipamentos[equipamentos.length - 1].id) + 1
}


const cadastrarEquipamento = (req, res) => {
    const equipamento = req.body
    equipamento.id = autoIncrement()
    equipamentos.push(equipamento)
    res.status(201).json(equipamento)
}

const listar = (req, res) => {
    res.json(equipamentos)
}

const listarporID = (req, res) => {
    const id = req.params.id
    let status = 0

    equipamentos.forEach((equipamento) => {
        if (equipamento.id == id) {
            res.send(equipamento)
        }
    }
    )
}

const listarporEquipamento = (req, res) => {
    const Equip = req.params.equipamento
    let satus = 0

    equipamentos.forEach((equipamento)=> {
        if (equipamento.equipamento == Equip) {
            res.send(equipamento)
        }
    })
    }


const listarporLocal = (req, res) => {

}

const atualizar = (req, res) => {
    const id = req.params.id
    const dados = req.body
    dados.id = Number(id)
    let status = 0

    equipamentos.forEach((equipamento, indice) => {
        if (equipamento.id == id) {
            equipamentos[indice] = dados
            status = 1
        }
    })

    if (status == 1) {
        res.status(202).json(dados)
    } else {
        res.status(404).send("Equipamento não encontrado")
    }
}

const excluir = (req,res)=>{
    const id = req.params.id
    let status = 0

    equipamentos.forEach((equipamento, indice)=>{
        if(equipamento.id == id){
            equipamentos.splice(indice,1)
            status =1
        } 
    })

    if (status==1){
        res.json("Equipamento excluido com sucesso!")
    } else {
        res.status(404).send("Equipamento não encontrado")
    }
}


const porta = 3000

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/start', rotaInicial)
app.post("/", cadastrarEquipamento)
app.get("/", listar)
app.get("/:id", listarporID)
app.get("/equipamento/:equipamento", listarporEquipamento)
app.put("/atualizar/:id", atualizar)
app.delete("/:id", excluir)


app.listen(porta, () => {
    console.log(`http://localhost:${porta}/`)
})
