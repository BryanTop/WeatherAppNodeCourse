console.log('hello');

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchInput.value;

    const  url = 'http://localhost:3000/weather?address=' + location;

    message1.textContent = 'loading...';
    message2.textContent = '';

    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
            message1.textContent = data.error;
        } else {
            console.log(data.location);
            console.log(data.forecast);
            message1.textContent = data.location;
            message2.textContent = data.forecast;
        }
    })
})
})