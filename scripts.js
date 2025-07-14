const speed = document.getElementById("speed");
let Stopped = false;
let n;
let delay;
const currentSpeed = document.getElementById("currentSpeed");
speed.addEventListener("input", () => {
    let cur_speed = parseInt(speed.value);
    currentSpeed.innerText = cur_speed + "%";
    delay = (100 - cur_speed) * (1000 / 99);
})
const container = document.getElementById("container");
function getInput() {
    container.innerHTML = "";
    n = parseInt(document.getElementById("n").value);
    stopSorting();
    for (let i = 0; i < n; i++) {
        const childDiv = document.createElement("div");
        childDiv.className = "child";
        childDiv.style.height = Math.floor(Math.random() * 101) + Math.random() + "%";
        container.appendChild(childDiv);
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function stopSorting() {
    Stopped = true;
}
async function selectionSort(left, right) {
    for (let i = left; i <= right; i++) {
        let min_idx = i;
        container.children[i].style.backgroundColor = "red";
        for (let j = i+1; j <= right; j++) {
            container.children[j].style.backgroundColor = "red";
            container.children[j-1].style.backgroundColor = "blue";
            container.children[min_idx].style.backgroundColor = "orange";
            if (parseFloat(container.children[j].style.height) < parseFloat(container.children[min_idx].style.height)) {
                container.children[min_idx].style.backgroundColor = "blue";
                container.children[i].style.backgroundColor = "red";
                min_idx = j;
                container.children[min_idx].style.backgroundColor = "orange";
            }
            if (Stopped) return;
            await sleep(delay);
        }
        let tmp = container.children[i].style.height;
        container.children[i].style.height = container.children[min_idx].style.height;
        container.children[min_idx].style.height = tmp;
        container.children[i].style.backgroundColor = "blue";
        container.children[right].style.backgroundColor = "blue";
        // container.children[min_idx].style.backgroundColor = "blue";
        container.children[min_idx].style.backgroundColor = "blue";
        container.children[i].style.backgroundColor = "green";
    }
    container.children[right].style.backgroundColor = "green";
}
async function bubbleSort(left, right) {
    for (let i = left; i <= right; i++) {
        for (let j = left; j <= right-i-1; j++) {
            container.children[j].style.backgroundColor = "red";
            container.children[j+1].style.backgroundColor = "red";
            if (parseFloat(container.children[j+1].style.height) < parseFloat(container.children[j].style.height)) {
                container.children[j+1].style.backgroundColor = "orange";
                let tmp = container.children[j].style.height;
                container.children[j].style.height = container.children[j+1].style.height;
                container.children[j+1].style.height = tmp;
            }
            if (Stopped) return;
            await sleep(delay);
            container.children[j].style.backgroundColor = "blue";
            container.children[j+1].style.backgroundColor = "blue";
        }
        container.children[right-i].style.backgroundColor = "green";
    }
}
async function qsort(left, right) {

}
function StartSorting(TypeOfSort) {
    Stopped = false;
    for (let i = 0; i < n; i++) {
        container.children[i].style.backgroundColor = "blue";
    }
    TypeOfSort(0, n-1);
}