# Parking Management System

A browser-based Parking Management System built using **JavaScript OOP, HTML, CSS, and DOM manipulation**.

The system manages dedicated parking spaces for **2-Wheelers, 4-Wheelers, and 6-Wheelers**, with an additional **flexible parking area** that uses best-fit allocation when dedicated parking is unavailable.

## Features

* Dedicated parking for:

  * 🏍️ 2-Wheelers
  * 🚗 4-Wheelers
  * 🚛 6-Wheelers
* Flexible parking when dedicated parking is full
* Best-fit flexible space allocation
* Vehicle entry and exit management
* Dynamic parking slot status
* Free and occupied slot visualization
* Currently parked vehicle list
* Dynamic parking statistics
* HTML/CSS UI with JavaScript DOM manipulation

## 🧠 Parking Logic

The system follows this flow:

```text
Vehicle Arrives
      ↓
Check Dedicated Parking
      ↓
Available?
   ↙       ↘
 YES        NO
  ↓          ↓
Park      Check Flexible Space
             ↓
       Find Smallest Suitable
          Free Space
             ↓
           Park
```

### Dedicated Parking

Each vehicle type has its own dedicated parking area:

| Vehicle   | Required Space | Dedicated Positions |
| --------- | -------------- | ------------------- |
| 2-Wheeler | 2 units        | 50                  |
| 4-Wheeler | 4 units        | 50                  |
| 6-Wheeler | 6 units        | 20                  |

### Flexible Parking

The flexible area contains **80 physical units**.

A vehicle can use consecutive free units according to its required space:

```text
2-Wheeler → 2 units
4-Wheeler → 4 units
6-Wheeler → 6 units
```
## OOP Structure

The project is divided into three main classes.

### Vehicle

Represents a vehicle.

Responsibilities:

* Store vehicle number
* Store vehicle category
* Determine required parking space

```javascript
const vehicle = new Vehicle(
    "MP04CAR123",
    "4-Wheeler"
);
```

### ParkingSlot

Represents a dedicated parking slot.

Responsibilities:

* Store slot information
* Check availability
* Check whether a vehicle can fit
* Assign a vehicle
* Release a vehicle

### ParkingLot

Manages the complete parking system.

Responsibilities:

* Create parking slots
* Find dedicated parking
* Find flexible parking
* Park vehicles
* Find vehicles
* Remove vehicles
* Track available and occupied spaces
* Maintain parked vehicle data

## 🖥️ DOM Manipulation

The UI is updated dynamically using JavaScript DOM manipulation.

The system dynamically displays:

* Parking slots
* Slot IDs
* Vehicle numbers
* Free/occupied status
* Parking statistics
* Currently parked vehicles


## 📊 Parking Statistics

The dashboard displays:

* Total positions
* Occupied positions
* Available positions
* Flexible parking capacity

These values are updated dynamically whenever a vehicle enters or exits.

## 🚪 Vehicle Exit

A vehicle can exit by entering its vehicle number.

```text
Enter Vehicle Number
        ↓
Find Vehicle
        ↓
Vehicle Found?
    ↙          ↘
  YES           NO
   ↓             ↓
Release       Show Error
  Space
   ↓
Update UI
```

## 📁 Project Structure

```text
Parking-Management-System/
│
├── index.html
├── style.css
├── dom.js
├── script.js
└── README.md
```

### File Responsibilities

| File         | Responsibility                    |
| ------------ | --------------------------------- |
| `index.html` | Application structure and UI      |
| `style.css`  | Styling and parking status design |
| `dom.js`     | DOM manipulation and UI rendering |
| `script.js`  | User events and application flow  |
| `README.md`  | Project documentation             |

## Technologies Used

* **HTML5**
* **CSS3**
* **JavaScript**
* **Object-Oriented Programming (OOP)**
* **DOM Manipulation**
