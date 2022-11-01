const surfers = require("./surfers.json"); 
const axios = require("axios")
const {JSDOM} = require("jsdom")
const fs = require ("fs")


async function getSurferImages(){
        
        for (surfer of surfers){ 
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
        console.log("url?:", surfer.imageUrl);
        
}

fs.writeFileSync("surfersWithImages.json", JSON.stringify(surfers)); 

}

//console.log("Surfer:", surfer.name);
getSurferImages(); 