// Create a new date instance dynamically with JS

let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

/* Global Variables */
const apiKey = '&appid=eabf817b403106e96537ada124ed68c1';
const baseAppUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";

const button = document.getElementById('generate');
button.addEventListener('click',
    performAction);



function performAction(e) {
    const feelings = document.getElementById('feelings').value;

    const zipCode = document.getElementById("zip").value;

    GetTempData(baseAppUrl, zipCode, apiKey)
        .then(function(data) {
            console.log('data is', data);
            postData('/addPost', {
                    date: newDate,
                    temp: Math.round((data.main.temp - 32) * 5 / 9) + ' °C',
                    content: 'The weather feels' + " " + feelings
                })
                .then(
                    updateUI()
                )
        })
};
//wheather get request  
const GetTempData = async(baseAppUrl, zipCode, apiKey) => {


    const response = await fetch(baseAppUrl + zipCode + apiKey)
    try {
        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.log("error", error);
    }
}

//posting info to the server
const postData = async(url = '', data = {}) => {
        console.log(data);
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(data),
        });

        try {
            const newData = await response.json();
            console.log(newData);
            return newData;

        } catch (error) {
            console.log("error", error);
        }
    }
    //updating app page 
const updateUI = async() => {
    const request = await fetch('/allGet');

    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
    } catch (error) {
        console.log("error", error);
    }
}