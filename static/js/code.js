if (navigator.clipboard) {
	// use a class selector if available
	let blocks = document.querySelectorAll(".highlight");

	blocks.forEach((block) => {
		const code = block.querySelector('[data-lang]');
		const lang = code.getAttribute('data-lang');
		if (lang == "fallback") {
			return
		}

		let div = document.createElement('div');
		div.className = "codeblock";

		let header = document.createElement("div");
		header.className = 'before-code';
		div.appendChild(header);

		let langIcon = document.createElement('img');
		switch (lang) {
			case "go":
				langIcon.src = "/go-logo.svg";
				langIcon.className = "go-icon";
				break;
			case "sh":
				langIcon.src = "/bash-logo.svg";
				langIcon.className = "sh-icon";
				break;
		}
		header.appendChild(langIcon);

		let button = document.createElement("button");
		header.appendChild(button);

		let img = document.createElement("img");
		img.src = "/copy.svg";
		button.appendChild(img);

		block.childNodes[0].className = "code";
		block.insertBefore(div, block.childNodes[0]);

		button.addEventListener("click", async () => {
			await copyCode(block, img);
		});
	})
}

async function copyCode(block, img) {
	let code = block.querySelector("code");
	let text = code.innerText;

	await navigator.clipboard.writeText(text);

	// visual feedback that task is completed
	img.src = "/copied.png";

	setTimeout(() => {
		img.src = "/copy.svg";
	}, 700);
}

