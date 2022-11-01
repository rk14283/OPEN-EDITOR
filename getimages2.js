const surfers = require("./surfers.json"); 
const axios = require("axios")
const {JSDOM} = require("jsdom")
const fs = require ("fs")


async function getSurferImages(){

        for (surfer of surfers){
        
            //for (surfer of surfers){ 
            console.log("Surfer:", surfer.name);
            const page = await axios.get(`https://en.wikipedia.org/${surfer.wikipediaUrl}`
            ); 
            const html = page.data;  
        // console.log(html); 
            const jsdom = new JSDOM(html); 
            const infoBox = jsdom.window.document.querySelector(".infobox-image");
            
            if(infoBox){
                const imageUrl = infoBox.querySelector("img").src;
                surfer.imageUrl = imageUrl; 
                //console.log(surfer); 
                
            } else{
                surfer.imageUrl = null;
            }
            const infoBoxTable = jsdom.window.document.querySelector(".infobox")
            //const tableRows = infoBoxTable.querySelectorAll('tr'); 

           // console.log(tableRows.length); 
            //console.log(infoBox);


            if (infoBoxTable){
                const tableRows = infoBoxTable.querySelectorAll('tr'); 
            for (tableRow of tableRows){
                const key = tableRow.querySelector(".infobox-label")?.textContent;
                const value = tableRow.querySelector(".infobox-data")?.textContent;

                console.log(key,value); 

                if(key&&value){
                    surfer[key]= value; 
                }
            }
        }


            console.log(surfer); 


    }   

fs.writeFileSync("surfersWithImages2.json", JSON.stringify(surfers)); git


}


//}

//console.log("Surfer:", surfer.name);
getSurferImages(); 