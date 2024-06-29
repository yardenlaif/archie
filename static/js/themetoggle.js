const colorNames = ["maincolor", "secondarycolor", "thirdcolor", "backgroundcolor", "textcolor", "highlightcolor"];
function getProperty(prop) {
	const r = document.querySelector(':root');
	var rs = getComputedStyle(r);
	return rs.getPropertyValue(prop);
}

function setTheme(mode) {
    localStorage.setItem("theme-storage", mode);
	const r = document.querySelector(':root');
    if (mode === "dark") {
		colorNames.forEach((name) => {
			r.style.setProperty('--'+name, colors['--dark'+name]);
		});
        document.getElementById("dark-mode-toggle").innerHTML = "<i data-feather=\"sun\"></i>";
        feather.replace()
    } else if (mode === "light") {
		colorNames.forEach((name) => {
			r.style.setProperty('--'+name, colors['--light'+name]);
		});
        document.getElementById("dark-mode-toggle").innerHTML = "<i data-feather=\"moon\"></i>";
        feather.replace()
    }

}

function toggleTheme() {
    if (localStorage.getItem("theme-storage") === "light") {
        setTheme("dark");
    } else if (localStorage.getItem("theme-storage") === "dark") {
        setTheme("light");
    }
}

var savedTheme = localStorage.getItem("theme-storage") || "light";
var colors = {}
colorNames.forEach((name) => {
	colors["--light"+name] = getProperty("--light"+name);
	colors["--dark"+name] = getProperty("--dark"+name);
})
setTheme(savedTheme);
