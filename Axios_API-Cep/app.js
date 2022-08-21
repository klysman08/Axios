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
    .get("https://viacep.com.br/ws/" + zipCode + "/json/")
    .then(function (response) {
      /*  console.log(response) */
      content.innerHTML = "";
      createLine(response.data.logradouro);
      createLine(response.data.bairro);
      createLine(response.data.localidade);
      endereco = response.data.logradouro;
      /* console.log(endereco) */
    })
    .catch(function (error) {
      console.log(error);
      content.innerHTML = "";
      createLine("CEP não encontrado");
    });
}

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
