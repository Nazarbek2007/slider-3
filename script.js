const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 600,
        amount: 0,
        get Sum() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 1000,
        amount: 0,
        get Sum() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 1200,
        amount: 0,
        get Sum() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    }
}

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 1000,
        kcall: 500
    },
    lettuce: {
        name: 'Салатный лист',
        price: 400,
        kcall: 50
    },
    cheese: {
        name: 'Сыр',
        price: 600,
        kcall: 300
    }
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');

for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener('click', function () {
        plusOrMinus(this)
    })
}


function plusOrMinus(element) {
    /* 
        closest() - Подключается к родителю
        getAttribute() - получает значение атрибута у элемента HTML
    */

    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        elementAttribute = element.getAttribute('data-symbol'),
        productAmount = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span');

    if (elementAttribute == '+') {
        product[parentId].amount++
    } else if (elementAttribute == '-' && product[parentId].amount > 0) {
        product[parentId].amount--
    }

    productAmount.innerHTML = product[parentId].amount
    price.innerHTML = product[parentId].Sum
    kcall.innerHTML = product[parentId].Kcall
}


const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');


checkExtraProduct.forEach(checkbox => {
    checkbox.addEventListener('click', function () {
        addExtraProduct(this);
    })
})


function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elementAttr = element.getAttribute('data-extra');

    product[parentId][elementAttr] = element.checked

    if (product[parentId][elementAttr] == true) {
        product[parentId].price += extraProduct[elementAttr].price
        product[parentId].kcall += extraProduct[elementAttr].kcall
    } else {
        product[parentId].price -= extraProduct[elementAttr].price
        product[parentId].kcall -= extraProduct[elementAttr].kcall
    }

    price.innerHTML = product[parentId].Sum;
    kcall.innerHTML = product[parentId].Kcall;
}


const addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptWindowOut = document.querySelector('.receipt__window-out');

let arrProduct = [],
    totalPrice = 0,
    totalKcall = 0,
    totalName = '';


addCart.addEventListener('click', function () {
    for (const key in product) {
        if (product[key].amount > 0) {
            arrProduct.push(product[key])
            for (const newKey in product[key]) {
                if (product[key][newKey] === true) {
                    product[key].name += ' | ' + extraProduct[newKey].name
                }
            }
        }
    }

    for (let value of arrProduct) {
        totalPrice += value.price * value.amount;
        totalKcall += value.kcall * value.amount;
        totalName += '\n' + value.name + ' ' + value.amount + ' шт.' + '\n';
    }

    receipt.classList.remove('active');
    receipt.style = `
        display: flex;
        opacity: 1;
    `

    receiptWindow.style = `
        background: #fff;
        padding: 100px;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
    `

   
    
    if (totalPrice == 0) {
        /* alert('Вы ничего заказали'); */
        
        const parentbox = document.querySelector('#box1')
        
        
        square = document.createElement('div')
        square.classList.add('square')
        parentbox.appendChild(square)

        p = document.createElement('p')
        p.classList.add('p')
        square.appendChild(p)

        p.innerHTML = "Вы нечего не заказали!"

        p.style = `
       display: flex;
       font-size: 30px;
       justify-content: center;
       align-items: center;
       width: 100%;
       height: 100%;
       `

        square.style = `
       width: 400px;
       height: 100px;
       background: white;
       margin: 0 auto;
       border-radius: 15px;
       `

        parentbox.style = `
       position: absolute;
       width: 100%;
       top: 50%;
       justify-content: center;
       `
       
       
    addCart.style = `
    display: none;
    opacity: 0;
    `
    
        setTimeout(() => {
            parentbox.style = `opacity: 0;`
            p.style = `
            display: none;
            width: 0;
            height: 0;
            font-size: 0;
            `
            square.style = `
            width: 0;
            height: 0;
            background: none;
            `
            addCart.style =`
            opacity: 5;
            display: flex;
            `
        }, 2000);

    receipt.style.display = 'none';
    
    
    }
    
    
     receiptWindowOut.innerHTML = `Вы купили: \n ${totalName} \n Каллорийность ${totalKcall} \n Общая сумма ${totalPrice}`
})


const receiptBtn = document.querySelector('.receipt__window-btn');

receiptBtn.addEventListener('click', function () {
    location.reload();
})
