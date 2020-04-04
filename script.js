// Map
function initMap() {
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  var map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 8,
    // 46.066096,14.4620597 => Ljubljana
    center: {lat: 46.066096, lng: 14.4620597}
  });
directionsRenderer.setMap(map);

var onClickHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    getDistance();
  };

  document.getElementById('btn-submitLocation').addEventListener('click', onClickHandler);
}

calculateAndDisplayRoute = (directionsService, directionsRenderer) => {
  const start = document.getElementById('location-input').value
  const end   = document.getElementById('destination-input').value
  directionsService.route(
      {
        origin: {query: start},
        destination: {query: end},
        travelMode: 'DRIVING'
      },
      function(response, status) {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
}

getDistance = () => {
  const origin = document.getElementById('location-input').value
  const destination = document.getElementById('destination-input').value
  const service = new google.maps.DistanceMatrixService()
  service.getDistanceMatrix({
    origins: [origin],
    destinations: [destination],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  }, function(response,status){
    if (status == 'OK'){
      const distance = response.rows[0].elements[0].distance.text
      document.getElementById("distance-label").innerText = "Gas (distance = " + distance + ")";
    } else{
      alert ("Error was: " + status);
    }
  })
}

// Budget

convertToNumber = (str) => {
  if (str == ""){
    return 0;
  } else{
    return Number(str);
  }
}

calculateBudget = () =>{
  const budget = document.getElementById("budget").value
  if (budget != ""){
    const distance_label = document.getElementById("distance-label").innerText;
    let distance = 0;
    if (distance_label.length  > 3){
      let distance_str = (distance_label.substr(16, distance_label.length-1))
      distance = Number((distance_str.replace(" km)", "")));
    }
    const gas_price = convertToNumber(document.getElementById("gas-price").value)
    const car_con   = convertToNumber(document.getElementById("car-consumption").value)
    const living    = convertToNumber(document.getElementById("living").value)
    const other     = convertToNumber(document.getElementById("other-costs").value)
    let Calculated_Gas = Math.round((distance * (car_con / 100)) * gas_price) * 2
    let Calculated_Budget = budget - Calculated_Gas - living - other
    let outputMSG
    if (Calculated_Gas != 0){
     outputMSG = `Total budget ${budget}€ - gas costs (${distance} * 2 = ${distance*2}km) ${Calculated_Gas}€ - other expenses (${living}€ + ${other}€) = ${Calculated_Budget}€`
    }else{
      outputMSG = `Total budget ${budget}€ - other expenses (${living}€ + ${other}€) = ${Calculated_Budget}€`
    }
    console.log(outputMSG)
    document.getElementById("output").innerText = outputMSG;
  }else{
    alert("Please enter your full trip budget.")
  }
} 

document.getElementById("calculate-btn").addEventListener("click", calculateBudget);


// Items

strike_through = (e) => {
  const target = e.target
  target.style.setProperty("text-decoration", "line-through");
}

delete_item = (e) => {
  const target = e.target
  target.parentNode.removeChild(target)
}

clear_all = () => {
  const item_list = document.getElementById("item-list")
  while (item_list.firstChild){
    item_list.removeChild(item_list.firstChild)
  }
  document.getElementById("new-item").value = "";
}

document.getElementById("add-item-btn").addEventListener("click", () => {
  const item_name = document.getElementById("new-item").value
  if (item_name != ""){
    document.getElementById("new-item").value = "";
    const item = document.createElement("li")
    const item_text = document.createTextNode(item_name)
    item.appendChild(item_text)
    item.addEventListener("click", strike_through);
    item.addEventListener("dblclick", delete_item);
    document.getElementById("item-list").appendChild(item)
  }
});

document.getElementById("clear-list-btn").addEventListener("click", clear_all);


