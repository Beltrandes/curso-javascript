class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia    
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Bd {
    
    constructor() {
        let id = localStorage.getItem('id')

        if( id === null) {
            localStorage.setItem('id', 0)
        }
    }
    
    getNextId() {
        let nextId = localStorage.getItem('id') //null
        return parseInt(nextId) + 1
    }
    
    gravar(d) {
       
       let id = this.getNextId()
       
       localStorage.setItem(id, JSON.stringify(d)) 
       
       localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        
        let despesas = []
        
        let id = localStorage.getItem('id')

        for(let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))
            
            if(despesa === null) {
                continue
            }
            despesa.id = i
            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa) {
        let despesasFiltradas = []
        despesasFiltradas = this.recuperarTodosRegistros()
        console.log(despesasFiltradas)
        console.log(despesa)

        

       // console.log(despesa)

       // console.log(despesasFiltradas)

        if(despesa.ano != '') {
            console.log('filtro de ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        
        if(despesa.mes != '') {
            console.log('filtro de mes')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        
        if(despesa.dia != '') {
            console.log('filtro de dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        
        if(despesa.tipo != '') {
            console.log('filtro de tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }    
        
        if(despesa.descricao != '') {
            console.log('filtro de descricao')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        } 
        
        if(despesa.valor != '') {
            console.log('filtro de valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }  
        
        return despesasFiltradas
    }

    remover(id) {
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

function cadastrarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value  
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)


    if(despesa.validarDados()) {
        bd.gravar(despesa)
        // dialog sucesso
        document.getElementById('modalTitulo').innerHTML = 'Registo inserido com sucesso'
        document.getElementById('modalCorTitulo').className = 'modal-header text-success'
        document.getElementById('modalTexto').innerHTML = 'Uma nova despesa foi incluída com sucesso!'
        document.getElementById('botaoVoltar').className = 'btn btn-success'
        document.getElementById('botaoVoltar').innerHTML = 'Voltar'
        
        $('#modalRegistraDespesa').modal('show')

        let ano = document.getElementById('ano').value = ''
        let mes = document.getElementById('mes').value = ''
        let dia = document.getElementById('dia').value = ''
        let tipo = document.getElementById('tipo').value = ''
        let descricao = document.getElementById('descricao').value = ''
        let valor = document.getElementById('valor').value = ''
        
        
    } else {
        //dialog erro
        document.getElementById('modalTitulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modalCorTitulo').className = 'modal-header text-danger'
        document.getElementById('modalTexto').innerHTML = 'Nenhuma despesa foi incluida, preencha corretamente todos os campos!'
        document.getElementById('botaoVoltar').className = 'btn btn-danger'
        document.getElementById('botaoVoltar').innerHTML = 'Voltar e corrigir'

        $('#modalRegistraDespesa').modal('show')
    }

}

function carregarListaDespesas(despesas = Array(), filtro = false) {
    
    if(despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros()
    }

   

    let listaDespesas = document.getElementById('listaDespesas')

    listaDespesas.innerHTML = ''

    despesas.forEach(function(d) {
        let linha = listaDespesas.insertRow() 

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo

        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = `R$ ${d.valor}`

        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function() {
            let id = this.id.replace('id_despesa_', '')
            
            bd.remover(id)

            window.location.reload()
        }
        linha.insertCell(4).append(btn)
        
        console.log(d)
    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value  
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    

    let despesas = bd.pesquisar(despesa)

    carregarListaDespesas(despesas, true)
}






