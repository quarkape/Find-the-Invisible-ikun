window.onload = () => {
	for (let i=1;i<10;i++ )
	{
		let a = document.createElement("audio");
		a.src = './mp3/' + i + '.mp3';
		document.body.appendChild(a);
	}
	let ikunmp3 = document.createElement("audio");
	ikunmp3.src = "./mp3/ikun.mp3";
	document.body.appendChild(ikunmp3);
	let ikunimg = document.createElement("img");
	ikunimg.src = "./mp3/sticker.png";
	ikunimg.style.display = "none";
	document.body.appendChild(ikunimg);
}