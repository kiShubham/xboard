
// console.log(magazines);
// array

async function getDataArray(array){
  let dataArray = []
  
  for( let i=0 ; i < array.length ;i++){
    let res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${array[i]}`)
    let json = await res.json();
    dataArray.push(json);
  }
  return dataArray
}


async function accordionItem(){
  
  let data = await getDataArray(magazines);
  // console.log(data); // [ {} , {} , {} ]

  let accord = document.querySelector('#Accordionlayout');
  accord.innerHTML = `<div class="accordion" id="accordionExample"></div>` 
 
  let parent = document.querySelector('#accordionExample');
  // let one = "One"
  for(let i = 0 ; i < data.length ; i++ ){ 

    let item = document.createElement("div");
    item.className = "accordion-item"
    item.innerHTML = `<h2 class="accordion-header" id=heading${i+1}>
        <button class="accordion-button" type="button" data-bs-toggle="collapse"  data-bs-target="#collapse${i+1}"  aria-controls="collapse${i+1}" >
          ${data[i].feed.title}
        </button>
      </h2>
      <div id="collapse${i+1}" class="accordion-collapse collapse" aria-labelledby="heading${i+1}"  data-bs-parent="#accordionExample" >
        <div class="accordion-body">
        
        <!--  carosel start -->
        <div id="carouselExampleControlsNoTouching${i+1}" class="carousel slide" data-bs-touch="false" item${i+1} ></div>
        <!-- carosel end -->
        
        </div>
      </div>`
    parent.append(item); 
  };
  let showAccordion = document.querySelector('#collapse1')
  showAccordion.className = "accordion-collapse collapse show"
}
accordionItem();



async function addCarosel(){

  let data = await getDataArray(magazines);
  
  for(let i = 0 ;i<data.length ; i++ ){

    let caroselData = data[i].items
    // console.log(caroselData);[{},{},{}]
    for(let j = 0; j < caroselData.length ;j++){

      let imageLink = caroselData[j].enclosure.link
      // console.log(j)
      // console.log(imageLink)
      let date = new Date(caroselData[j].pubDate)
      let pubDate = date.toLocaleDateString("en-GB")
      console.log(pubDate);

      let body = document.querySelector(`#carouselExampleControlsNoTouching${i+1}`) //working ;
      // console.log(body)
      let caroselInner = document.createElement("div")
      caroselInner.className = "carousel-inner"
      // console.log(caroselData[j])//i*j {};
      if(j == 0){
      caroselInner.innerHTML = `<div class="carousel-item active">
        <img src=${imageLink} class="carosel-image" alt="image">
        <div class="carosel-text">
          <p class="text-heading">${caroselData[j].title}</p>
          <span>${caroselData[j].author}</span><span class="dot"></span><span>${pubDate}</span>
          <p class='carosel-para'>${caroselData[j].content}</p>
        </div>
      </div>`
      body.append(caroselInner);
    }

    if(j > 0 && j < caroselData.length){
      caroselInner.innerHTML = `<div class="carousel-item">
        <img src=${imageLink} class="carosel-image" alt="image">
        <div class="carosel-text">
          <p class="text-heading">${caroselData[j].title}</p>
          <span>${caroselData[j].author}</span><span class="dot"></span><span>${pubDate}</span>
          <p class= 'carosel-para'>${caroselData[j].content}</p>
        </div>
      </div>`
      body.append(caroselInner); 
    }

      // add carosel button on last part of code in carosel
      if( j == caroselData.length - 1 ){

        body.innerHTML  = body.innerHTML + `<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching${i+1}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching${i+1}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>`

      }
    }
  }
  
} 
addCarosel();

