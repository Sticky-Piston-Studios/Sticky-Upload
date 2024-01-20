// src/app.ts
function uploadPhotos() {
  const form = document.getElementById('uploadForm') as HTMLFormElement;
  const formData = new FormData(form);

  // Use dynamic server URL based on the current location
  const serverUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
  const uploadUrl = serverUrl + '/upload';

  fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.text())
    .then(message => {
      alert(message);
      // Optionally, you can redirect or perform additional actions here
    })
    .catch(error => {
      console.error('Error uploading photos:', error);
      alert('Error uploading photos. Please try again.');
    });
}

