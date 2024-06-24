const generatorDiv = document.querySelector(".generator");
const generateBtn = generatorDiv.querySelector(".generator-form button");
const qrInput = generatorDiv.querySelector(".generator-form input");
const qrImg = generatorDiv.querySelector(".generator-img img");
const downloadBtn = generatorDiv.querySelector(".generator-btn .btn-link");


let imgURL = "";

// Event listener for the Generate button
generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value;
    if (!qrValue.trim()) return;

    generateBtn.innerText = "Generating QR Code...";

    imgURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.src = imgURL;
    qrImg.addEventListener('load', () => {
        generatorDiv.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    });
});

// Event listener for the Download button
downloadBtn.addEventListener('click', () => {
    if (!imgURL) return;
    fetchImage(imgURL);
});

// Function to fetch the image from the URL
function fetchImage(url) {
    fetch(url)
        .then(res => res.blob())
        .then(file => {
            console.log(file);
            let tempFile = URL.createObjectURL(file);
            let fileName = url.split("/").pop().split('.')[0];
            let extension = file.type.split('/')[1];
            download(tempFile, fileName, extension);
        })
        .catch(() => imgURL = "");
}

// Function to download the fetched image
function download(tempFile, fileName, extension) {
    let a = document.createElement('a');
    a.href = tempFile;
    a.download = `${fileName}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // Ensure the element is removed
}


qrInput.addEventListener("input", () => {
    if (!qrInput.value.trim()) {
        generatorDiv.classList.remove("active");
    }
});
