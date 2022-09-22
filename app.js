function $(selector) {
	return document.querySelector(selector);
}

$('#unformatted-string').value = `### Neutral

- Almost White: hsl(0, 0%, 98%)
- Medium Gray: hsl(0, 0%, 41%)
- Almost Black: hsl(0, 0%, 8%)a`;

function getHSLArray(str) {
	const noLineBreaks = str.replace(/(\r\n|\n|\r)/gm, ''); // removes all 3 types of newline characters
	const hslArray = noLineBreaks.match(/hsl\(\d+,( |  )\d+%, \d+%\)/g); // hsl values from string to array
	const noSpaceHSLArray = [];

	try {
		for (let el of hslArray) {
			noSpaceHSLArray.push(el.replaceAll(' ', '')); // 'deletes' space to use in URL
		}
		$('.error-msg').classList.add('invisible');
	} catch (err) {
		$('.error-msg').classList.remove('invisible');
		$(
			'.error-msg'
		).innerHTML = `Required format: <span>Color name: hsl(x, x%, x%)</span>`;
	}

	return noSpaceHSLArray;
}

async function fetchAColor(color) {
	const url = `https://www.thecolorapi.com/id?hsl=${color}`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		$('.error-msg').classList.add('invisible');
		return data;
	} catch (err) {
		console.log(err);
		displayOfflineErrorMsg();
	}
}

function setObjectColors(object, key, value) {
	// modify output prefix based on scss.status being 1 or 0
	if ($('.scss-con').dataset.status === '1') {
		object['$' + key.replace(' ', '')] = value + ';';
	}

	if ($('.scss-con').dataset.status === '0') {
		object['--clr-' + key.replace(' ', '')] = value + ';';
	}
}

async function getColors() {
	const inputFieldValue = $('#unformatted-string').value;
	const hslArray = getHSLArray(inputFieldValue);
	const colorObject = {};
	const fetches = [];

	for (let i = 0; i < hslArray.length; i++) {
		const fetch = fetchAColor(hslArray[i]).then(
			data => setObjectColors(colorObject, data?.name.value, hslArray[i]),
			e => {
				console.log("Something's strange in the neighborhood: " + e);
			}
		);
		fetches.push(fetch);
	}
	await Promise.all(fetches);
	return colorObject;
}

function renderColors(colorObject) {
	const stringifiedObj = JSON.stringify(colorObject);
	const deobjectifiedObj = stringifiedObj
		.replaceAll('"', '')
		.replaceAll('{', '')
		.replaceAll('}', '');

	const regex = /(,(?=\$))|((?<=;),)/g;
	const result = deobjectifiedObj.replaceAll(regex, ''); // delete every comma besides the ones within the paranthesis
	$('#unformatted-string').value = result; // insert formatted result
	navigator.clipboard.writeText(result); // copy to clipboard
	displayMsgOnSuccess(); // display copied to your clipboard
}

async function startConversion() {
	const inputFieldValue = $('#unformatted-string');
	const obj = await getColors(inputFieldValue);
	if (obj !== undefined) {
		renderColors(obj);
	}
}

function removeOfflineErrorMsg() {
	$('.error-msg').classList.add('invisible');
}

function displayOfflineErrorMsg() {
	$(
		'.error-msg'
	).innerHTML = `No internet connection.<span>Please try again later.</span>`;
	$('.error-msg').classList.remove('invisible');
}

function displayMsgOnSuccess() {
	$('.success-msg-con').id = '';
	$('.success-msg-con').setAttribute('closing', '');
	$('.success-msg-con').setAttribute('open', '');
	$('.success-msg-con').addEventListener('animationend', () => {
		$('.success-msg-con').id = 'invisible';
		$('.success-msg-con').removeAttribute('closing');
	});
}

window.addEventListener('DOMContentLoaded', () => {
	// listening click event on SCSS radio
	$('.scss-con').addEventListener('click', () => {
		$('.scss-con').dataset.status = 1;
	});

	// listening click event on CSS radio
	$('.css-con').addEventListener('click', () => {
		$('.scss-con').dataset.status = 0;
	});

	// convert string on click
	$('button').addEventListener('click', startConversion);

	// log promise rejection
	window.addEventListener('unhandledrejection', promiseRejectionEvent => {
		console.log(promiseRejectionEvent);
	});

	// displays error msg when offline
	window.addEventListener('offline', () => {
		displayOfflineErrorMsg();
	});

	// removes error msg when online
	window.addEventListener('online', () => {
		removeOfflineErrorMsg();
	});
});
