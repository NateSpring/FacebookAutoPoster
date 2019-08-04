const axios = require('axios');
const puppeteer = require('puppeteer');

puppeteer.launch({ headless: false}).then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800})
    await page.goto('https://www.facebook.com/groups/709946702442298/');
    await browser.close();
});

const getData = async () => {
    try {
        return await axios.get('https://phantombuster.s3.amazonaws.com/pL6sMrH3Hog/1AHPX3QkKD3YFi1RIdR4ag/result.json')
    } catch (err) {
        console.log(err);
    }
}
const getMembers = async () => {
    const members = await getData();
    for (var i = 0; i < 4; i++) {
        let newMembers = members.data[i].firstName + " " + members.data[i].lastName;
        console.log(newMembers);
    }
}
getMembers();
;//    for (var i = 0; i < 4; i++) {
  //          var members = response.data[i].name;
    //        console.log(members)
      //  }