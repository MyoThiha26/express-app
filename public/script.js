const apiUrl = localStorage.getItem("apiUrl");
const fetchData = async () => {
  if (apiUrl) {
    const response = await fetch(`${apiUrl}/users`);
    const data = await response.json();
    console.log(data);
  } else {
    window.location.href = "/api";
  }
};

fetchData();

const uploadFile = async () => {
  const inputTag = document.getElementById("uploadFile");
  const uploadedFiles = [...inputTag.files];
  const formData = new FormData();
  uploadedFiles.forEach((file) => formData.append("File", file));
  const response = await fetch(`${apiUrl}/uploadFile`, {
    method: "POST",
    body: formData,
  });
  console.log(await response.json());
};
