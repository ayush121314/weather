let yourweat=document.querySelector(".butst1");
let searweat=document.querySelector(".butst2");
let grantloc=document.querySelector(".grloc");
let searchloc=document.querySelector(".seloc");
let mainloc1=document.querySelector(".maloc1");
let grbut1=document.querySelector(".grbut");
let cityname1=document.querySelector(".cityname");
let countname1=document.querySelector(".countname");
let type1=document.querySelector(".type");
let weathericon1=document.querySelector(".weathericon");
let temp1=document.querySelector(".temp");
let loadwin1=document.querySelector(".loadwin");
let datawin1=document.querySelector(".datawin");
let dataclo1=document.querySelector(".dataclo");
let datahum1=document.querySelector(".datahum");
let searchtext1=document.querySelector(".seartext");
let searchform1=document.querySelector(".searform");
let marginmaina=document.querySelector(".marmaina");
let marginmainb=document.querySelector(".marmaina");
let errcont=document.querySelector(".errorcont");
let errbut1=document.querySelector(".errbut");
let errtext1=document.querySelector(".errtext");
let curtab=1;
let prevtab=1;
// let lat;
// let lon;
const API_KEY = "168771779c71f3d64106d8a88376808a";
let ayu123=0;
weatherclick();
function weatherclick()
{
    
        yourweat.classList.add('addbg');
        prevtab=curtab
        curtab=1;
        if(errcont.classList.contains('active'))
        {
            errcont.classList.remove('active');
            errcont.classList.add('inactive');
        }
        if(prevtab!=curtab)
        {
            searweat.classList.remove('addbg');
            searchloc.classList.remove('active');
            searchloc.classList.add('inactive');
            mainloc1.classList.remove('active');
            mainloc1.classList.add('inactive');
        }
        if(ayu123==0)
        {
            ayu123=2;
            grantloc.classList.remove('inactive');
            grantloc.classList.add('active');
        }
        else
        {
        //    const localcoord=sessionStorage.getItem("usercoordinte");
        //    const coordinates=JSON.parse(localcoord)
        //    loadwin1.classList.remove('inactive');
        //    loadwin1.classList.add('active');
        //    fetchweather(coordinates);
                getlocation()
        }
    
}
yourweat.addEventListener('click',weatherclick)
grbut1.addEventListener('click',getlocation);
function getlocation()
{
   
   loadwin1.classList.remove('inactive');
   loadwin1.classList.add('active');
   if(navigator.geolocation)
   {
       ayu123=2;
        yourweat.classList.add('addbg');
        navigator.geolocation.getCurrentPosition(showPosition);

   }
   grantloc.classList.remove('active');
   grantloc.classList.add('inactive'); 
}
searweat.addEventListener('click',yessearch);
function yessearch()
{
    if(errcont.classList.contains('active'))
    {
        errcont.classList.remove('active');
        errcont.classList.add('inactive');
    }
    if(mainloc1.classList.contains('active'))
    {
        mainloc1.classList.remove('active');
        mainloc1.classList.add('inactive');
    }
    
    searweat.classList.add('addbg');
    prevtab=curtab
    mainloc1.style.marginTop='300px'
    curtab=2;
    5.
    if(grantloc.classList.contains('active'))
    {
        grantloc.classList.remove('active');
        grantloc.classList.add('inactive');
    }  
    if(loadwin1.classList.contains('active'))
    {
        loadwin1.classList.remove('active');
        loadwin1.classList.add('inactive');
    }
    if(prevtab!=curtab)
    {
       
        yourweat.classList.remove('addbg');
        searchloc.classList.remove('inactive');
        searchloc.classList.add('active'); 
    } 
}
searchform1.addEventListener('submit',(e) => {
         e.preventDefault();
        if(searchtext1.value==="")
        {
            return;
        }
        loadwin1.classList.remove('inactive');
        loadwin1.classList.add('active');
        searchcity(searchtext1.value);
});
async function searchcity(city){
    loadwin1.classList.remove('inactive');
    loadwin1.classList.add('active');
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        loadwin1.classList.remove('active');
        loadwin1.classList.add('inactive');
        mainloc1.style.marginTop='300px'
        getweather(data);
    }
    catch(err)
    {
        if(mainloc1.classList.contains('active'))
        {
            mainloc1.classList.remove('active');
            mainloc1.classList.add('inactive');
        }
        errcont.classList.remove('inactive');
        errcont.classList.add('active');
      
        errbut1.addEventListener('click',yessearch)
    }
}
function showPosition(position)
{
    // fkejnd
    const usercoordinates={
        lat:position.coords.latitude,
        lon: position.coords.longitude
    };
    sessionStorage.setItem("usercoordinate" , JSON.stringify(usercoordinates));
    mainloc1.style.marginTop='180px'
    fetchweather(usercoordinates)
}
async function fetchweather(usercoordinates)
{
    const {lat ,lon}=usercoordinates;
    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const datafet=await response.json();
        if(!datafet.sys)
        throw datafet;
        loadwin1.classList.remove('active');
        loadwin1.classList.add('inactive');
        getweather(datafet);
    }
    catch(err)
    {
        if(mainloc1.classList.contains('active'))
        {
            mainloc1.classList.remove('active');
            mainloc1.classList.add('inactive');
        }
        errcont.classList.remove('inactive');
        errcont.classList.add('active');
      
        errbut1.addEventListener('click',fetchweather(usercoordinates))
    }
}
 function getweather(data)
{
    temp1.innerText=`${data?.main?.temp.toFixed(2)} °C`;
    cityname1.innerText=`${data?.name}`;
    type1.innerText=`${data?.weather[0]?.description}`;
    datawin1.innerText = `${data?.wind?.speed} m/s`;
    datahum1.innerText = `${data?.main?.humidity} %`;
    dataclo1.innerText = `${data?.clouds?.all} %`;
    countname1.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    weathericon1.src=`http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`
    if(errcont.classList.contains('active'))
    {
        errcont.classList.remove('active');
        errcont.classList.add('inactive');
    }
    if(curtab==2)
    {
        mainloc1.style.marginTop='300px'
    }
        mainloc1.classList.remove('inactive');
        mainloc1.classList.add('active');
}