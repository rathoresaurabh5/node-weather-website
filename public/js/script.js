console.log('Client side JavaScript is loaded');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })
 
document.getElementById('weatherDetails').style.display = 'none';
document.getElementById('paraError').style.display = 'none';
document.getElementById('loader').style.display = 'none';

const weatherForm = document.querySelector('form');
const searchTerm = document.querySelector('input');
const er = document.getElementById('paraError');
const address = document.querySelector('#address');
const locality = document.querySelector('#locality');
const weather = document.querySelector('#weather');
const temperature = document.querySelector('#temperature');
const feelslike = document.querySelector('#feelslike');

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();

    document.getElementById('weatherDetails').style.display = 'none';
    document.getElementById('paraError').style.display = 'none';
    document.getElementById('loader').style.display = 'none';
    
    const location = searchTerm.value;
    if (location.trim() !== '') {
        //console.log(location);
        document.getElementById('loader').style.display = 'block';

        fetch('http://localhost:3000/weather?address=' + cleanText(location)).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('paraError').style.display = 'block';
                    // console.log(data.error);
                    er.innerHTML = data.error;
                    address.textContent = '';
                    locality.textContent = '';
                    weather.textContent = '';
                    temperature.textContent ='';
                    feelslike.textContent = '';
                    document.getElementById('weatherDetails').style.display = 'none';
                } else {
                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('weatherDetails').style.display = 'block';
                    // er.innerHTML ='';
                    address.textContent =   titleCase(data.Address);
                    locality.textContent =   data.Locality;
                    weather.textContent =   data.Weather;
                    temperature.textContent = data.Temperature;
                    feelslike.textContent = data.Feels;
                    document.getElementById('paraError').style.display = 'none'; 
                }
            }) 
        });
    } else {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('paraError').style.display = 'block';
        er.innerHTML = 'Please provide a location to search!';
        address.textContent = '';
        locality.textContent = '';
        weather.textContent = '';
        temperature.textContent ='';
        feelslike.textContent = '';
        document.getElementById('weatherDetails').style.display = 'none';
    }    
});

const cleanText = (str) => {
    if (str) {
        var strLower = str.toString().toLowerCase();
        var strLowerFormat = strLower.replace(/\s+/g,' ').trim();
        console.log('Formatted: ' + strLowerFormat);
        return strLowerFormat;
    }
    return false
} 

const titleCase = (str) => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }
