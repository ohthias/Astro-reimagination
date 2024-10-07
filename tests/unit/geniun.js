const token = 'lm7ccWorHTCW6ETHEtX_V4k3FhrXI762rKL0kaCGylUDYR6';

fetch('https://api.genius.com/artists/16775', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
