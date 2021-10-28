const pokemonContainer=document.querySelector(".row.row-cols-2.row-cols-md-4.row-cols-sm-3.row-cols-lg-5.row-cols-xl-6.g-3")
const spinner=document.querySelector("#spinner")

function fethcPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res=>{
            if(res.status===200){
                return res.json()
            }else{
                throw new Error('Pokemon no encontrado!!')
            }
        })
        .then(data=>{
            crearPokemon(data);
            spinner.style.display="none"
        }
        )
        .catch(error =>PokemonNoEncontrado());
}
function getFethcPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res=>{
            if(res.status===200){
                return res.json()
            }else{
                throw new Error('Pokemon no encontrado!!')
            }
        })
        .then(data=>{
            MostrarPokemon(data);
            spinner.style.display="none"
        }
        )
        .catch(error =>PokemonNoEncontrado());
}
function fetchPokemones(number){
    spinner.style.display="block"
    for(let i=1;i<=number;i++){
        fethcPokemon(i)
    }
}

function crearPokemon(pokemon){
    const columnas= document.createElement("div")
    columnas.classList.add("col")

    const card = document.createElement("div")
    card.classList.add("card","h-100")

    const imagen = document.createElement("img")
    imagen.src=pokemon.sprites.front_default
    imagen.classList.add("card-img-top")

    const body=document.createElement('div')
    body.classList.add("card-body")

    const titulo=document.createElement('h5')
    titulo.classList.add("card-title")
    titulo.textContent=`#${pokemon.id.toString().padStart(3,0)}`

    const parrafo=document.createElement("p")
    parrafo.classList.add("card-text")
    parrafo.textContent=`${pokemon.name}`

    const butonModal=document.createElement("button")
    butonModal.setAttribute("type","button")
    butonModal.classList.add("btn","btn-primary")
    butonModal.setAttribute("data-bs-toggle","modal")
    butonModal.setAttribute("data-bs-target","#myModal")
    butonModal.onclick= new Function('showAlert(' + `${pokemon.id.toString()}` + ')')
    /* butonModal.setAttribute("onclick","viewModal(`${pokemon.id.toString()}`)") */
    butonModal.style.width="100px"
    butonModal.textContent="Mas"
    

    body.appendChild(titulo)
    body.appendChild(parrafo)
    body.appendChild(butonModal)

    card.appendChild(imagen)
    card.appendChild(body)

    columnas.appendChild(card)

    pokemonContainer.appendChild(columnas)
}


 // BUSCADOR 
const buscador=document.querySelector("#buscador")

const showAlert=(event)=> {
    console.log(event)
    getFethcPokemon(event)
    
    
}

const MostrarPokemon=(pokemon)=>{
    const cabezaModal=document.querySelector("#TituloModal")
    cabezaModal.textContent=`${pokemon.name}`
}

const filtrar=()=>{
    const texto=buscador.value.toLowerCase()
    if(texto.length!=0){
        pokemonContainer.innerHTML=''
        fethcPokemon(buscador.value.toLowerCase())
    }else{
        pokemonContainer.innerHTML=''
        Init()
    }
    
}

const viewModal=()=>{
    console.log("ctmr")
}
function PokemonNoEncontrado(){
    const noencontrado= document.createElement("div")
    noencontrado.classList.add("alert","alert-primary")
    noencontrado.setAttribute("role","alert")
    noencontrado.innerText="Pokemon no encontrado"
    pokemonContainer.appendChild(noencontrado)
}
buscador.addEventListener('search',filtrar)

function Init(){
    fetchPokemones(4)
}
Init()
