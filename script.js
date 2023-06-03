import data from './data.json' assert { type: 'json' };
let totallist = data


const cardsContainers = document.querySelector(".section-center")
const showFilterBtns = document.querySelector(".navi-btns")
const showFilterContainer = document.querySelector(".filter-btns")
const clearAll = document.querySelector(".clear")

window.addEventListener("DOMContentLoaded",()=>{
    displayallcards(totallist);
    
})

clearAll.addEventListener("click",clearAllFilter)

function displayallcards(allcards) {
   let newallcards = allcards.map((card)=> {
    return card = `  
    <article class="card ${card.id}">
        <div class="card-info">
            <figure class="info-img">
                <img src=${card.logo} alt="">
            </figure>
        <div class="info-text">
            <div class="text-1">
            <p class="company-name">${card.company}</p>
            <p class="is-new ${card.new}">New!</p>
            <p class="is-featured ${card.featured}">FEATURED</p>
            </div>
            <h3 class="text-2">${card.position}</h3>
            <div class="text-3">
            <span class="time">${card.postedAt}</span>
            .
            <span class="shift">${card.contract}</span>
            .
            <span class="place">${card.location}</span>
            </div>
        </div>
        </div>
            <hr>
        <div class="card-skills">
            <p class="filteritem">${card.role}</p>
            <p class="filteritem">${card.level}</p>
            <p class="btn filteritem">${card.languages[0]}</p>
            <p class="btn filteritem">${card.languages[1]}</p>
            <p class="btn filteritem">${card.languages[2]}</p>
            <p class="btn filteritem">${card.tools[0]}</p>
            <p class="btn filteritem">${card.tools[1]}</p>
        </div>
    </article>`
   })
   newallcards = newallcards.join("")
   cardsContainers.innerHTML = newallcards
   const filterbtns = document.querySelectorAll(".btn")
   /* selectors */
   const filterBtnsContainer = document.querySelectorAll(".card-skills")
   const isnew = document.querySelectorAll(".is-new")
   const isfeatured = document.querySelectorAll(".is-featured")
   const filterItem = document.querySelectorAll(".filteritem")
   /* function to remove undefined data from cards */
   removeundefined(filterbtns)
   removetruefalss(isnew,isfeatured)
   /* filter functions */
   displayfiltercontainer(filterItem,filterBtnsContainer)

}


function removeundefined(btns) {
    btns.forEach((btn)=> {
        if (btn.innerText === 'undefined') {
           let  container = btn.parentElement
           container.removeChild(btn)
        }
    })
}

function removetruefalss(isnews,isfeatureds) {
    isnews.forEach((isnew) =>{
        if (isnew.classList.contains("false")) {
            let container = isnew.parentElement
            container.removeChild(isnew)
        }
    })
    isfeatureds.forEach((isfeatured) =>{
        if (isfeatured.classList.contains("false")) {
            let container = isfeatured.parentElement
            container.removeChild(isfeatured)
        }
    })

}

function displayfiltercontainer(filteritems,skills) {
    filteritems.forEach((filteritem)=> {
        filteritem.addEventListener("click",() => {
            let element = document.createElement("div")
            element.classList.add("filter-button")
           element.innerHTML =`<button class="button">${filteritem.innerText}</button>
                               <div class="cross">&cross;</div>`
                     
            showFilterBtns.append(element)
            showFilterContainer.classList.add("filter-btns-active")

            const cross = document.querySelectorAll(".cross")
            cross.forEach((c)=> {
                c.addEventListener("click", clearOne)

            })

             let filterlist = filterbyitem(filteritem)
             displayallcards(filterlist)
           

        })
    })
        
}

   
function clearAllFilter() {
    const allfilterbtns = document.querySelectorAll(".filter-button");
    allfilterbtns.forEach((filterbtn) => {
        showFilterBtns.removeChild(filterbtn)
        showFilterContainer.classList.remove("filter-btns-active")
        displayallcards(totallist)
    })
}

function clearOne(event) {
    let parent =  event.target.parentElement
    parent.remove(event.target)
    const allfilterbtns = document.querySelectorAll(".filter-button");
    if  (allfilterbtns.length < 1 ) {
        showFilterContainer.classList.remove("filter-btns-active")
        displayallcards(totallist)
    }
}



function filterbyitem(item) {
    const filterItems = document.querySelectorAll(".filteritem")
    let newInfo = [];
    filterItems.forEach((filterItem)=> {
        if (filterItem.innerText == item.innerText) {
            let parent = filterItem.parentElement.parentElement.classList
            let filterdinfo = totallist.filter((info)=> {
                return info.id == parent[1]   
                }) 
                newInfo.push(...filterdinfo)
            }
    })
    return newInfo
}
