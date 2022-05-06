const axios = require('axios');
const fs = require('fs');
const { parse }  = require('node-html-parser');

const html = fs.readFileSync('./ril_export.html').toString();

const getPage = async (url) => {
	const response = await axios.get(url)
	return response.status;
}

const root = parse(html);
const links = root.querySelectorAll('a');

const execute = async (links) => {
	for(let i = links.length - 1; i >= 0; i--){
		if(i <= links.length - 600){
			const link = links[i];
			const url = link.getAttribute('href');
			const timestamp = parseInt(link.getAttribute('time_added'), 10);
			const time = new Date(timestamp * 1000).toLocaleDateString();
			
			try {
				const status = await getPage(url);
				console.log(url + ',' + timestamp + ',' + time + ',' + status);
			}
			catch(e){
				console.log(url + ',' + timestamp + ',' + time + ',' + e.message);
			}
		}
	}
}

execute(links);