const productos = [
    {
        id: 1,
        name: 'Bola con Chupa',
        price: 10,
        imagen: './imagen/producto 1.jpg',
        contador: 1,
        total: 0
    },
    {
        id: 2,
        name: 'Hueso de goma',
        price: 8,
        imagen: './imagen/producto 5.jpg',
        contador: 1,
        total: 0
    },
    {
        id: 3,
        name: 'Cerdo chillón',
        price: 15,
        imagen: './imagen/producto 6.jpg',
        contador: 1,
        total: 0
    },
    {
        id: 4,
        name: 'Palo con pluma',
        price: 8,
        imagen: './imagen/producto 2.jpg',
        contador: 1,
        total: 0
    },
    {
        id: 5,
        name: 'Control Mouse',
        price: 20,
        imagen: './imagen/producto 3.jpg',
        contador: 1,
        total: 0
    },
    {
        id: 6,
        name: 'tunel cañon',
        price: 25,
        imagen: './imagen/producto 4.jpg',
        contador: 1,
        total: 0
    }
]

const db = {
    items: productos,
    methods:{
        find: function (id){
            return db.items.find(function (item){return item.id === id })
        },
        render: function (){
            let html = ''
            html += '<ul>'
            html += db.items.map(function (item) {return `<div class="centrar">  <div class="centrar diseñoBoxProductos">  <div class="img"><img src="${item.imagen}" alt=""></div> <div class="boxTexto"> ${item.name} ==> $${item.price}</div> <button class ="btn-add button" data-id="${item.id}"> add to cart</button></div> </div>` }).join('')
            html += '</ul>'
            console.log(html)
            return html
        }
    }
}
let sumaFinal = 0
let sumaParcial = 0
const cart = {
    items: [],
    methods:{
        add: function (id){
            if(cart.methods.isAlreadyInCart(id) ){
               return cart.items.find(function (item){ if(item.id ===id) {return item.id ===id, item.contador = item.contador + 1 } })
            }else{
                const item = db.methods.find(id)
                cart.items.push(item)
            }
            
        },
        remove: function (id){
            cart.items = cart.items.filter(function (item) { if (item.contador > 1)  {return item.id !== id,item.contador = item.contador - 1} else {return item.id !== id} })
        },
        isAlreadyInCart: function (id){
           return cart.items.find(function (item){return item.id ===id})
        },
        count:function(){
            return cart.items.length
        },
        total:function(sumaFinal,sumaParcial){
            for(let i=0 ; i < cart.items.length ; i++){
                sumaParcial = cart.items[i].price * cart.items[i].contador
                sumaFinal = sumaFinal + sumaParcial
            }return sumaFinal
            
        },
        render: function(){
            let html = ''
                html += '<ul>'
                html += cart.items.map(function (item) {return `<li data-id="${item.id}"> ${item.contador} ${item.name} - $${item.price*item.contador}<button class ="btn-remove  button" data-id="${item.id}"> delete</button></li>`}).join('')
                html += '</ul>' 
                return html
        }
    }
}

const total = document.getElementById('total')
total.innerHTML = cart.methods.total(sumaFinal,sumaParcial)

const count = document.getElementById('count')
count.innerHTML = cart.methods.count()

const produc = document.getElementById('produc')
produc.innerHTML = db.methods.render()

const cartContainer = document.getElementById('cart')
const wrapper = document.getElementById('wrapper')


wrapper.addEventListener('click',function (e) {
    if (e.target.matches('.btn-add')){
        let id = e.target.dataset.id
        cart.methods.add(+id)
        count.innerHTML = cart.methods.count()
        total.innerHTML = cart.methods.total(sumaFinal,sumaParcial)
        cartContainer.innerHTML = cart.methods.render()
    }

    if (e.target.matches('.btn-remove')){
        let id = e.target.dataset.id
        cart.methods.remove(+id)
        count.innerHTML = cart.methods.count()
        if(cart.methods.count() === 0){
            sumaFinal = 0
            total.innerHTML = cart.methods.total(sumaFinal,sumaParcial)
        }else{
            total.innerHTML = cart.methods.total(sumaFinal,sumaParcial)
        }
        cartContainer.innerHTML = cart.methods.render()
    }
})

console.log(cart.items)
