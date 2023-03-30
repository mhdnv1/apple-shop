// modal
const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal')
      modalClose = document.querySelector('[data-close]');

modalTrigger.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'
    })
})
function closeModal(){
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''
}
modalClose.addEventListener('click' , closeModal)

modal.addEventListener('click', (e)=>{
   if(e.target == modal){
    closeModal()
   }
})

document.addEventListener('keydown', (e)=>{
    if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal()
    }
})

// ----------------------------------------------------------------------
const products = document.querySelector('.product__cards')
let form = document.querySelector('form')
const getProducts = ()=>{
    fetch('http://localhost:3000/cards')
    .then((res) => res.json())
    .then((res)=> res.map((item)=>{
        products.innerHTML += `
                  <div class="product__card">
                    <img src=${item.image} alt="Airpods">
                    <p class="product__card-title">${item.title}</p>
                    <p class="product__card-price">$${item.price}</p>
                    <p class="product__card-price">${item.memory}</p>
                    <button class="product__btn">Buy</button>
                    <button data-id='${item.id}' class="product__btn delete">Удалить</button>
                </div>  
        `;
        let deleteBtns = document.querySelectorAll('.delete')
        Array.from(deleteBtns).forEach((btn)=>{
            btn.addEventListener('click' , ()=>{
                fetch('http://localhost:3000/cards' + `/${btn.dataset.id}`,{
                    method:"DELETE"
                })
                .then(()=> getProducts())
                .catch((eror)=> alert('ошибка delete'))
            })
        })
    }))
    .catch((eror)=> console.log(eror))
}
getProducts()

form,addEventListener('submit', (e)=>{
    e.preventDefault()
    let products = {
        title : e.target[0].value,
        price : e.target[1].value,
        memory : e.target[2].value,
        image : e.target[3].value,
    }
    fetch('http://localhost:3000/cards',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(products)
    }).then(()=>{
        (e.target[0].value = ''),
        (e.target[1].value = ''),
        (e.target[2].value = ''),
        (e.target[3].value = '')
        getProducts()
    }).catch((eror)=> console.log(eror))
})