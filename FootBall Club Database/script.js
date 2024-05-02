// Get references to HTML elements
const clubList = document.getElementById('club-list');
const searchInput = document.getElementById('search');
const clubDetailsContainer = document.getElementById('main');

// Attach an input event listener for the search input
searchInput.addEventListener('input', handleSearchInput);

// Initialize football club data and display all clubs
let clubData = footballClubs; 
displayClubs(footballClubs);


// Display football clubs in the club list
function displayClubs(clubs) {
    // Generate HTML for club cards and set it in the clubList element
    const clubCardsHTML = clubs.map(createClubCardHTML).join('');
    clubList.innerHTML = clubCardsHTML;
}

// Create HTML for a football club card
function createClubCardHTML(club) {
    return `
        <div class="club-card" onclick="handleClubClick(this);"><!-- Add onclick event -->
            <h2>${club.name}</h2>
            <img src="${club.image}" alt="${club.name}">
            <p><b>League: </b>${club.league}</p>
            <p><b>City: </b>${club.city}</p>
            <button onclick="viewClubPlayers('${club.name}'); event.stopPropagation();" style="width:100%;">View Players</button>
        </div>
    `;
}

// Handle clicking on a football club card
function handleClubClick(element) {
    // Write your code here for task1
    const clickedClubCard = element;
    //console.log(clubData);
    if(clickedClubCard) {
        const footballClubTitle = clickedClubCard.querySelector('h2').textContent;
        
        const selectedFootballCLub = clubData.find(footballClub => footballClub.name === footballClubTitle )
        //alert(selectedFootballCLub);
        if(selectedFootballCLub) {
            displayClubDetails(selectedFootballCLub);
        }
    }
}

// Display football club details
function displayClubDetails(club) {
   // Write your code here for task2

   const footballClubDetailsHtml = `
        <button onclick="window.location.reload();">Back</button>
        <h2>${club.name}</h2>
        <img src="${club.image}">
        <p><Label>League:</Label> ${club.league}</p>
        <p><label>City:</label> ${club.city}</p>
        <p><label>Stadium:</label> ${club.stadium}</p>
        <p><button onclick="viewClubPlayers('${club.name}');">View Player</button></p>
        <p><label>Description:</label> ${club.description}</p>
   `

   clubDetailsContainer.innerHTML = footballClubDetailsHtml;
}

// Function to view club players
function viewClubPlayers(clubName) {
   // Write your code here for task3

   const selectedFootballCLub = clubData.find(footballClub => footballClub.name === clubName );
   let playerdata = ` <button onclick="window.location.reload();">Back</button><h2>${clubName} Players  </h2>`;
   selectedFootballCLub.players.forEach(player => {
    playerdata += `
      <div>
        <p><label>Name:</label> ${player.name} </p>
        <p><label>Position:</label> ${player.position}</p>
        <p><label>Goals:</label> ${player.goals}</p>
        <p><label>Assists:</label> ${player.assists}</p>
        <hr>
      </div>
    `;
  });
  clubDetailsContainer.innerHTML = playerdata;
}

// Handle search input and filter clubs
function handleSearchInput() {
    // Write your code here for task4
    const searchText = searchInput.value.toLowerCase();
    const filteredClubs =  footballClubs.filter(club => {
        const clubDataString = `${club.name} ${club.league} ${club.city}`;
        return clubDataString.toLowerCase().includes(searchText);
        
    });

    displayClubs(filteredClubs);
}