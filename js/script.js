async function loadLinks() {
	const response = await fetch("links.json");
	const data = await response.json();

	const btn = document.querySelector("#randomLink");

	const history = [];

	if (localStorage.getItem("history")) {
		history.push(...JSON.parse(localStorage.getItem("history")));
	}

	document.querySelector(".history ul").innerHTML = "";
	history.forEach((link) => {
		const li = document.createElement("li");
		li.innerHTML = `<a href="${link.url}">${link.name}</a>`;
		document.querySelector(".history ul").appendChild(li);
	});

	btn.addEventListener("click", () => {
		const randomLink =
			data.links[Math.floor(Math.random() * data.links.length)];
		window.open(randomLink.url, "_blank");
		history.push(randomLink);

		const li = document.createElement("li");
		li.innerHTML = `<a href="${randomLink.url}">${randomLink.name}</a>`;
		document.querySelector(".history ul").appendChild(li);

		// save to local storage
		localStorage.setItem("history", JSON.stringify(history));
	});

	// clear history
	document.querySelector("#clearHistory").addEventListener("click", () => {
		history.length = 0;
		localStorage.setItem("history", JSON.stringify(history));
		document.querySelector(".history ul").innerHTML = "";
	});
}

loadLinks();
