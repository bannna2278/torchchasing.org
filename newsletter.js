const current = newsletter[0];
document.getElementById("current").innerHTML =cuurent.content;

const archive = document.getElementById("archive");
newsletter.slice(1).forEach(n  => {
    const item = document.createElement("li");
    item.innerHTML = `<a href="?id=${n.id}">${n.week}</a>`;
    archive.appendChild(item);
});
