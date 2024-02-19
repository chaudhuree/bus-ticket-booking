// // variables
//  const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
//  const seatsPerRow = 4;
//  let totalSeat = rowLetters.length * seatsPerRow;
//  const ticketPrice = 550;
//  const maxTicketsPerUser = 4;
//  let selectedSeats = [];
//  let totalPrice = 0;
//  let discountPrice = 0;
//  let grandtotal = 0;

// //  dom selection

// //  dynamically generated seats
// function createSeatButtons() {
//   const seatsContainer = document.getElementById('seats-container');

//   for (let rowIndex = 0; rowIndex < rowLetters.length; rowIndex++) {
//       const rowLetter = rowLetters[rowIndex];
//       const rowDiv = document.createElement('div');
//       rowDiv.classList.add('row','flex',' gap-[26px]', 'items-center');

//       // Add a label for each row
//       const rowLabel = document.createElement('div');
//       rowLabel.textContent = rowLetter;
//       rowLabel.classList.add('row-label','inter', 'text-lg', 'font-medium', 'text-[#03071280]');
//       rowDiv.appendChild(rowLabel);

//       // Create div for the seat groups
//       const seatGroupDiv = document.createElement('div');
//       seatGroupDiv.classList.add('seat-groups','flex','items-center','gap-[66px]');

//       // Create first seat-group div
//       const firstSeatGroupDiv = document.createElement('div');
//       firstSeatGroupDiv.classList.add('seat-group','flex','items-center','gap-8');

//       // Create second seat-group div
//       const secondSeatGroupDiv = document.createElement('div');
//       secondSeatGroupDiv.classList.add('seat-group','flex','items-center','gap-8');

//       for (let seatIndex = 1; seatIndex <= seatsPerRow; seatIndex++) {
//           const seatBtn = document.createElement('button');
//           const seatNumber = `${rowLetter}${seatIndex}`;
//           seatBtn.textContent = seatNumber;
//           seatBtn.id = `seat${seatNumber}`;
//           seatBtn.classList.add('seat','px-11', 'py-4', 'bg-[#F7F8F8]', 'rounded-xl', 'inter', 'text-lg', 'font-medium', 'text-[#03071280]');
//           // seatBtn.addEventListener('click', () => selectSeat(seatNumber));

//           // Add the first two seats to the first seat-group div
//           if (seatIndex <= 2) {
//               firstSeatGroupDiv.appendChild(seatBtn);
//           } else {
//               // Add the next two seats to the second seat-group div
//               secondSeatGroupDiv.appendChild(seatBtn);
//           }
//       }

//       // Add both seat-group divs to the main row div
//       seatGroupDiv.appendChild(firstSeatGroupDiv);
//       seatGroupDiv.appendChild(secondSeatGroupDiv);

//       rowDiv.appendChild(seatGroupDiv);

//       seatsContainer.appendChild(rowDiv);
//   }
// }
// createSeatButtons();