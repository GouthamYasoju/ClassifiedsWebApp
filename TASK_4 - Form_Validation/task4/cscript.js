document.getElementById("upload").addEventListener("change",fileName);
function fileName(){
    document.getElementById("resume").value = document.getElementById("upload").files[0].name;
}