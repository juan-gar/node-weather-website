console.log('js loaded')



function getWeather() {

    const place = document.getElementById("userInput").value;

    const url = `http://localhost:3000/weather?address=${place}`

    fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log(data)

            if(data.error){
                return document.getElementById('weather').innerHTML = data.error
            }

            document.getElementById('weather').innerHTML = `<p>The weather for ${data.address} is: ${data.summary}</p>
            <p>Currently it's ${data.temperature} Cº with a chance of rain of ${data.rain}%</p>`;
        })
    }
