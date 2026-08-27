const totalPosition = document.querySelector('#totalPositions')
const occupiedPositions = document.querySelector('#occupiedPositions')
const availablePositions = document.querySelector('#availablePositions')

totalPosition.innerText = parkingVehicles.getTotalSlots()
occupiedPositions.innerText = parkingVehicles.getOccupiedCount()
availablePositions.innerText = parkingVehicles.getAvailableCount()


const vehicleNo = document.getElementById('vehicleNumber')
const vehicleTypeButtons = document.getElementsByClassName('vehicle-type')

const ParkBtn = document.getElementById('parkBtn')
const parkMessage = document.getElementById('parkMessage')



const twoWheelerContainer = document.getElementById("twoWheelerSlots");
const fourWheelerContainer = document.getElementById("fourWheelerSlots");
const sixWheelerContainer = document.getElementById("sixWheelerSlots");
const flexibleContainer = document.getElementById("flexibleSlots");


console.log(twoWheelerContainer, fourWheelerContainer)


console.log(vehicleTypeButtons)


Array.from(vehicleTypeButtons).forEach(button => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;
    });

});


ParkBtn.addEventListener('click', () => {

    const vn = vehicleNo.value.trim();


    if (!vn) {
        parkMessage.textContent =
            "Please enter vehicle number";
        return;
    }


    if (!selectedCategory) {
        parkMessage.textContent =
            "Please select vehicle type";
        return;
    }


    const vehicle = new Vehicle(vn, selectedCategory);
    console.log("New vehicle:", vehicle);


    const result = parkingVehicles.parkVehicle(vehicle);

    parkMessage.textContent = result.message;


    if (result.success) {
        renderParkingArea();
        renderVehicleList();

        totalPosition.innerText = parkingVehicles.getTotalSlots();
        occupiedPositions.innerText = parkingVehicles.getOccupiedCount();
        availablePositions.innerText = parkingVehicles.getAvailableCount();


        vehicleNo.value = "";
        selectedCategory = null;
    }

});



function renderParkingArea() {

    twoWheelerContainer.innerHTML = "";
    fourWheelerContainer.innerHTML = "";
    sixWheelerContainer.innerHTML = "";
    flexibleContainer.innerHTML = "";



    parkingVehicles.slots.forEach(slot => {

        const slotElement =
            document.createElement("div");

        slotElement.classList.add("parking-slot");

        slotElement.classList.add(
            slot.isOccupied ? "occupied" : "free"
        );



        const slotId = document.createElement("span");
        slotId.classList.add("slot-id");
        slotId.textContent = slot.id;



        const vehicleNumber =
            document.createElement("span");

        vehicleNumber.classList.add("vehicle-number");

        vehicleNumber.textContent =
            slot.isOccupied
                ? slot.vehicle.vehicleNumber
                : "FREE";



        slotElement.appendChild(slotId);
        slotElement.appendChild(vehicleNumber);



        if (slot.category === "2-Wheeler") {
            twoWheelerContainer.appendChild(slotElement);
        }

        else if (slot.category === "4-Wheeler") {
            fourWheelerContainer.appendChild(slotElement);
        }

        else if (slot.category === "6-Wheeler") {
            sixWheelerContainer.appendChild(slotElement);
        }

    });



    parkingVehicles.flexibleSlots.forEach(
        (vehicle, index) => {

            const slotElement =
                document.createElement("div");

            slotElement.classList.add(
                "parking-slot"
            );



            slotElement.classList.add(
                vehicle ? "occupied" : "free"
            );


            const slotId = document.createElement("span");

            slotId.classList.add("slot-id");

            slotId.textContent =
                `F-${index + 1}`;



            const vehicleNumber = document.createElement("span");

            vehicleNumber.classList.add(
                "vehicle-number"
            );

            vehicleNumber.textContent =
                vehicle
                    ? vehicle.vehicleNumber
                    : "FREE";



            slotElement.appendChild(slotId);
            slotElement.appendChild(vehicleNumber);


            flexibleContainer.appendChild(
                slotElement
            );

        }
    );
}


renderParkingArea();




const exitForm = document.getElementById("exitForm");
const exitVehicleNumber = document.getElementById("exitVehicleNumber");
const exitMessage = document.getElementById("exitMessage");
const vehicleList = document.getElementById("vehicleList");
const exitVehicleBtn = document.getElementById("exitBtn")

exitForm.addEventListener('submit', (e) => {

    e.preventDefault()
    const vn = exitVehicleNumber.value.trim()


    if (!vn) {
        exitMessage.textContent =
            "Please enter vehicle number";
        return;
    }

    const result = parkingVehicles.removeVehicle(vn);
    exitMessage.textContent = result.message;


    if (result.success) {
        console.log('rem vehicles')
        renderParkingArea();
        renderVehicleList()
        exitVehicleNumber.value = "";
    }

})


function renderVehicleList() {

    vehicleList.innerHTML = "";

    parkingVehicles.vehicles.forEach(vehicle => {

        const vehicleCard = document.createElement("div");
        vehicleCard.classList.add("vehicle-card");


        const vNumber = document.createElement("p");
        vNumber.textContent =  `Vehicle Number: ${vehicle.vehicleNumber}`;


        const vCategory = document.createElement("p");
        vCategory.textContent =`Type: ${vehicle.category}`;


        vehicleCard.appendChild(vNumber);
        vehicleCard.appendChild(vCategory);

        vehicleList.appendChild(vehicleCard);
    });
}


renderVehicleList()


