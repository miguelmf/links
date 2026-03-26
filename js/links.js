async function loadLinks() {
	const response = await fetch("links.json");
	const data = await response.json();
	const links = shuffle(data.links);
	renderLinks(links);
	tagFilter(links);
}

function tagFilter(links) {
	const tags = new Set(links.flatMap((link) => link.tags).sort());
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
			const filteredLinks = links.filter((link) =>
				link.tags.some((tag) => selectedTags.includes(tag)),
			);
			if (selectedTags.length === 0) {
				renderLinks(links);
			} else {
				renderLinks(filteredLinks);
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

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}
