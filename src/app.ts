import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = 'google-api-key';

type GoogleGeoCodingResponse = 
    {results: {geometry: {location: {lat: number,lng: number}}}
    status: 'OK' | 'Invalid'

}


function searchAdddressHandler(event: Event){

    event.preventDefault();
    const enteredAddress = addressInput.value;

axios.get<GoogleGeoCodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
.then(response => {
    if(response.data.status !== 'OK'){
        throw new Error('Could not fetch the location!')
    }
    const coordinates = response.data.results[0].geometry.location;    
}).catch(err => {
    console.log(err);
    
});

}

form.addEventListener('submit', searchAdddressHandler);