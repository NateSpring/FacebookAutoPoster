const puppeteer = require('puppeteer');
const CRED = require('./creds.rem');

//Import login info.
const ID = {
    login: '#email',
    pass: '#pass'
};

const sleep = async (ms) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res();
        }, ms)
    });
}

//Launch Chrome, navigate to FB, Login, navigate to FB Group, write welcome post.
let autoWelcome = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    //Block notification window so script can continue.
    const context = browser.defaultBrowserContext();
    await context.overridePermissions('https://www.facebook.com', ['notifications']);
    //Login, self explanatory.
    let login = async () => {
        await page.goto('https://www.facebook.com', {
            waitUntil: 'networkidle2'
        });
        await page.waitForSelector(ID.login);
        console.log(CRED.user);
        console.log(ID.login);
        await page.type(ID.login, CRED.user);

        await page.type(ID.pass, CRED.pass);
        await sleep(500);

        await page.click("#loginbutton")

        console.log("login done");
        await page.waitForNavigation();
    }
    await login();

    //Post welcome to new members
    let postWelcome = async () => {
        await page.goto('https://www.facebook.com/groups/709946702442298/', {
        });

        const [button] = await page.$x("//a[contains(., 'Write Post')]");
        console.log('Found "Write Post" button')

        if (button) {
            await button.click();
        }
        console.log('Clicked "Write Post"');
        await sleep(10000);
        
        const [postButton] = await page.$x("//button[contains(., 'Post')]");
        console.log('Found "Post" button');

        if (postButton) {
            await postButton.click();
            console.log('Clicked "Post" button');

        }
        console.log('DONE: Posted!');
    }
    await postWelcome();





};
autoWelcome();
 /* await page.waitFor(1000);
browser.close()
return 'test, Chrome Works';
scraper(); //.then((value) => {
//  console.log(value);
//})
*/






/*
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


      */