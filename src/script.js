import { inscritos } from "./database.js"

function checkIn(id) {
    fetch(`https://encontrocomavida.tv/inscrito.php?id_inscrito=${id}`, {
        mode: 'no-cors'
    })  
        .then(response => {
            let inscrito = fetchById(id)
            inscrito["isPresent"] = 1
            console.log(inscrito)
            console.log('Requisição realizada com sucesso')
        })
        .then(data => console.log('Dados do inscrito:', data))
        .catch(error => console.error('Erro:', error));

}

document.getElementById('search').addEventListener('input', function() {
    const searchValue = this.value;  
    if (searchValue.trim() === '') {
        const cardList = document.getElementById('cardList');
        cardList.innerHTML = '';
    }else {
        fetchAndDisplayParticipant(searchValue)
    }
});

function fetchAndDisplayParticipant(name){
    let inscrito = fetchByName(name)
    console.log(inscrito)
    makeCard(inscrito)
}

function makeCard(data){
    {   
        const cardList = document.getElementById('cardList');
        cardList.innerHTML = '';

        data.forEach(person => {
            const card = document.createElement('li');
            card.classList.add('card');
            card.id = person.id;  

            const nameSpan = document.createElement('span');
            nameSpan.classList.add('card-name');
            nameSpan.textContent = person.name;

            const statusButton = document.createElement('button');
            statusButton.id = "button"
            
            if (person.isPresent) {
                statusButton.classList.add('validate');
            } else {
                statusButton.addEventListener('click', function() {
                    statusButton.classList.add("onclic")
                    validate()
                    function validate() {
                        setTimeout(function() {
                            statusButton.classList.remove("onclic")
                            statusButton.classList.add("validate")
                        }, 550 );
                    }

                    checkIn(person.id);
                });
            }

            card.appendChild(nameSpan);
            card.appendChild(statusButton);

            cardList.appendChild(card);
        });
    }
}

function fetchByName(nome) {
    const nomeLower = nome.toLowerCase();
    return inscritos.filter(inscrito => inscrito.name.toLowerCase().includes(nomeLower));
  }

function fetchById(id) {
    return inscritos.find(inscrito => inscrito.id === id);
}