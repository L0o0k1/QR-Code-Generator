const form = document.getElementById("generate-form");
const spinner = document.getElementById("spinner");
const qr = document.getElementById("qrcode");

const showSpinner = () => {
  spinner.style.display = "block";
};

const hideSpinner = () => {
  spinner.style.display = "none";
};

const qrGen = (url, size) => {
  let qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

const handleFormSubmit = (event) => {
  event.preventDefault();

  const url = document.getElementById("url").value;
  let size = document.getElementById("size").value || 128; // default size is 128

  if (url === "") {
    alert("Please enter a URL!");
    hideSpinner();
    qrGen(url, size);
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();
      qrGen(url, size);
      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        SaveBtn(saveUrl);
      }, 50);
    }, 2000);
  }
};
const SaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.innerHTML = "Save Image";

  link.href = saveUrl;
  link.download = "qrcode.png";

  document.getElementById("Generated").appendChild(link);
};

form.addEventListener("submit", handleFormSubmit);
