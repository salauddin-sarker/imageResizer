const uploadBox =document.querySelector(".upload_box"),
previewImg = uploadBox.querySelector("img"),
fileInput = uploadBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
radioInput = document.querySelector(".radio input"),
qualityInput = document.querySelector(".quality input"),
downloadBtn = document.querySelector(".download_btn");

let ogImageRatio;
const loadFile = (e) => {
    const file = e.target.files[0]; // getting first user selected file
    if(!file) return; // return if user hasn't selected any file
    previewImg.src = URL.createObjectURL(file); // passing selected file url to preview img src
    previewImg.addEventListener("load", () => { // once img loaded
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    });
}

widthInput.addEventListener("keyup", () => {
    // getting heihgt accroding to the radio checkbox status
    const height = radioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});
heightInput.addEventListener("keyup", () => {
    // getting width accroding to the radio checkbox status
    const width = radioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
});

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    // if quality checkedbox is checked, pass 0.7 imgQuality else pass 1.0
    // 1.0 is 100% quality where 0.7 is 70% of total. you can pass from 0.1 - 1.0
    const imgQality = qualityInput.checked ? 0.7 :1.0;

    // setting canvas height & width accroding th the input values
    canvas.height = heightInput.value;
    canvas.width = widthInput.value;

    //drawing user selected image onto the canvas
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    a.href = canvas.toDataURL("image/jpeg", imgQality);
    a.download = new Date().getTime(); // passing current time as download value
    a.click(); // clicking <a> element so the file download
}

downloadBtn.addEventListener("click", resizeAndDownload)
fileInput.addEventListener("change", loadFile)
uploadBox.addEventListener("click", () => fileInput.click());