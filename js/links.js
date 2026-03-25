async function loadLinks() {
	const response = await fetch("links.json");
	const data = await response.json();
	renderLinks(data.links);
	tagFilter(data);
}

function tagFilter(data) {
	const tags = new Set(data.links.flatMap((link) => link.tags));
	const selectedTags = [];
	tags.forEach((tag) => {
		const button = document.createElement("button");
		button.innerText = tag;
		button.classList.add("tag");
		document.querySelector(".tagList").appendChild(button);
		button.addEventListener("click", () => {
			if (selectedTags.includes(tag)) {
				selectedTags.splice(selectedTags.indexOf(tag), 1);
			} else {
				selectedTags.push(tag);
			}

			button.classList.toggle("selected");
			const links = data.links.filter((link) =>
				link.tags.some((tag) => selectedTags.includes(tag)),
			);
			if (selectedTags.length === 0) {
				renderLinks(data.links);
			} else {
				renderLinks(links);
			}
		});
	});
}

function renderLinks(links) {
	const ul = document.querySelector("ul");
	ul.innerHTML = "";
	links.forEach((link) => {
		const li = document.createElement("li");
		li.classList.add("link");
		li.innerHTML = `<a href="${link.url}">${link.name}</a>
		<p>${link.description}</p>
		<p>(Tags: <span class="tags">${link.tags.join(", ")}</span>)</p>`;
		ul.appendChild(li);
	});
}

loadLinks();
