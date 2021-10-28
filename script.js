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
    getFethcPokemon(event)
    
    
}

const MostrarPokemon=(pokemon)=>{
    const cabezaModal=document.querySelector("#TituloModal")
    cabezaModal.textContent=`${pokemon.name.toUpperCase()}`

    
    const imagenModal=document.querySelector("#logoImagen")
    imagenModal.src=pokemon.sprites.front_default

    const tituloCard=document.getElementById("#numeroTitulo")
    let habilidades= " "
    for(const tipoPokemon in pokemon.types){
        habilidades= habilidades+`  ${pokemon.types[tipoPokemon].type.name}`
    }
    habilidades= "Tipo: "+habilidades+ "\t"+"   N°"+ `#${pokemon.id.toString().padStart(3,0)}`
    tituloCard.textContent=habilidades
   
    const estadistica=document.querySelector(".agregarContenido")
    estadistica.innerText=""
    let contenidoH=``
    let valor=0
    for(const poderes in pokemon.stats){
        valor=Number.parseFloat(`${pokemon.stats[poderes].base_stat}`)/2
        contenidoH=contenidoH+`
        <div class="progress">
            <div class="col-2"><p>${pokemon.stats[poderes].stat.name}</p></div>
            <div class="col-10">
            <div class="progress-bar bg-success" role="progressbar" style="width: ${valor}%"  aria-valuemin="0" aria-valuemax="100">${pokemon.stats[poderes].base_stat}</div>
            </div>
        </div>`
    }
    estadistica.insertAdjacentHTML('beforeend',contenidoH)
    console.log(contenidoH)
    

    
   /*  const cuerpoModal=document.querySelector("#cuerpoModal")

    const imagenMostrar=document.querySelector("#imagenH")
    const imgInsert=document.createElement("img")
    imgInsert.style.width="140px"
    imgInsert.src=pokemon.sprites.front_default

    imagenMostrar.appendChild(imgInsert)

    const numeroPok=document.querySelector(".detail-national-id")
    const agregarNumero=document.createElement("span")
    agregarNumero.textContent=`#${pokemon.id.toString().padStart(3,0)}`

    numeroPok.appendChild(agregarNumero)
    
    for(const tipoPokemon in pokemon.types){
        console.log(`${pokemon.types[tipoPokemon].type.name}`)
    }
     */
    
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
    fetchPokemones(150)
}
Init()

function eliminar(){
    myModal.dispose()
}