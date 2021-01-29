const payButtons = document.getElementById('pay-buttons');

// get data from localstorage
const dataSnap = JSON.parse(localStorage.getItem('dataurlmidtrans'));

// For example trigger on button clicked, or any time you need
payButtons.addEventListener('click', function () {
  snap.pay(dataSnap.token); // Replace it with your transaction token
  console.log('ok')
});