// Map
function myMap() {
    var mapProp= {
      center:new google.maps.LatLng(51.508742,-0.120850),
      zoom:5,
    };

    let map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    }

// Budget

// onChange => {
calculateBudget = () =>{
  const budget    = getElementById("budget").value
  const gas_price = getElementById("gas-price").value
  const car_con   = getElementById("car-consumption").value
  const living    = getElementById("living").value
  const other     = getElementById("other-costs").value
  // const distance => get from maps API
  let Calculated_Gas = ((distance * (car_con / 100)) * gas_price)
  let Calculated_Budget = budget - Calculated_Gas - living - other
  document.getElementById("output").value = Calculated_Budget; 
}


// Items

strike_through = (e) => {
  const target = e.target
  target.style.setProperty("text-decoration", "line-through");
}

delete_item = (e) => {
  const target = e.target
  target.parentNode.removeChild(target)
}

clear_all = () =>{
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

// Error detection!

