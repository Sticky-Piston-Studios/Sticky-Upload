// 2024 Sticky Piston Studios. MIT license

// src/app.ts

// Display thumbnails when files are selected
document.getElementById('fileInput')?.addEventListener('change', displayThumbnails);

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

function displayThumbnails() {
  const thumbnailsContainer = document.getElementById('thumbnails');
  thumbnailsContainer!.innerHTML = ''; // Clear existing thumbnails

  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  const files = fileInput.files;

  if (files) {
	for (let i = 0; i < files.length; i++) {
	  const file = files[i];

	  // Create thumbnail element
	  const thumbnail = document.createElement('img');
	  thumbnail.classList.add('thumbnail');

	  // Read the file as Data URL
	  const reader = new FileReader();
	  reader.onload = (event) => {
		thumbnail.src = event.target!.result as string;
	  };
	  reader.readAsDataURL(file);

	  // Append thumbnail to the container
	  thumbnailsContainer!.appendChild(thumbnail);
	}
  }
}
