var submitButton = document.querySelector("#app form button");
var zipCodeField = document.querySelector("#app form input");
var content = document.querySelector("#app main");

submitButton.addEventListener("click", run);

function run(e) {
  e.preventDefault();

  var zipCode = zipCodeField.value;

  zipCode = zipCode.replace(" ", "");
  zipCode = zipCode.replace("-", "");
  zipCode = zipCode.replace(".", "");
  zipCode = zipCode.trim();

  /*     console.log(zipCode); */
  /*  */
  axios
  .get(`https://viacep.com.br/ws/${zipCode}/json/`)
  .then(function (response) {
    // Clear the content of the HTML element
    content.innerHTML = "";

    // Create a new line for each piece of address information returned by the API
    if (response.data.logradouro) {
      createLine(response.data.logradouro);
    }
    if (response.data.bairro) {
      createLine(response.data.bairro);
    }
    if (response.data.localidade) {
      createLine(response.data.localidade);
    }

    // Store the street name in a variable
    const endereco = response.data.logradouro;

    // Log the street name to the console
    console.log(endereco);
  })
  .catch(function (error) {
    // Log the error to the console
    console.log(error);

    // Clear the content of the HTML element
    content.innerHTML = "";

    // Display a message to the user indicating that the zip code was not found
    createLine("CEP não encontrado");
  });

console.log(endereco);

function createLine(text) {
  var line = document.createElement("p");
  var text = document.createTextNode(text);
  line.appendChild(text);
  content.appendChild(line);
}

var geocoder;
var map;
var address = "UFMG";

const myPromise = new Promise((resolve, reject) => {
  return function codeAddress(geocoder, map) {
    geocoder.geocode({ address: address }, function (results, status) {
      if (status === "OK") {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
        });
      } else {
        console.log(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  };
});

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: -34.397, lng: 150.644 },
  });
  geocoder = new google.maps.Geocoder();
  codeAddress(geocoder, map);
}
