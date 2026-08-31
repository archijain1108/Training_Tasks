function showToast(message) {
    console.log('toast - ' , message)
    const toast = document.createElement('div')

    const p = document.createElement('p')
    p.innerText = message;

    toast.appendChild(p)
    toast.classList.add('show_toast')

    document.body.appendChild(toast)

    setTimeout(() => {
        toast.remove()
    }, 2000)
}


function getDashboardData() {
    const totalPosition = document.querySelector('#totalPositions')
    const occupiedPositions = document.querySelector('#occupiedPositions')
    const availablePositions = document.querySelector('#availablePositions')

    totalPosition.innerText = parkingVehicles.getTotalSlots()
    occupiedPositions.innerText = parkingVehicles.getOccupiedCount()
    availablePositions.innerText = parkingVehicles.getAvailableCount()

    renderParkingArea()
}

const vehicleTypeButtons = document.getElementsByClassName('vehicle-type')

    Array.from(vehicleTypeButtons).forEach(button => {
        button.addEventListener("click", () => {
            selectedCategory = button.dataset.category;
        });

    });



function manageNewVehicle() {
    const ParkBtn = document.getElementById('parkBtn')
    
    ParkBtn.addEventListener('click', () => {
        const vehicleNo = document.getElementById('vehicleNumber')
        const parkMessage = document.getElementById('parkMessage')



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
            renderVehicleList();
            getDashboardData()

            showToast('Vehicle parked successfully')

            vehicleNo.value = "";
            selectedCategory = null;
        }

    });

    renderParkingArea()

}

function renderParkingArea() {

    const twoWheelerContainer = document.getElementById("twoWheelerSlots");
    const fourWheelerContainer = document.getElementById("fourWheelerSlots");
    const sixWheelerContainer = document.getElementById("sixWheelerSlots");
    const flexibleContainer = document.getElementById("flexibleSlots");

    twoWheelerContainer.innerHTML = "";
    fourWheelerContainer.innerHTML = "";
    sixWheelerContainer.innerHTML = "";
    flexibleContainer.innerHTML = "";



    parkingVehicles.slots.forEach(slot => {

        const slotElement = document.createElement("div");

        slotElement.classList.add("parking-slot");

        slotElement.classList.add(
            slot.isOccupied ? "occupied" : "free"
        )


        const slotId = document.createElement("span");
        slotId.classList.add("slot-id");
        slotId.textContent = slot.id;


        const vehicleNumber = document.createElement("span");

        vehicleNumber.classList.add("vehicle-number");

        vehicleNumber.textContent =
            slot.isOccupied
                ? slot.vehicle.vehicleNumber
                : "Free";


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


function renderVehicleList() {
    const vehicleList = document.getElementById("vehicleList");
    vehicleList.innerHTML = "";

    parkingVehicles.vehicles.forEach(vehicle => {

        const vehicleCard = document.createElement("div");
        vehicleCard.classList.add("vehicle-card");


        const vNumber = document.createElement("p");
        vNumber.textContent = `Vehicle Number: ${vehicle.vehicleNumber}`;


        const vCategory = document.createElement("p");
        vCategory.textContent = `Type: ${vehicle.category}`;


        vehicleCard.appendChild(vNumber);
        vehicleCard.appendChild(vCategory);

        vehicleList.appendChild(vehicleCard);
    });
}


function manageExitVehicle() {

    const exitForm = document.getElementById("exitForm");

    exitForm.addEventListener('submit', (e) => {

        const exitVehicleNumber = document.getElementById("exitVehicleNumber");
        const exitMessage = document.getElementById("exitMessage");

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
            showToast('Vehicle exit successfully')
            renderParkingArea();
            renderVehicleList()
            exitVehicleNumber.value = "";
        }

    })

}



getDashboardData()
manageNewVehicle()
manageExitVehicle()
