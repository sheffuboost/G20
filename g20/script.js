// Page Navigation
function goToAuth() {
  document.getElementById("login-page").classList.remove("active");
  document.getElementById("auth-page").classList.add("active");
  startScanner();
}

function exitToLogin() {
  document.getElementById("auth-page").classList.remove("active");
  document.getElementById("login-page").classList.add("active");
  stopScanner();
}

// Login Validation
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  alert("Login successful (mock)");
  goToAuth();
}

function clearLogin() {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

// Barcode Scanner Setup
let html5QrCode;

function startScanner() {
  html5QrCode = new Html5Qrcode("reader");
  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      html5QrCode.start(
        devices[0].id,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        qrCodeMessage => {
          displayResult(qrCodeMessage);
          stopScanner();
        },
        errorMessage => {
          console.warn("QR Code scan error:", errorMessage);
        }
      );
    }
  }).catch(err => {
    console.error("Camera error:", err);
  });
}

function stopScanner() {
  if (html5QrCode) {
    html5QrCode.stop().then(() => {
      html5QrCode.clear();
    }).catch(err => {
      console.error("Stop failed:", err);
    });
  }
}

function resetScanner() {
  document.getElementById("result").innerHTML = "";
  startScanner();
}

// Display Scanned Data
function displayResult(data) {
  // Simulate parsing barcode data
  const mockData = {
    name: "John Doe",
    id: "STU123456",
    document: "Certificate of Excellence"
  };

  document.getElementById("result").innerHTML = `
    <strong>Name:</strong> ${mockData.name}<br/>
    <strong>ID:</strong> ${mockData.id}<br/>
    <strong>Document:</strong> ${mockData.document}
  `;
}
