const readline = require("readline");

function calculateOptimizedCost() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Please input number of seats:", (nmbSeats) => {
    let IntSeats = parseInt(nmbSeats);

    if (isNaN(IntSeats)) {
      console.log("Please input a valid number");
      rl.close();
      return calculateOptimizedCost();
    }

    var seats = [
      { size: "S", capacity: 5, cost: 5000 },
      { size: "M", capacity: 9, cost: 8000 },
      { size: "L", capacity: 15, cost: 12000 },
    ];

    let carSize = null;
    let numberOfCars = null;
    let totalCost = 0;

    for (let index = 0; index < seats.length; index++) {
      if (IntSeats <= seats[index].capacity) {
        numberOfCars = Math.ceil(IntSeats / seats[index].capacity);
        carSize = seats[index].size;
        totalCost = numberOfCars * seats[index].cost;
      } else if (IntSeats > seats[2].capacity) {
        numberOfCars = Math.ceil(IntSeats / 10);

        const mediumTotal = numberOfCars * seats[1].cost;
        const largeTotal = numberOfCars * seats[2].cost;

        optimizeComputation(mediumTotal, largeTotal, totalCost, carSize, seats);
      }
    }

    console.log(`${carSize} x ${numberOfCars}`);
    console.log(`TOTAL = PHP ${totalCost}`);

    rl.close();
  });
}

calculateOptimizedCost();

const optimizeComputation = (
  largeTotal,
  mediumTotal,
  totalCost,
  carSize,
  seats
) => {
  if (mediumTotal < largeTotal) {
    carSize = seats[1].size;
    totalCost = mediumTotal;
  } else {
    carSize = seats[2].size;
    totalCost = largeTotal;
  }
};
