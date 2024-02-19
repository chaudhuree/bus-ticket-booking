// variables
const rowLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const seatsPerRow = 4;
let totalSeat = rowLetters.length * seatsPerRow;
const ticketPrice = 550;
const maxTicketsPerUser = 4;
let selectedSeats = [];
let totalPrice = 0;
let discountPrice = 0;
let grandtotal = 0;

// dom selection
let totalSeatEl = document.getElementById("total-seat");
let grandTotalEl = document.getElementById("grand-total");
let totalPriceEl = document.getElementById("total-price");
let discountPriceEl = document.getElementById("discount-price");
const disccountPriceBoxEl = document.getElementById("discount-price-notation");
let selectedSeatsEl = document.getElementById("selected-seats");
let couponCodeBoxEl = document.getElementById("coupon-code-box");
let couponCodeEl = document.getElementById("coupon-code-input");
const nextBtn = document.getElementById("next-btn");
const phoneInput = document.getElementById("phone-number");

// initial value set
totalSeatEl.textContent = totalSeat;
selectedSeatsEl.textContent = selectedSeats.length;
grandTotalEl.textContent = grandtotal;
totalPriceEl.textContent = totalPrice;
nextBtn.disabled = true;
// dom load function
document.addEventListener("DOMContentLoaded", () => {
  createSeatButtons();
});

// dynamically generated seats
function createSeatButtons() {
  const seatsContainer = document.getElementById("seats-container");

  if (!seatsContainer) {
    console.error("Seats container not found.");
    return;
  }

  for (let rowIndex = 0; rowIndex < rowLetters.length; rowIndex++) {
    const rowLetter = rowLetters[rowIndex];
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row", "flex", "gap-6", "items-center", "mb-6");

    // Add a label for each row
    const rowLabel = document.createElement("div");
    rowLabel.textContent = rowLetter;
    rowLabel.classList.add(
      "row-label",
      "inter",
      "text-lg",
      "font-medium",
      "text-[#03071280]"
    );
    rowDiv.appendChild(rowLabel);

    // Create div for the seat groups
    const seatGroupDiv = document.createElement("div");
    seatGroupDiv.classList.add("seat-groups", "flex", "items-center", "gap-5");

    // Create first seat-group div
    const firstSeatGroupDiv = document.createElement("div");
    firstSeatGroupDiv.classList.add(
      "seat-group",
      "flex",
      "items-center",
      "gap-3"
    );

    // Create second seat-group div
    const secondSeatGroupDiv = document.createElement("div");
    secondSeatGroupDiv.classList.add(
      "seat-group",
      "flex",
      "items-center",
      "gap-3"
    );

    for (let seatIndex = 1; seatIndex <= seatsPerRow; seatIndex++) {
      const seatBtn = document.createElement("button");
      const seatNumber = `${rowLetter}${seatIndex}`;
      seatBtn.textContent = seatNumber;
      seatBtn.id = `seat${seatNumber}`;
      seatBtn.classList.add(
        "seat",
        "w-[110px]",
        "h-[56px]",
        "bg-[#F7F8F8]",
        "rounded-xl",
        "inter",
        "text-lg",
        "font-medium",
        "text-[#03071280]"
      );
      seatBtn.addEventListener("click", () => selectSeat(seatNumber));

      // Add the first two seats to the first seat-group div
      if (seatIndex <= 2) {
        firstSeatGroupDiv.appendChild(seatBtn);
      } else {
        // Add the next two seats to the second seat-group div
        secondSeatGroupDiv.appendChild(seatBtn);
      }
    }

    // Add both seat-group divs to the main row div
    seatGroupDiv.appendChild(firstSeatGroupDiv);
    seatGroupDiv.appendChild(secondSeatGroupDiv);

    rowDiv.appendChild(seatGroupDiv);

    seatsContainer.appendChild(rowDiv);
  }
}

// calculate total price
function calculateTotalPrice() {
  totalPrice = selectedSeats.length * ticketPrice;
  totalPriceEl.textContent = totalPrice;
}

// apply coupon
function applyCoupon() {
  const couponCode = couponCodeEl.value.trim();

  if (couponCode === "Couple 20" || couponCode === "NEW15") {
    const discountPercentage = couponCode === "Couple 20" ? 20 : 15;
    discountPrice = (totalPrice * discountPercentage) / 100;

    // Show the discount section
    disccountPriceBoxEl.classList.remove("hidden");
    discountPriceEl.textContent = discountPrice;

    // Calculate the grand total
    grandtotal = totalPrice - discountPrice;
    grandTotalEl.textContent = grandtotal;

    // Hide the coupon code box
    couponCodeBoxEl.classList.add("hidden");
  } else {
    alert('Invalid coupon code. Please enter "Couple 20" or "New15".');
  }
}

// ticket purchase
function purchase() {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  alert("Purchase done!");
}

// select seat
function selectSeat(seatNumber) {
  const seatBtn = document.getElementById(`seat${seatNumber}`);
  const isSeatSelected = seatBtn.classList.contains("selected");

  if (!isSeatSelected) {
      if (selectedSeats.length < maxTicketsPerUser) {
          seatBtn.classList.remove("bg-[#F7F8F8]","text-[#03071280]");
          seatBtn.classList.add("selected", "bg-[#1dd100]", "text-white");

          updateSelectedSeatsList(seatNumber, true);
      } else {
          alert("You can only select up to 4 seats at a time.");
      }
  }

  calculateTotalPrice();

  // Enable coupon code field if 4 tickets are selected
  couponCodeEl.disabled = selectedSeats.length !== maxTicketsPerUser;

  // Enable next button if at least one seat is selected and phoneInput is not empty
  nextBtn.disabled = selectedSeats.length === 0 || phoneInput.value.trim() === "";

  // Show the apply coupon button after deselecting a seat if the selected seats are less than 4
  if (selectedSeats.length < maxTicketsPerUser) {
      document.querySelector('button[onclick="applyCoupon()"]').style.display = "block";
  }
}
phoneInput.addEventListener("input", () => {
  nextBtn.disabled = selectedSeats.length === 0 || phoneInput.value.trim() === "";
});
// update selected seats list
function updateSelectedSeatsList(seatNumber, isSelected) {
  // table
  const seatList = document.getElementById("list-of-selected-tickets");
  // array of selected seats is selectedSeats
  const seatIndex = selectedSeats.indexOf(seatNumber);
  // if index is -1 then seat is not selected
  if (isSelected) {
    if (seatIndex === -1) {
      selectedSeats.push(seatNumber);
      // update the seat list with correct numbering
      totalSeatEl.textContent = totalSeat - selectedSeats.length;
      selectedSeatsEl.textContent = selectedSeats.length;
      grandTotalEl.textContent = selectedSeats.length * ticketPrice;
    }
  } else {
    if (seatIndex !== -1) {
      selectedSeats.splice(seatIndex, 1);
      // update the seat list with correct numbering
      totalSeatEl.textContent = totalSeat - selectedSeats.length;
      selectedSeatsEl.textContent = selectedSeats.length;
      grandTotalEl.textContent = selectedSeats.length * ticketPrice;
    }
  }

  // Update the seat list with correct numbering
  seatList.innerHTML = selectedSeats
    .map(
      (seat, index) => `
              <tr class="border-0">
                  <td class="inter text-gray-500">${seat}</td>
                  <td class="inter text-gray-500">Economy</td>
                  <td class="inter text-gray-500">${ticketPrice}</td>
              </tr>
          `
    )
    .join("");
}
