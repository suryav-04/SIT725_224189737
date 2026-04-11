// 🔹 Create cards
const addCards = (data) => {
  $("#card-section").empty();

  data.forEach(item => {
    let card = `
      <div class="col s12 m4">
        <div class="card">
          <div class="card-image">
            <img src="${item.image}">
          </div>
          <div class="card-content">
            <span class="card-title">${item.title}</span>
            <p>${item.description}</p>
          </div>
        </div>
      </div>
    `;
    $("#card-section").append(card);
  });
};

// 🔹 Fetch from backend
const getItems = () => {
  fetch('/api/items')
    .then(res => res.json())
    .then(data => {
      addCards(data);
    })
    .catch(err => console.error(err));
};

// Run on load
$(document).ready(function(){
  getItems();
});