var inputContent = document.getElementById("inputValue");
inputContent.addEventListener("keydown", FetchWeatherInfo);

function FetchWeatherInfo(event) {
  if (event.keyCode === 13) {
    let inputContent = document.getElementById("inputValue");
    let apikey = "ac6e147f58b46b1d16183f239ca1f66a";
    let cityName = inputContent.value;
    if (cityName === "") {
        let createString = `<div id="divError" class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Warning!</strong> You Must Enter the Name First,Your shouldn't leave it Empty.
        <button type="button" id="buttonHide" class="close" data-dismiss="alert" aria-label="Close">
        <span id="spanButonHide" aria-hidden="true">&times;</span>
        </button>
        </div>`;
        let MessageDiv = document.getElementById("MessageError");
        console.log(MessageDiv);
        MessageDiv.innerHTML = createString;
    } else {
      
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric&lang=en-us`;
      fetch(url)
        .then((response) => {
          console.log("Inside the Resposne Promises");
          return response.json();
        })
        .then((data) => {
          let DataFetched = data;
          let divtemperature = document.getElementById("tempDiv");
          divtemperature.innerHTML = `${DataFetched.main.temp} °C`;

          //Inserting the name of city into UI
          let CityNameCountry = document.getElementById("CityNameCountry");
          CityNameCountry.innerHTML = `${DataFetched.name} ${DataFetched.sys.country}`;

          //inserting Description
          let weatherDes = document.getElementById("descip");
          weatherDes.innerHTML = `Weather Desciption:${DataFetched.weather[0].description}`;

          //inserting DateTime
          var today = new Date();
          var date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
          let dateTimeContent = document.getElementById("dateTime");
          dateTimeContent.innerHTML = `Curret Date&Time:${date}`;

          console.log(DataFetched)
          // Insering in and max temperature
          let temMinMaxDiv = document.getElementById("TempMinMAX");
          temMinMaxDiv.innerHTML = `${DataFetched.main.temp_min}°C / ${DataFetched.main.temp_max}°C`;
        })
        .catch(() => console.error("Some error occured"));
    }
  }
}

//calling the function
