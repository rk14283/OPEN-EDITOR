const axios = require("axios")
const {JSDOM} = require("jsdom")
const fs = require ("fs")

async function scrape(){
    const page = await axios.get("https://en.wikipedia.org/wiki/List_of_surfers")
    const html = page.data;  
   // console.log(html); 
    const jsdom = new JSDOM(html); 
    //jsdom document is very big 
  //  console.log(jsdom.window.document); 

    // const titleText = jsdom.window.document.querySelector("h1"); 
    // console.log(titleText.textContent); 

    // const lists = jsdom.window.document.querySelectorAll("ul")
    // console.log(lists.length); 

    const listSection =jsdom.window.document.querySelector(".mw-parser-output");
    // console.log(listSection.length); 
    //Using query selector we picked first list 
    const lists = listSection.querySelectorAll("ul"); 
    console.log(lists.length); 

    const surfers = []
    // loop over the lists
    //we skipped first list started from index 1 
    for (let index = 1; index<lists.length; index++){
        ////loop over list items and inside each items we pick a link 
        const list = lists[index]; 
        //loop over the list items 
        const listItems = list.querySelectorAll("li"); 
        for (listItem of listItems){
            //link to page of surfers 
            //we split on paranthesis and take first name 
            const name= {name:listItem.textContent.split("(")[0]}

            //we choose instances where there are link addresses 
            const linkAddress =listItem.querySelector("a").href; 

            let wikipediaUrl = linkAddress.includes("/wiki") ? linkAddress: null; 

            if(wikipediaUrl){
                const surfer = {name:name, wikipediaUrl: wikipediaUrl}; 
                surfers.push(surfer); 

            }
        }

    }

    console.log(surfers); 
    fs.writeFileSync("surfers.json", JSON.stringify(surfers)); 
}


scrape(); 


//// common error: Cannot redeclare block-scoped variable 'surfer'


////The error "Cannot redeclare block-scoped variable" occurs when we redeclare a variable in the same block or when TypeScript uses global typings, which interfere with local variable names

///ctrl+shift+p formats document

