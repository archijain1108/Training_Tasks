const parking_rule = {
    dedicated: {
        twoWheeler: {
            positions: 50,
            size: 2,
            category: "2-Wheeler"
        },

        fourWheeler: {
            positions: 50,
            size: 4,
            category: "4-Wheeler"
        },

        sixWheeler: {
            positions: 20,
            size: 6,
            category: "6-Wheeler"
        }
    },

    flexible: {
        totalSpace: 80
    }
};

class Vehicle {

    constructor(vehicleNumber, category) {
        this.vehicleNumber = vehicleNumber;
        this.category = category;
    }

    getRequiredSize() {

        if (this.category === "2-Wheeler") {
            return 2;
        }

        if (this.category === "4-Wheeler") {
            return 4;
        }

        if (this.category === "6-Wheeler") {
            return 6;
        }

        return null;
    }
}


class ParkingSlot {

    constructor(id, size, type, category = null) {

        this.id = id;
        this.size = size;
        this.type = type;

        this.category = category;

        this.isOccupied = false;

        this.vehicle = null;
    }

    isAvailable() {
        return !this.isOccupied;
    }


    canFit(vehicle) {
        return this.size >= vehicle.getRequiredSize();
    }


    assignVehicle(vehicle) {
        this.vehicle = vehicle;
        this.isOccupied = true;
    }


    releaseVehicle() {
        this.vehicle = null;
        this.isOccupied = false;
    }
}



class ParkingVehicles {

    constructor() {
        this.slots = [];
        this.vehicles = [];
        this.flexibleSlots = Array(60).fill(null)
    }


    createSlots() {

        const dedicated = parking_rule.dedicated;


        for (let i = 1; i <= dedicated.twoWheeler.positions; i++) {

            const slot = new ParkingSlot(
                `2W-${i}`,
                dedicated.twoWheeler.size,
                "DEDICATED",
                "2-Wheeler"
            );

            this.slots.push(slot);
        }


        for (let i = 1; i <= dedicated.fourWheeler.positions; i++) {

            const slot = new ParkingSlot(
                `4W-${i}`,
                dedicated.fourWheeler.size,
                "DEDICATED",
                "4-Wheeler"
            );

            this.slots.push(slot);
        }


        for (let i = 1; i <= dedicated.sixWheeler.positions; i++) {

            const slot = new ParkingSlot(
                `6W-${i}`,
                dedicated.sixWheeler.size,
                "DEDICATED",
                "6-Wheeler"
            );

            this.slots.push(slot);
        }

    }




    findDedicatedSlot(vehicle) {

        for (const slot of this.slots) {

            if (slot.type === "DEDICATED" &&
                slot.category === vehicle.category &&
                slot.isAvailable()) {
                return slot;
            }
        }

        return null;
    }




    findFlexibleSlot(vehicle) {

        const reqSize = vehicle.getRequiredSize();

        let consecutiveFree = 0;
        let startIndex = -1;

        for (let i = 0; i < this.flexibleSlots.length; i++) {

            if (this.flexibleSlots[i] === null) {
                if (consecutiveFree === 0)
                    startIndex = i;


                consecutiveFree++;

                if (consecutiveFree === reqSize) {
                    return {
                        start: startIndex,
                        end: i
                    }
                }

            } else {
                consecutiveFree = 0;
                startIndex = -1;
            }
        }

        return null;
    }



    parkVehicle(vehicle) {

        let slot = this.findDedicatedSlot(vehicle);

        if (slot) {
            slot.assignVehicle(vehicle);

            this.vehicles.push(vehicle);

            return {
                success: true,
                slot: slot,
                message: `Vehicle parked at ${slot.id}`
            };
        }


        const flexibleBlock = this.findFlexibleSlot(vehicle);

        if (!flexibleBlock) {
            return {
                success: false,
                message: "No parking space available"
            };
        }


        for (
            let i = flexibleBlock.start;
            i <= flexibleBlock.end;
            i++
        ) {
            this.flexibleSlots[i] = vehicle;
        }

        this.vehicles.push(vehicle);

        return {
            success: true,
            start: flexibleBlock.start,
            end: flexibleBlock.end,
            message: 'Vehicle parked in flexible space'
        };
    }



    findVehicle(vehicleNumber) {

        for (const slot of this.slots) {

            if (
                slot.isOccupied &&
                slot.vehicle.vehicleNumber === vehicleNumber
            ) {
                return slot;
            }
        }

        return null;
    }



    removeVehicle(vehicleNumber) {

        const slot = this.findVehicle(vehicleNumber);

        if (!slot) {
            return {
                success: false,
                message: "Vehicle not found"
            };
        }

        slot.releaseVehicle();

        this.vehicles = this.vehicles.filter(
            vehicle => vehicle.vehicleNumber !== vehicleNumber
        );


        return {
            success: true,
            message: `Vehicle ${vehicleNumber} exited successfully`
        };
    }


    getAvailableSlots() {
        return this.slots.filter(
            slot => slot.isAvailable()
        );
    }


    getOccupiedSlots() {
        return this.slots.filter(
            slot => slot.isOccupied
        );
    }

    getTotalSlots() {
        return this.slots.length;
    }


    getAvailableCount() {
        return this.getAvailableSlots().length;
    }


    getOccupiedCount() {
        return this.getOccupiedSlots().length;
    }
}





const parkingVehicles = new ParkingVehicles();
parkingVehicles.createSlots();
