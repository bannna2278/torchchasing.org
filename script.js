function loadDay(day1) {
    const img = document.getElementById("spcOutlook");
    const spinner = document.getElementById("spinner");

    spinner.style.display = "block";
    img.style.opacity = "0";

    img.src = `https://www.spc.noaa.gov/products/outlook/day${day1}otlk.gif`;

    img.onload = () => {
        spinner.style.display = "none";
        img.style.opacity = "1";
    };

    img.onerror = () => {
        spinner.style.display = "none";
        img.style.opacity = "1";
        console.error("Failed to load SPC outlook for day", day1);
    };
}

window.loadDay = loadDay;

document.addEventListener("DOMContentLoaded", () => {
    loadDay(1);
});
